# Babylon Lite Compat template

This template uses `@babylonjs/lite-compat` directly. It keeps familiar Babylon.js-shaped classes while running on the WebGPU-first `@babylonjs/lite` renderer.

## Run it

From the repository root:

```sh
npm run dev:lite-compat
npm run build:lite-compat
npm run preview:lite-compat
```

The demo includes:

- a `WebGPUEngine` and `Scene`
- the same `ArcRotateCamera` angles, target relationship, and radius as the root template
- a hemispheric light
- environment lighting without a generated ground or skybox
- the same 10×10 ground and bouncing sphere composition as the root scene
- the local `Xbot.glb` model and its animation
- a development-only Lite position gizmo at the scene origin with its private pointer registrations removed, making it display-only like the root template's `AxesViewer`
- the same top-right FPS display and full-canvas styling

The template intentionally omits GUI, Inspector, post-process pipelines, WebXR, and Babylon-style physics because those APIs are not currently supported by the Lite Compat layer. The sphere uses a small local gravity/restitution simulation to preserve the root template's visible motion.

## Direct imports and migration mode

New Lite Compat code can import the compatibility surface directly, as this template does:

```ts
import { Scene, WebGPUEngine } from "@babylonjs/lite-compat";
```

For an existing Babylon.js application, Lite Compat also provides a Vite plugin that redirects supported `@babylonjs/core` and `@babylonjs/loaders` imports:

```ts
import { defineConfig } from "vite";
import { liteCompat } from "@babylonjs/lite-compat/vite";

export default defineConfig({
  plugins: [liteCompat()],
});
```

Unsupported imports such as `@babylonjs/gui` are not redirected. This makes missing compatibility explicit instead of silently changing behavior.
