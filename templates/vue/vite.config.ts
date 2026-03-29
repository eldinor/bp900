import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  server: {
    open: false,
  },
  build: {
    outDir: "../../dist/vue",
    emptyOutDir: true,
  },
});
