# HOWTO

This file explains how to work with `bp900` and its template folders.

## 1. Install and run

Install dependencies once in the repo root:

`npm install`

Run the main template:

- `npm run dev`
- `npm run build`
- `npm run preview`

Run the other templates:

- `npm run dev:vanilla`
- `npm run dev:react`
- `npm run dev:vue`
- `npm run dev:svelte`

Build the other templates:

- `npm run build:vanilla`
- `npm run build:react`
- `npm run build:vue`
- `npm run build:svelte`

Preview the other templates:

- `npm run preview:vanilla`
- `npm run preview:react`
- `npm run preview:vue`
- `npm run preview:svelte`

Type-check the repo:

`npm run typecheck`

## 2. Choose your base app

If you want to start a project from one of the framework templates, pick one folder and treat it as your app base:

- [`templates/vanilla`](./templates/vanilla)
- [`templates/react`](./templates/react)
- [`templates/vue`](./templates/vue)
- [`templates/svelte`](./templates/svelte)

Example workflow for React:

1. Start with `npm run dev:react`
2. Edit files in [`templates/react`](./templates/react)
3. Build with `npm run build:react`

The same pattern applies to `vue`, `svelte`, and `vanilla`.

## 3. Understand the main template

The root app lives in `src/` and is the full `bp900` Babylon template.

Important files:

- [`src/app.ts`](./src/app.ts): engine bootstrap and render loop
- [`src/config/template-config.ts`](./src/config/template-config.ts): main feature switches
- [`src/playground/main-scene.ts`](./src/playground/main-scene.ts): camera, light, environment, and scene loading
- [`src/playground/assets.ts`](./src/playground/assets.ts): public asset paths
- [`src/playground/model-loader.ts`](./src/playground/model-loader.ts): demo GLB loading
- [`src/playground/gui.ts`](./src/playground/gui.ts): GUI sample
- [`src/playground/ground.ts`](./src/playground/ground.ts): simple scene content

## 4. Turn root-template features on and off

Open [`src/config/template-config.ts`](./src/config/template-config.ts).

You can control:

- `physics`
- `demoModel`
- `gui`
- `pipeline`
- `axesViewer`
- `showFps`
- `webgpuFirst`

Useful examples:

- disable `physics` for a lighter setup
- disable `demoModel` if you want primitives only
- disable `gui` if you want a cleaner baseline
- disable `webgpuFirst` if you want to stay on WebGL2 during testing

## 5. Replace the demo model

Put your `.glb` file into `public/model/`.

Then update [`src/playground/assets.ts`](./src/playground/assets.ts) so the asset manifest points to the new file.

If needed, update [`src/playground/model-loader.ts`](./src/playground/model-loader.ts) to change:

- position
- scale
- animation behavior
- root mesh handling

For imported GLB models, prefer `rotationQuaternion` over plain `rotation` when adjusting initial orientation.

## 6. Add more scene content

A simple growth pattern for the root template is:

- add another helper file in `src/playground/`
- import and call it from [`src/playground/main-scene.ts`](./src/playground/main-scene.ts)
- keep reusable asset paths in [`src/playground/assets.ts`](./src/playground/assets.ts)

This keeps scene code easier to maintain as it grows.

## 7. Debugging tips

- Press `Ctrl+Alt+Shift+I` in development to open the Babylon inspector
- Watch the FPS counter while testing changes
- If WebGPU is unavailable, the root template falls back to WebGL2
- If a model does not appear, check the path in [`src/playground/assets.ts`](./src/playground/assets.ts)

## 8. When to use each template

Use the root `src/` template when you want:

- the richest starter
- feature flags
- physics
- GUI and demo content included

Use `templates/vanilla` when you want:

- the smallest baseline
- plain TypeScript with no framework

Use `templates/react`, `templates/vue`, or `templates/svelte` when you want:

- framework-based app structure from the start
- local Babylon scene code inside the framework template

## 9. Creating another template folder

If you add another template under `templates/`, keep the same pattern:

- one folder per template
- its own `index.html`
- its own `src/`
- its own `vite.config.ts`
- no shared engine or scene code unless you intentionally want coupling

That keeps each starter independent and easy to extract into its own project later.
