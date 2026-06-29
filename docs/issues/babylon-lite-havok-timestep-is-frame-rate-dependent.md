# `createHavokWorld` physics speed depends on the display refresh rate

### Packages

- `@babylonjs/lite@1.6.0`
- `@babylonjs/havok@1.3.13`
- WebGPU renderer

## Description

`createHavokWorld()` advances Havok by a fixed `1 / 60` seconds exactly once per rendered frame. Consequently, physics simulation speed depends on the browser's `requestAnimationFrame` frequency instead of elapsed real time.

On a 120 Hz display the simulation runs approximately twice as fast as expected. On a 144 Hz display it runs approximately 2.4 times as fast. At 30 FPS it runs at approximately half speed.

This is especially visible with falling objects: the same sphere appears substantially “heavier” on a high-refresh display because it falls and completes each bounce too quickly.

## Minimal reproduction

```ts
import HavokPhysics from "@babylonjs/havok";
import {
  addToScene,
  createDefaultCamera,
  createEngine,
  createGround,
  createHavokWorld,
  createPhysicsAggregate,
  createSceneContext,
  createSphere,
  createStandardMaterial,
  PhysicsShapeType,
  registerScene,
  startEngine,
} from "@babylonjs/lite";

const canvas = document.querySelector("canvas")!;
const engine = await createEngine(canvas);
const scene = createSceneContext(engine);

const ground = createGround(engine, { width: 10, height: 10 });
ground.material = createStandardMaterial();
addToScene(scene, ground);

const sphere = createSphere(engine, { diameter: 2, segments: 32 });
sphere.material = createStandardMaterial();
sphere.position.set(0, 4, 0);
addToScene(scene, sphere);

const hknp = await HavokPhysics();
const world = createHavokWorld(scene, hknp, { x: 0, y: -9.81, z: 0 });

createPhysicsAggregate(world, ground, PhysicsShapeType.BOX, {
  mass: 0,
  startAsleep: true,
  extents: { x: 10, y: 0.1, z: 10 },
  center: { x: 0, y: -0.05, z: 0 },
});

createPhysicsAggregate(world, sphere, PhysicsShapeType.SPHERE, {
  mass: 1,
  radius: 1,
  restitution: 0.75,
});

createDefaultCamera(scene);
await registerScene(scene);
await startEngine(engine);
```

Run the same page on 60 Hz and 120/144 Hz displays, or constrain the browser to different frame rates. The sphere's real-time fall and bounce periods change with the render frequency.

## Actual behavior

The current stepping path calculates a clamped frame delta but uses it only to decide whether a step should run:

```ts
const dt = Math.min(deltaMs / 1e3, 0.1);
if (dt <= 0) return;

hknp.HP_World_Step(hkWorld, world._timestep);
```

`world._timestep` defaults to `1 / 60`, so the calculated `dt` does not control the amount of simulated time.

## Expected behavior

Physics should advance according to elapsed time and produce approximately the same real-time motion at different render rates.

This would also match Babylon.js Havok V2 when constructed as:

```ts
new HavokPlugin(true, hknp);
```

The `true` argument enables delta-driven world steps.

## Current workaround

Register a callback before `createHavokWorld()` so it updates the public timestep before Lite's own step callback:

```ts
import {
  createHavokWorld,
  onBeforeRender,
  setPhysicsTimestep,
  type PhysicsWorld,
  type SceneContext,
} from "@babylonjs/lite";

let world: PhysicsWorld | null = null;

onBeforeRender(scene, (deltaMs) => {
  if (!world) return;

  const deltaSeconds = deltaMs / 1000;
  setPhysicsTimestep(world, deltaSeconds > 0 ? Math.min(deltaSeconds, 0.1) : 1 / 60);
});

world = createHavokWorld(scene, hknp, { x: 0, y: -9.81, z: 0 });
```

The callback registration order is important: it must run before the callback installed by `createHavokWorld()`.

## Suggested fix

Possible approaches:

1. Step with the already calculated, clamped `dt`:

   ```ts
   hknp.HP_World_Step(hkWorld, dt);
   ```

2. Add an explicit `useDeltaForWorldStep` option to `createHavokWorld()`, matching Babylon.js `HavokPlugin` behavior.

3. Use a fixed-timestep accumulator, potentially with a configurable maximum number of substeps, so the simulation remains deterministic without tying its speed to render FPS.

If fixed stepping remains the default, an accumulator is preferable to one unconditional fixed step per render frame.
