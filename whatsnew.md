# What's New

This template has been updated to be easier to explore and easier to build on.

## The most important changes

- It now uses newer versions of Babylon.js, Vite, and TypeScript.
- It tries to use WebGPU automatically, but if your browser or device does not support it, it switches to WebGL2 instead.
- The demo scene now shows more than simple shapes. It can also load a real `.glb` 3D model: `Xbot.glb`.
- Physics is still included in the demo, so you can immediately see Havok working.
- The GUI overlay still works, including in the WebGPU path.
- The GLB example now uses quaternion rotation, which matches how imported glTF/GLB models commonly behave in Babylon.js.
- The GUI demo now includes quick buttons to dispose the axes helper and the loaded xBot model.

## New template collection

This project is no longer only one Babylon starter.

It now also includes separate template folders for:

- `vanilla`
- `react`
- `vue`
- `svelte`

That means you can choose the kind of app you want to start with instead of adapting everything from one root setup.

Each template is self-contained, so the framework versions do not depend on shared scene or engine files from the main template.

You can run them directly with:

- `npm run dev:vanilla`
- `npm run dev:react`
- `npm run dev:vue`
- `npm run dev:svelte`

This makes the repo more useful as a starter collection, not only as a single demo project.

## Why this matters

If you are new to Babylon.js, this gives you working examples of:

- starting a scene
- using a camera and light
- enabling physics
- loading a 3D model
- showing a Babylon GUI overlay
- organizing assets and feature switches

## What you can change safely

If you want to experiment, the easiest place to start is:

- [`src/config/template-config.ts`](./src/config/template-config.ts)

There you can turn features on or off, such as:

- physics
- demo model loading
- GUI
- axes viewer
- FPS display

## What the demo now teaches

The template is no longer only a rendering starter. It also shows a beginner-friendly structure for a small 3D app:

- `app.ts` starts the engine and scene
- `main-scene.ts` builds the main scene
- `ground.ts` adds simple demo objects
- `model-loader.ts` shows how to load a GLB model
- `gui.ts` shows how to add Babylon GUI
- `assets.ts` shows how to keep file paths organized

## Good to know

- The project is still a demo starter, not a finished game/app architecture.
- Some build output is large because Babylon features like GUI, physics, and glTF support are powerful but not tiny.
- That is normal for a feature-rich starter template.
