import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import sveltePackage from "svelte/package.json";

export default defineConfig({
  plugins: [svelte()],
  define: {
    __SVELTE_VERSION__: JSON.stringify(sveltePackage.version),
  },
  server: {
    open: false,
  },
  build: {
    outDir: "../../dist/svelte",
    emptyOutDir: true,
  },
});
