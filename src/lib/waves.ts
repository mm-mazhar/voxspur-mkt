/**
 * Deterministic pseudo-random numbers, so every build draws the same waves and
 * a rebuild never changes the page for no reason.
 */
function mulberry32(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Inline custom properties for each bar of a row: its lowest and highest
 * height as a fraction of the row, its resting height (what shows when motion
 * is off), and the length and offset of its loop. The tallest bars sit in the
 * middle, like a voice that swells and falls away, and every bar has its own
 * loop so the row never moves in unison.
 */
export function barStyles(count: number, seed: number, peak = 1): string[] {
  const random = mulberry32(seed);
  return Array.from({ length: count }, (_, index) => {
    const x = count > 1 ? index / (count - 1) : 0.5;
    const envelope = 0.3 + 0.7 * Math.exp(-(((x - 0.5) / 0.32) ** 2));
    const high = Math.min(1, Math.max(0.1, envelope * peak * (0.7 + random() * 0.3)));
    const low = Math.max(0.06, high * (0.18 + random() * 0.25));
    const rest = (low + high) / 2;
    const duration = 0.9 + random() * 1.1;
    const delay = -random() * 2;
    return `--lo:${low.toFixed(2)};--hi:${high.toFixed(2)};--mid:${rest.toFixed(2)};--d:${duration.toFixed(2)}s;--delay:${delay.toFixed(2)}s`;
  });
}
