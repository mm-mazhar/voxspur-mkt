/**
 * Generates the favicon from the mark.
 *
 * The mark (public/voxrail-mark.svg) is the only input: a rounded plate with a
 * chevron "V" stroked across it. This script re-draws that exact geometry at
 * favicon sizes and writes:
 *
 *   public/favicon.svg        the mark, copied as-is
 *   public/favicon.ico        16px and 32px, for browsers that want an .ico
 *   public/apple-touch-icon.png   180px
 *
 * It uses only Node built-ins, so the site has no image-tooling dependency.
 * When real artwork replaces the placeholder mark, update GEOMETRY below to
 * match it and run: node scripts/make-favicons.mjs
 */

import { deflateSync } from "node:zlib";
import { copyFileSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = join(root, "public");
/**
 * The mark to draw from. Defaults to the placeholder shipped with the site;
 * if site.ts is pointed at a differently named mark, pass that file:
 *   node scripts/make-favicons.mjs public/your-mark.svg
 */
const markPath = process.argv[2]
  ? join(process.cwd(), process.argv[2])
  : join(publicDir, "voxrail-mark.svg");

/**
 * The mark's geometry, in its own 500x500 user space. Read from the SVG where
 * it is cheap to do so, so the two cannot drift apart silently.
 */
const markSource = readFileSync(markPath, "utf8");

function readAttr(pattern, label) {
  const match = markSource.match(pattern);
  if (!match) throw new Error(`Could not read ${label} from ${markPath}`);
  return match[1];
}

const GEOMETRY = {
  size: Number(readAttr(/viewBox="0 0 (\d+) \d+"/, "the viewBox")),
  radius: Number(readAttr(/<rect[^>]*\brx="([\d.]+)"/, "the plate radius")),
  plate: readAttr(/<rect[^>]*\bfill="(#[0-9a-fA-F]{3,8})"/, "the plate fill"),
  strokeWidth: Number(readAttr(/<path[^>]*\bstroke-width="([\d.]+)"/, "the stroke width")),
  stroke: readAttr(/<path[^>]*\bstroke="(#[0-9a-fA-F]{3,8})"/, "the stroke colour"),
  points: (() => {
    const d = readAttr(/<path[^>]*\bd="([^"]+)"/, "the chevron path");
    const numbers = d.match(/-?[\d.]+/g);
    if (!numbers || numbers.length !== 6) {
      throw new Error(`Expected a three-point chevron in ${markPath}, got "${d}"`);
    }
    const n = numbers.map(Number);
    return [
      [n[0], n[1]],
      [n[2], n[3]],
      [n[4], n[5]],
    ];
  })(),
};

/* ------------------------------------------------------------------------- *
 * Geometry helpers
 * ------------------------------------------------------------------------- */

function hexToRgb(hex) {
  const value = hex.replace("#", "");
  const full =
    value.length === 3
      ? value
          .split("")
          .map((c) => c + c)
          .join("")
      : value;
  return [
    parseInt(full.slice(0, 2), 16),
    parseInt(full.slice(2, 4), 16),
    parseInt(full.slice(4, 6), 16),
  ];
}

/** Is the point inside the rounded plate? */
function insidePlate(x, y) {
  const { size, radius } = GEOMETRY;
  if (x < 0 || y < 0 || x > size || y > size) return false;
  const cx = Math.min(Math.max(x, radius), size - radius);
  const cy = Math.min(Math.max(y, radius), size - radius);
  if (x === cx || y === cy) return true;
  const dx = x - cx;
  const dy = y - cy;
  return dx * dx + dy * dy <= radius * radius;
}

/** A butt-capped segment of the stroke: a plain rectangle. */
function insideSegment(x, y, a, b, half) {
  const vx = b[0] - a[0];
  const vy = b[1] - a[1];
  const lengthSquared = vx * vx + vy * vy;
  const t = ((x - a[0]) * vx + (y - a[1]) * vy) / lengthSquared;
  if (t < 0 || t > 1) return false;
  const px = a[0] + t * vx - x;
  const py = a[1] + t * vy - y;
  return px * px + py * py <= half * half;
}

