# BabylonPress Babylon.js 9 Templates

This is a Babylon.js 9 starter templates collection built on Vite 8 and TypeScript 6, created by [BabylonPress](https://babylonpress.org/).

It delivers a strong foundation for modern 3D web experiences: fast to start, pleasant to work with, and flexible enough to grow from a simple prototype into a polished product. The template combines a clean developer setup with powerful rendering, making it easy to build interactive scenes without fighting the tooling.

What makes it especially good is the balance between usability and capability. It supports multiple frontend styles (Vanilla, React, Vue, Svelte), keeps the project structure approachable, and gives the room to add richer visuals, UI, and gameplay or product features over time. In short, it is not just functional, but a reliable, scalable, and developer-friendly template with real creative potential.

It includes:

- the main `bp900` Babylon template in `src/` - Havok physics, GLB loading, Babylon GUI, and a lot of sugar to make development sweeter
- a minimal `vanilla` Babylon template
- a minimal `react` Babylon template
- a minimal `vue` Babylon template
- a minimal `svelte` Babylon template

Each template is self-contained. They do not share engine, scene, or config code.

## Install

`npm install`

## Commands

Root template:

- `npm run dev`
- `npm run build`
- `npm run preview`

Other templates:

- `npm run dev:vanilla`
- `npm run build:vanilla`
- `npm run preview:vanilla`
- `npm run dev:react`
- `npm run build:react`
- `npm run preview:react`
- `npm run dev:vue`
- `npm run build:vue`
- `npm run preview:vue`
- `npm run dev:svelte`
- `npm run build:svelte`
- `npm run preview:svelte`

Checks:

- `npm run typecheck`

## Template folders

- [`src/app.ts`](./src/app.ts): main `bp900` application entry
- [`templates/vanilla`](./templates/vanilla): plain TypeScript Babylon starter
- [`templates/react`](./templates/react): React + Babylon starter
- [`templates/vue`](./templates/vue): Vue + Babylon starter
- [`templates/svelte`](./templates/svelte): Svelte + Babylon starter

## How to use a template as your app base

There are two simple ways to work with this repo:

1. Work inside this repo and choose one template folder as your app.
2. Copy the template folder you want into a new project and continue there.

Examples:

- use `templates/react` as your app and run `npm run dev:react`
- use `templates/vue` as your app and run `npm run dev:vue`
- use `templates/svelte` as your app and run `npm run dev:svelte`
- use `templates/vanilla` as your app and run `npm run dev:vanilla`

## Main template features

The root `bp900` template includes:

- WebGPU-first startup with WebGL2 fallback
- Havok physics setup
- Babylon GUI example
- GLB model loading example
- FPS counter
- dev-only inspector toggle with `Ctrl+Alt+Shift+I`
- rendering pipeline defaults

## Main project shape

- [`src/app.ts`](./src/app.ts): application bootstrap and engine lifecycle
- [`src/config/template-config.ts`](./src/config/template-config.ts): main template feature flags
- [`src/playground/main-scene.ts`](./src/playground/main-scene.ts): scene setup
- [`src/playground/assets.ts`](./src/playground/assets.ts): asset URLs
- [`src/playground/model-loader.ts`](./src/playground/model-loader.ts): GLB loading example
- [`src/playground/gui.ts`](./src/playground/gui.ts): Babylon GUI example

## Documentation

- [`HOWTO.md`](./HOWTO.md): practical usage guide
- [`whatsnew.md`](./whatsnew.md): beginner-friendly summary of recent improvements
- [`changelog.md`](./changelog.md): technical change log

## Repository

- Homepage: https://babylonpress.org/
- Repository: https://github.com/eldinor/bp900
- Issues: https://github.com/eldinor/bp900/issues

Based on https://github.com/eldinor/bp800/ which was based on https://github.com/minibao/babylon-vite
