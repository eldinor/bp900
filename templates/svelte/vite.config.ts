import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

export default defineConfig({
  plugins: [svelte()],
  server: {
    open: false,
  },
  build: {
    outDir: "../../dist/svelte",
    emptyOutDir: true,
  },
});