/** The miter wedge that fills the outer side of the joint. */
function buildMiter(points, half) {
  const [a, v, c] = points;
  const norm = ([x, y]) => {
    const length = Math.hypot(x, y);
    return [x / length, y / length];
  };
  const d1 = norm([v[0] - a[0], v[1] - a[1]]);
  const d2 = norm([c[0] - v[0], c[1] - v[1]]);

  // The outer side of the bend, and how far the miter reaches along it.
  const bisector = norm([d1[0] - d2[0], d1[1] - d2[1]]);
  const cosTheta = -(d1[0] * d2[0] + d1[1] * d2[1]);
  const sinHalf = Math.sqrt((1 - cosTheta) / 2);
  const reach = half / sinHalf;

  const outward = (d) => {
    const candidate = [-d[1], d[0]];
    const towardsOuter = candidate[0] * bisector[0] + candidate[1] * bisector[1];
    return towardsOuter > 0 ? candidate : [d[1], -d[0]];
  };

  const n1 = outward(d1);
  const n2 = outward(d2);
  const p1 = [v[0] + half * n1[0], v[1] + half * n1[1]];
  const p2 = [v[0] + half * n2[0], v[1] + half * n2[1]];
  const tip = [v[0] + reach * bisector[0], v[1] + reach * bisector[1]];

  // Two triangles: the wedge out to the miter tip, and the sliver back to the
  // vertex, which the two butt-capped rectangles leave open.
  return [
    [p1, tip, p2],
    [p1, v, p2],
  ];
}

function insideTriangle(x, y, [p, q, r]) {
  const sign = (ax, ay, bx, by, cx, cy) =>
    (ax - cx) * (by - cy) - (bx - cx) * (ay - cy);
  const d1 = sign(x, y, p[0], p[1], q[0], q[1]);
  const d2 = sign(x, y, q[0], q[1], r[0], r[1]);
  const d3 = sign(x, y, r[0], r[1], p[0], p[1]);
  const hasNegative = d1 < 0 || d2 < 0 || d3 < 0;
  const hasPositive = d1 > 0 || d2 > 0 || d3 > 0;
  return !(hasNegative && hasPositive);
}

/* ------------------------------------------------------------------------- *
 * Rasteriser - 4x4 supersampling, so the edges hold at 16px
 * ------------------------------------------------------------------------- */

const SAMPLES = 4;

function render(pixels) {
  const { size, strokeWidth, points } = GEOMETRY;
  const half = strokeWidth / 2;
  const miterParts = buildMiter(points, half);
  const scale = size / pixels;
  const plateRgb = hexToRgb(GEOMETRY.plate);
  const strokeRgb = hexToRgb(GEOMETRY.stroke);

  const data = Buffer.alloc(pixels * pixels * 4);

  for (let py = 0; py < pixels; py += 1) {
    for (let px = 0; px < pixels; px += 1) {
      let plateHits = 0;
      let strokeHits = 0;

      for (let sy = 0; sy < SAMPLES; sy += 1) {
        for (let sx = 0; sx < SAMPLES; sx += 1) {
          const x = (px + (sx + 0.5) / SAMPLES) * scale;
          const y = (py + (sy + 0.5) / SAMPLES) * scale;
          if (insidePlate(x, y)) plateHits += 1;
          if (
            insideSegment(x, y, points[0], points[1], half) ||
            insideSegment(x, y, points[1], points[2], half) ||
            miterParts.some((part) => insideTriangle(x, y, part))
          ) {
            strokeHits += 1;
          }
        }
      }

      const total = SAMPLES * SAMPLES;
      const plateAlpha = plateHits / total;
      // The chevron never leaves the plate, so it is clipped by it.
      const strokeAlpha = Math.min(strokeHits / total, plateAlpha);

      const offset = (py * pixels + px) * 4;
      const alpha = plateAlpha;
      if (alpha === 0) continue;

      // Composite the chevron over the plate, then store premultiplied-free.
      for (let channel = 0; channel < 3; channel += 1) {
        const under = plateRgb[channel] * (plateAlpha - strokeAlpha);
        const over = strokeRgb[channel] * strokeAlpha;
        data[offset + channel] = Math.round((under + over) / alpha);
      }
      data[offset + 3] = Math.round(alpha * 255);
    }
  }

  return data;
}

