# Babylon.js 9 + Vite 8 TypeScript Template

A compact Babylon.js starter with WebGPU-first rendering, automatic WebGL2 fallback, and a simple demo scene with Havok physics.

## Commands

`npm install`

`npm run dev`

`npm run typecheck`

`npm run build`

`npm run preview`

## Documentation

- [`README.md`](./README.md): project overview
- [`HOWTO.md`](./HOWTO.md): practical usage guide
- [`whatsnew.md`](./whatsnew.md): beginner-friendly summary of recent improvements
- [`changelog.md`](./changelog.md): technical change log

## What is included

- Babylon.js 9, Vite 8, and TypeScript 6
- WebGPU-first engine boot with WebGL2 fallback
- Havok physics enabled in the starter scene
- GLB model loading example using the bundled `public/model/Xbot.glb`
- Babylon GUI overlay
- GUI demo buttons for disposing axes, xBot, and the GUI itself
- FPS counter
- Dev-only inspector toggle with `Ctrl+Alt+Shift+I`
- Axes viewer in development
- Default rendering pipeline with FXAA and 4x MSAA
- Lazy-loaded scene helpers to keep the entry bundle smaller

## Project shape

- [`src/app.ts`](./src/app.ts): application bootstrap, engine creation, physics setup, lifecycle hooks
- [`src/config/template-config.ts`](./src/config/template-config.ts): feature flags and rendering defaults
- [`src/playground/main-scene.ts`](./src/playground/main-scene.ts): camera, light, environment, and scene component loading
- [`src/playground/assets.ts`](./src/playground/assets.ts): central asset manifest for public models and textures
- [`src/playground/ground.ts`](./src/playground/ground.ts): simple physics demo content
- [`src/playground/model-loader.ts`](./src/playground/model-loader.ts): GLB loading example for `Xbot.glb`
- [`src/playground/gui.ts`](./src/playground/gui.ts): fullscreen Babylon GUI demo

## Feature switches

The easiest way to customize the template is through [`src/config/template-config.ts`](./src/config/template-config.ts).

You can turn these on or off there:

- physics
- demo model loading
- GUI
- rendering pipeline
- axes viewer
- FPS overlay
- WebGPU-first startup

## Asset workflow

Static files live in `public/`.

Use [`src/playground/assets.ts`](./src/playground/assets.ts) as the single place to reference them from code. That keeps URLs centralized and makes it easier to swap demo assets later.

Current manifest entries:

- `sceneAssets.texture.amiga`
- `sceneAssets.model.xbot`

The demo scene shows how to load a GLB with Babylon's loader plugin in [`src/playground/model-loader.ts`](./src/playground/model-loader.ts).

For imported GLB models, rotation is typically handled with `rotationQuaternion`, not plain Euler `rotation`. In this template, the scene sets the GLB orientation using that quaternion approach before switching back to plain rotation when desired.

## Notes

- Havok is part of the default demo behavior so users immediately see physics working.
- The project still has a fairly large bundle because Babylon engine features and Havok are substantial dependencies.
- If you want a smaller production baseline, the next step is making physics optional at load time instead of bundling it into the default path.

Based on https://github.com/minibao/babylon-vite

Made by https://babylonpress.org/
