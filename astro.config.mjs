import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// Static output — Pages Functions in `functions/` are picked up by Cloudflare Pages
// at deploy time independently of Astro. No adapter needed.
export default defineConfig({
  output: "static",
  site: "https://buildquietwinloud.com",
  vite: {
    plugins: [tailwindcss()],
  },
  server: {
    host: true,
    port: 4321,
  },
});
