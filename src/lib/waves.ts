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
 * How far down a bar's loop goes, as a fraction of its top. A bar loops between
 * `high` and `high x ratio` of the row, never below 0.06.
 */
export const WAVE_RATIOS = [0.2, 0.3, 0.4] as const;

/**
 * Inline custom properties and keyframe name for each bar of a row. The tallest
 * bars sit in the middle, like a voice that swells and falls away, and every
 * bar has its own loop length and offset so the row never moves in unison.
 *
 * Heights are rounded to a tenth of the row and the dip to one of three
 * ratios, so a bar uses one of 30 shared keyframes (`wave-<tenths>-<ratio
 * index>`, written out in Bars.astro) instead of a keyframe of its own.
 * Keyframes that hold literal values, not `var()`, run noticeably cheaper.
 * Keep the two in step: a name with no keyframes would leave the bar still.
 *
 * `--mid` is the bar's resting scale, which is what shows with motion off.
 */
export function barStyles(count: number, seed: number, peak = 1): string[] {
  const random = mulberry32(seed);
  return Array.from({ length: count }, (_, index) => {
    const x = count > 1 ? index / (count - 1) : 0.5;
    const envelope = 0.3 + 0.7 * Math.exp(-(((x - 0.5) / 0.32) ** 2));
    const high = Math.min(1, Math.max(0.1, envelope * peak * (0.7 + random() * 0.3)));
    const dip = 0.18 + random() * 0.25;
    const duration = 0.9 + random() * 1.1;
    const delay = -random() * 2;

    const tenths = Math.min(10, Math.max(1, Math.round(high * 10)));
    const top = tenths / 10;
    const ratioIndex = WAVE_RATIOS.reduce(
      (best, ratio, i) => (Math.abs(ratio - dip) < Math.abs((WAVE_RATIOS[best] ?? 0) - dip) ? i : best),
      0,
    );
    const bottom = Math.max(0.06, top * (WAVE_RATIOS[ratioIndex] ?? 0.2));
    const rest = (top + bottom) / 2;
    return `--mid:${rest.toFixed(3)};--d:${duration.toFixed(2)}s;--delay:${delay.toFixed(2)}s;animation-name:wave-${tenths}-${ratioIndex}`;
  });
}
