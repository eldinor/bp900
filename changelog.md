# Changelog

## Current update

- Upgraded the template to Babylon.js 9, Vite 8, TypeScript 6, and the latest related packages.
- Updated the TypeScript and Vite configuration to match the newer toolchain.
- Added automatic WebGPU-first startup with fallback to WebGL2.
- Enabled the default rendering pipeline in the scene so FXAA and MSAA are actually active.
- Moved template feature switches into [`src/config/template-config.ts`](./src/config/template-config.ts).
- Added a dedicated asset manifest in [`src/playground/assets.ts`](./src/playground/assets.ts).
- Added a separate `npm run typecheck` script.
- Cleaned up template debug noise like unused logs.
- Made Havok load on demand instead of bundling it directly into the initial startup path.
- Made the Babylon GUI module load conditionally when the GUI feature is enabled.
- Added a GLB loading example using `public/model/Xbot.glb`.
- Restored the required WebGPU GUI dynamic-texture extension so Babylon GUI works correctly with WebGPU.
- Updated the GLB demo transform to use quaternion rotation, which is the correct approach for imported glTF/GLB content.
- Added GUI buttons to dispose the axes helper and loaded xBot model from the demo.
- Refreshed the main README so it matches the current template behavior.

## New files

- [`src/config/template-config.ts`](./src/config/template-config.ts)
- [`src/playground/assets.ts`](./src/playground/assets.ts)
- [`src/playground/model-loader.ts`](./src/playground/model-loader.ts)

## Behavior changes

- The app now tries WebGPU first and falls back to WebGL2 automatically.
- Physics stays enabled by default for the demo scene, but Havok is loaded asynchronously.
- GUI stays enabled by default for the demo scene, but the GUI module is now conditionally loaded.
- The demo now includes both primitive physics objects and a loaded GLB character model.