/* ------------------------------------------------------------------------- *
 * PNG
 * ------------------------------------------------------------------------- */

const CRC_TABLE = (() => {
  const table = new Int32Array(256);
  for (let n = 0; n < 256; n += 1) {
    let c = n;
    for (let k = 0; k < 8; k += 1) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    table[n] = c;
  }
  return table;
})();

function crc32(buffer) {
  let crc = -1;
  for (let i = 0; i < buffer.length; i += 1) {
    crc = (crc >>> 8) ^ CRC_TABLE[(crc ^ buffer[i]) & 0xff];
  }
  return (crc ^ -1) >>> 0;
}

function chunk(type, body) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(body.length, 0);
  const typed = Buffer.concat([Buffer.from(type, "ascii"), body]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(typed), 0);
  return Buffer.concat([length, typed, crc]);
}

function encodePng(pixels, rgba) {
  const header = Buffer.alloc(13);
  header.writeUInt32BE(pixels, 0);
  header.writeUInt32BE(pixels, 4);
  header[8] = 8; // bit depth
  header[9] = 6; // colour type: RGBA
  header[10] = 0; // deflate
  header[11] = 0; // adaptive filtering
  header[12] = 0; // no interlace

  const stride = pixels * 4;
  const raw = Buffer.alloc((stride + 1) * pixels);
  for (let row = 0; row < pixels; row += 1) {
    raw[row * (stride + 1)] = 0; // filter: none
    rgba.copy(raw, row * (stride + 1) + 1, row * stride, (row + 1) * stride);
  }

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", header),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

/** An .ico holding PNG entries, which every current browser reads. */
function encodeIco(entries) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(entries.length, 4);

  const directory = Buffer.alloc(16 * entries.length);
  let offset = header.length + directory.length;

  entries.forEach((entry, index) => {
    const at = index * 16;
    directory[at] = entry.size >= 256 ? 0 : entry.size;
    directory[at + 1] = entry.size >= 256 ? 0 : entry.size;
    directory[at + 2] = 0; // palette size
    directory[at + 3] = 0; // reserved
    directory.writeUInt16LE(1, at + 4); // colour planes
    directory.writeUInt16LE(32, at + 6); // bits per pixel
    directory.writeUInt32LE(entry.png.length, at + 8);
    directory.writeUInt32LE(offset, at + 12);
    offset += entry.png.length;
  });

  return Buffer.concat([header, directory, ...entries.map((e) => e.png)]);
}

/* ------------------------------------------------------------------------- *
 * Write
 * ------------------------------------------------------------------------- */

const sizes = [16, 32];
const icoEntries = sizes.map((size) => ({
  size,
  png: encodePng(size, render(size)),
}));

writeFileSync(join(publicDir, "favicon.ico"), encodeIco(icoEntries));
writeFileSync(join(publicDir, "apple-touch-icon.png"), encodePng(180, render(180)));
copyFileSync(markPath, join(publicDir, "favicon.svg"));

console.log("Wrote favicon.ico (16, 32), apple-touch-icon.png (180), favicon.svg");
console.log(`From ${GEOMETRY.size}px mark: plate ${GEOMETRY.plate}, stroke ${GEOMETRY.stroke}`);
