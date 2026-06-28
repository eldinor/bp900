import { defineConfig } from "vite";

export default defineConfig({
  publicDir: "../../public",
  server: {
    open: false,
  },
  build: {
    outDir: "../../dist/lite-compat",
    emptyOutDir: true,
  },
});
