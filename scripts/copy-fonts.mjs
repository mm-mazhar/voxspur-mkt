/**
 * Copies the self-hosted WOFF2 files from the Fontsource packages into
 * public/fonts/, which is where the @font-face rules in src/styles/global.css
 * point.
 *
 * The site serves these files itself and fetches nothing from a third party,
 * so the files are committed. This script exists so they can be regenerated
 * when a font package is updated: npm run fonts
 *
 * Archivo is taken from its "wdth" build, which carries both the weight and
 * the width axis. The width axis is required, because the display and headline
 * styles set font-stretch above 100%.
 */

import { copyFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "public", "fonts");

/** [package, source file, published name] */
const files = [
  ["@fontsource-variable/archivo", "archivo-latin-wdth-normal.woff2", "archivo-latin-wdth.woff2"],
  ["@fontsource-variable/archivo", "archivo-latin-ext-wdth-normal.woff2", "archivo-latin-ext-wdth.woff2"],
  ["@fontsource-variable/geist", "geist-latin-wght-normal.woff2", "geist-latin-wght.woff2"],
  ["@fontsource-variable/geist", "geist-latin-ext-wght-normal.woff2", "geist-latin-ext-wght.woff2"],
  ["@fontsource-variable/geist-mono", "geist-mono-latin-wght-normal.woff2", "geist-mono-latin-wght.woff2"],
  ["@fontsource-variable/geist-mono", "geist-mono-latin-ext-wght-normal.woff2", "geist-mono-latin-ext-wght.woff2"],
];

mkdirSync(out, { recursive: true });

for (const [pkg, from, to] of files) {
  const source = join(root, "node_modules", pkg, "files", from);
  copyFileSync(source, join(out, to));
  console.log(`${to}  <-  ${pkg}/files/${from}`);
}

console.log(`\n${files.length} files copied into public/fonts/`);
