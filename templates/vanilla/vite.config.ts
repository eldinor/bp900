import { defineConfig } from "vite";
import rootPackage from "../../package.json";

export default defineConfig({
  define: {
    __VANILLA_VERSION__: JSON.stringify(rootPackage.version),
  },
  server: {
    open: false,
  },
  build: {
    outDir: "../../dist/vanilla",
    emptyOutDir: true,
  },
});
