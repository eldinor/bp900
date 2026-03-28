# HOWTO

This file explains practical ways to use this template.

## 1. Start the project

Install dependencies:

`npm install`

Run the dev server:

`npm run dev`

Run the vanilla template:

`npm run dev:vanilla`

Run the React template:

`npm run dev:react`

Create a production build:

`npm run build`

Create the vanilla production build:

`npm run build:vanilla`

Create the React production build:

`npm run build:react`

Check TypeScript only:

`npm run typecheck`

Preview the production build:

`npm run preview`

Preview the vanilla production build:

`npm run preview:vanilla`

Preview the React production build:

`npm run preview:react`

## 2. Understand the main files

- [`src/app.ts`](./src/app.ts)
  Starts the engine, creates the Babylon scene, enables physics, and starts rendering.

- [`src/playground/main-scene.ts`](./src/playground/main-scene.ts)
  Sets up the camera, lighting, environment, post-processing pipeline, and demo content.

- [`src/config/template-config.ts`](./src/config/template-config.ts)
  Central place for turning features on and off.

- [`src/playground/assets.ts`](./src/playground/assets.ts)
  Central place for public asset paths.

- [`src/playground/model-loader.ts`](./src/playground/model-loader.ts)
  Example of loading a GLB model.

- [`src/playground/gui.ts`](./src/playground/gui.ts)
  Example of Babylon GUI.

- [`src/playground/ground.ts`](./src/playground/ground.ts)
  Example of simple meshes and physics bodies.

## 3. Turn features on and off

Open [`src/config/template-config.ts`](./src/config/template-config.ts).

You can control:

- `physics`
- `demoModel`
- `gui`
- `pipeline`
- `axesViewer`
- `showFps`
- `webgpuFirst`

Examples:

- Turn off physics if you want a lighter scene.
- Turn off `demoModel` if you only want primitive objects.
- Turn off GUI if you do not need the overlay.
- Turn off `webgpuFirst` if you want to stay on WebGL2 while testing.

## 4. Replace the demo model

Put your own `.glb` file into `public/model/`.

Then update [`src/playground/assets.ts`](./src/playground/assets.ts) so the asset manifest points to your file.

If needed, update [`src/playground/model-loader.ts`](./src/playground/model-loader.ts) to:

- change position
- change scale
- start or stop animations
- choose a different root mesh

For GLB models, prefer `rotationQuaternion` over plain `rotation` when changing orientation. Imported glTF/GLB nodes commonly use quaternions, so quaternion-based rotation is the safer default.

A practical trick used in this template:

- set `rootMesh.rotationQuaternion` first for imported GLB orientation
- then, if you want, set it to `null` and continue with plain `rotation`

This is useful when you want the initial imported orientation to be correct, but still want simple Euler rotation editing afterward.

## 5. Add more scene content

There are a few easy patterns you can follow:

- Add another helper file in `src/playground/` for a new system, such as `lights.ts`, `character.ts`, or `environment.ts`.
- Import and call it from [`src/playground/main-scene.ts`](./src/playground/main-scene.ts).
- Keep reusable file paths in [`src/playground/assets.ts`](./src/playground/assets.ts).

This keeps the scene easier to read as it grows.

## 6. Use the template as a learning project

This template already demonstrates:

- engine creation
- scene creation
- WebGPU/WebGL fallback
- physics setup
- model loading
- GUI setup
- render loop

If you are learning Babylon.js, a good progression is:

1. Change the camera settings.
2. Change the light intensity and direction.
3. Replace the demo model.
4. Add your own mesh or imported asset.
5. Add your own GUI controls.
6. Add your own gameplay logic or interactions.

## 7. Use the template as a real project base

For a larger project, a good next step is to split code by responsibility:

- engine/bootstrap
- scene systems
- assets
- gameplay/app state
- UI

This template already gives you the beginning of that structure.

## 8. Debugging tips

- Press `Ctrl+Alt+Shift+I` in development to open the Babylon inspector.
- Use the FPS counter to watch performance changes.
- If WebGPU is unavailable, the template will fall back to WebGL2.
- If a model does not appear, first check the path in [`src/playground/assets.ts`](./src/playground/assets.ts).

## 9. When to disable features

Disable `physics` when:

- you do not need Havok
- you want faster scene setup

Disable `demoModel` when:

- you want a minimal primitive-only starter
- you are replacing Xbot with your own asset flow

Disable `gui` when:

- you do not need Babylon GUI
- you want a cleaner visual baseline

## 10. Suggested next improvements

- add shadows
- frame the camera around the loaded model automatically
- add an environment texture
- add a reusable asset loader service
- add gameplay or interaction logic

## 11. Separate template folders

If you want another isolated template, follow the same pattern as [`templates/vanilla`](./templates/vanilla):

- add a folder under `templates/`
- give it its own `index.html`
- give it its own `src/` entry and assets
- give it its own `vite.config.ts` when it needs different build behavior

This keeps each template independent instead of sharing scene or engine code.
