# Changelog

## 0.2.0 - 2026-06-28

### Added

- Added a WebGPU-first [`templates/lite-compat`](./templates/lite-compat) starter using `@babylonjs/lite` 1.6 and `@babylonjs/lite-compat` 1.6 preview.
- Added `dev:lite-compat`, `build:lite-compat`, and `preview:lite-compat` scripts.
- Added the Babylon Lite BRDF LUT at [`public/brdf-lut.png`](./public/brdf-lut.png) for environment lighting.

### Changed

- Updated direct npm dependencies to their latest releases, including Babylon.js 9.14, Vite 8.1, React 19.2, Vue 3.5, Svelte 5.56, and TypeScript 6.0.
- Documented the Lite Compat template and its intentionally smaller supported feature surface.
- Linked the separately shipped [`eldinor/babylon-lite-template`](https://github.com/eldinor/babylon-lite-template) repository from the main README.
- Matched the Lite Compat template's canvas, camera, lighting, ground, bouncing sphere, model layout, animation, and FPS display to the root template.
- Added a development-only Lite position gizmo with its private pointer registrations removed, making the real gizmo display-only like the root template's `AxesViewer`.
- Replaced the Lite Compat template's hand-written sphere bounce with native Lite Havok-V2 physics using `createHavokWorld()` and `createPhysicsAggregate()`.

### Fixed

- Matched the Lite Havok timestep to the original delta-driven `HavokPlugin(true, hk)` behavior, preventing physics from running too quickly on high-refresh displays; documented the upstream behavior in [`docs/issues/babylon-lite-havok-timestep-is-frame-rate-dependent.md`](./docs/issues/babylon-lite-havok-timestep-is-frame-rate-dependent.md).
- Registered Babylon.js CubeTexture runtime side effects before creating the default environment, fixing `CubeTexture.CreateFromPrefilteredData is not a function` after the Babylon.js 9.14 upgrade.
- Registered the Babylon.js physics scene component before initializing Havok, fixing `No Physics Engine available` when creating physics aggregates.
- Added an explicit startup error when Havok cannot be attached to the scene.
- Avoided Lite's overlapping gizmo hover-pick readbacks, which caused `pick-color-staging` buffer mapping errors, by unregistering the display-only gizmo axes from the private pointer dispatcher.

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
