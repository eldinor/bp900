import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    open: false,
  },
  build: {
    outDir: "../../dist/react",
    emptyOutDir: true,
  },
});
