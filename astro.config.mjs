// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// Static output only: no adapter, no server. `astro build` writes a plain
// dist/ folder that any static host can serve.
export default defineConfig({
  output: "static",
  trailingSlash: "ignore",
  build: {
    format: "directory",
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
