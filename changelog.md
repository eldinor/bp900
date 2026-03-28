# Changelog

## 0.1.0

This release turns the project into a small Babylon.js starter collection instead of a single template.

### Added

- Added a self-contained `vanilla` template in [`templates/vanilla`](./templates/vanilla).
- Added a self-contained `react` template in [`templates/react`](./templates/react).
- Added a self-contained `vue` template in [`templates/vue`](./templates/vue).
- Added a self-contained `svelte` template in [`templates/svelte`](./templates/svelte).
- Added template-specific dev, build, and preview scripts in [`package.json`](./package.json).
- Added [`scripts/run-template.mjs`](./scripts/run-template.mjs) to launch template folders through Vite.
- Added package metadata fields such as description, homepage, repository, bugs, license, and keywords.

### Changed

- Updated the project documentation in [`README.md`](./README.md) to describe `bp900` as a template collection.
- Updated [`HOWTO.md`](./HOWTO.md) to explain how to use a template folder as the base of an app.
- Updated repository links from the old GitHub location to `https://github.com/eldinor/bp900`.
- Kept framework templates self-contained so they do not share engine, scene, or config code.
- Updated the Svelte bootstrap to use the Svelte 5 `mount(...)` API.

### Removed

- Removed the Astro template after testing the compatibility tradeoffs against the repo's Vite 8 setup.

## Previous engine/template update

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

### Files added in that update

- [`src/config/template-config.ts`](./src/config/template-config.ts)
- [`src/playground/assets.ts`](./src/playground/assets.ts)
- [`src/playground/model-loader.ts`](./src/playground/model-loader.ts)

### Behavior changes from that update

- The app tries WebGPU first and falls back to WebGL2 automatically.
- Physics stays enabled by default for the demo scene, but Havok is loaded asynchronously.
- GUI stays enabled by default for the demo scene, but the GUI module is conditionally loaded.
- The demo includes both primitive physics objects and a loaded GLB character model.
