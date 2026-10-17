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
  // A static build writes /agencies as a small page that refreshes to
  // /partners, so old links keep working without host-specific files.
  redirects: {
    "/agencies": "/partners",
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
