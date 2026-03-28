# Babylon.js 9 + Vite 8 TypeScript Template

A compact Babylon.js starter with WebGPU-first rendering, automatic WebGL2 fallback, and a simple demo scene with Havok physics.

## Commands

`npm install`

`npm run dev`

`npm run typecheck`

`npm run build`

`npm run preview`

## What is included

- Babylon.js 9, Vite 8, and TypeScript 6
- WebGPU-first engine boot with WebGL2 fallback
- Havok physics enabled in the starter scene
- Babylon GUI overlay
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
- [`src/playground/gui.ts`](./src/playground/gui.ts): fullscreen Babylon GUI demo

## Feature switches

The easiest way to customize the template is through [`src/config/template-config.ts`](./src/config/template-config.ts).

You can turn these on or off there:

- physics
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

## Notes

- Havok is part of the default demo behavior so users immediately see physics working.
- The project still has a fairly large bundle because Babylon engine features and Havok are substantial dependencies.
- If you want a smaller production baseline, the next step is making physics optional at load time instead of bundling it into the default path.

Based on https://github.com/minibao/babylon-vite

Made by https://babylonpress.org/
