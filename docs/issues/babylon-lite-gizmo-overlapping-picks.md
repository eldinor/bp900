# Gizmo hover picking starts overlapping GPU buffer mappings

## Packages

- `@babylonjs/lite@1.6.0`
- `@babylonjs/lite-compat@1.6.0-preview`
- WebGPU renderer

## Description

Moving the pointer over a Lite position gizmo can start another asynchronous GPU pick before the previous hover pick has completed. Both picks reuse the same `pick-color-staging` buffer, so WebGPU rejects the second `mapAsync()` call.

## Error

```text
[Buffer "pick-color-staging"] is already mapped.
While calling [Buffer "pick-color-staging"].MapAsync(MapMode::Read, 0, 256, ...).

OperationError: Failed to execute 'mapAsync' on 'GPUBuffer':
Buffer already has an outstanding map pending.
    at pickAsync
    at handleHoverMove
    at HTMLCanvasElement.onPointerMove
```

## Minimal reproduction

```ts
import {
  ArcRotateCamera,
  GizmoManager,
  MeshBuilder,
  Scene,
  Vector3,
  WebGPUEngine,
} from "@babylonjs/lite-compat";

const canvas = document.querySelector("canvas")!;
const engine = new WebGPUEngine(canvas);
await engine.initAsync();

const scene = new Scene(engine);
const camera = new ArcRotateCamera(
  "camera",
  Math.PI / 2,
  Math.PI / 3,
  8,
  Vector3.Zero(),
  scene,
);
camera.attachControl(canvas, true);
scene.activeCamera = camera;

const target = MeshBuilder.CreateBox("target", { size: 1 }, scene);

const manager = new GizmoManager(scene);
manager.positionGizmoEnabled = true;
manager.attachToMesh(target);

engine.runRenderLoop(() => scene.render());
```

Move the pointer rapidly over the canvas or position-gizmo handles.

## Actual behavior

`handleHoverMove()` calls `pickAsync()` for each idle `pointermove`. `hoverToken` prevents stale results from changing hover state, but it does not serialize the GPU work. A later call can therefore reach `mapAsync()` while the shared staging buffers are still mapped or have a mapping pending.

Pointer-down picking may also overlap an in-flight hover pick because both use the same picker and staging buffers.

## Expected behavior

Gizmo pointer movement should not produce rejected promises or WebGPU validation errors. Only one pick should use a picker's staging buffers at a time.

## Suggested fix

Serialize picks per `GpuPicker`, or coalesce hover requests so that only the newest pointer coordinates are picked after the current request completes. Pointer-down picking should either await or supersede the active hover request.

For example, the dispatcher could track an in-flight hover promise and one queued coordinate, rather than starting a pick for every `pointermove`.

## Related API request

Please consider a public display-only/non-interactive option for gizmos. Setting `drag.enabled = false` does not prevent hover picking because the dispatcher performs `pickAsync()` before it checks whether the matched drag is enabled.

The current application workaround calls each native axis gizmo's private `_disposePointer()` function while retaining its meshes and follow-target callback. This works, but depends on private implementation details.
