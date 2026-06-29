import "./style.css";
import {
  ArcRotateCamera,
  GizmoManager,
  HemisphericLight,
  ImportMeshAsync,
  MeshBuilder,
  Scene,
  Vector3,
  WebGPUEngine,
} from "@babylonjs/lite-compat";
import {
  createHavokWorld,
  createPhysicsAggregate,
  disposePhysics,
  onBeforeRender,
  releasePhysicsShape,
  removePhysicsBody,
  setPhysicsTimestep,
  type Mesh as LiteMesh,
  type PhysicsWorld,
  type PhysicsShapeType,
  type SceneContext,
} from "@babylonjs/lite";

const canvas = document.createElement("canvas");
canvas.id = "renderCanvas";
document.body.appendChild(canvas);

const fps = document.createElement("div");
fps.id = "display-fps";
fps.textContent = "0";
document.body.appendChild(fps);

const modelUrl = new URL(`${import.meta.env.BASE_URL}model/Xbot.glb`, window.location.href).href;
const sceneOrigin = new Vector3(0, 0, -4);

type PrivateAxisGizmo = {
  drag: { enabled: boolean };
  _disposePointer: () => void;
};

type PrivatePositionGizmo = {
  xGizmo: PrivateAxisGizmo;
  yGizmo: PrivateAxisGizmo;
  zGizmo: PrivateAxisGizmo;
};

type PrivateCompatPositionGizmo = {
  _lite: PrivatePositionGizmo;
};

type PrivateLiteScene = {
  _lite: SceneContext;
};

type PrivateLiteMesh = {
  _lite: LiteMesh;
};

// Lite publishes PhysicsShapeType as an ambient const enum, which cannot be
// accessed as a runtime value when TypeScript isolatedModules is enabled.
const nativeShapeType = {
  sphere: 0 as PhysicsShapeType,
  box: 3 as PhysicsShapeType,
};

const createDisplayOnlyGizmo = (scene: Scene) => {
  const target = MeshBuilder.CreateBox("axesTarget", { size: 0.01 }, scene);
  target.position = sceneOrigin.clone();
  target.isVisible = false;

  const manager = new GizmoManager(scene);
  manager.positionGizmoEnabled = true;
  manager.attachToMesh(target);

  // Temporary workaround for @babylonjs/lite 1.6: the public API has no
  // display-only mode. Unregister each axis from the pointer dispatcher while
  // leaving its utility-layer meshes and follow-target callback intact.
  const compatGizmo = manager.gizmos.positionGizmo as unknown as PrivateCompatPositionGizmo;
  for (const axis of [compatGizmo._lite.xGizmo, compatGizmo._lite.yGizmo, compatGizmo._lite.zGizmo]) {
    axis._disposePointer();
    axis._disposePointer = () => undefined;
    axis.drag.enabled = false;
  }

  return { manager, target };
};

const createNativePhysics = async (
  scene: Scene,
  ground: PrivateLiteMesh,
  sphere: PrivateLiteMesh,
): Promise<() => void> => {
  const { default: HavokPhysics } = await import("@babylonjs/havok");
  const hknp = await HavokPhysics();
  const nativeScene = (scene as unknown as PrivateLiteScene)._lite;
  let world: PhysicsWorld | null = null;

  // The original uses `new HavokPlugin(true, hk)`, where `true` means that
  // Havok steps with the current frame delta. Lite defaults to one fixed 1/60
  // step per rendered frame, which runs too quickly on high-refresh displays.
  // Register this callback first so it updates the timestep before Lite's
  // createHavokWorld callback performs the step.
  onBeforeRender(nativeScene, (deltaMs) => {
    if (!world) return;

    const deltaSeconds = deltaMs / 1000;
    setPhysicsTimestep(world, deltaSeconds > 0 ? Math.min(deltaSeconds, 0.1) : 1 / 60);
  });

  world = createHavokWorld(nativeScene, hknp, { x: 0, y: -9.81, z: 0 });

  const groundAggregate = createPhysicsAggregate(world, ground._lite, nativeShapeType.box, {
    mass: 0,
    startAsleep: true,
    // A rendered ground plane has zero Y thickness. Give its Havok box a thin
    // volume directly below the visible surface while preserving the 10x10 size.
    extents: { x: 10, y: 0.1, z: 10 },
    center: { x: 0, y: -0.05, z: 0 },
  });

  const sphereAggregate = createPhysicsAggregate(world, sphere._lite, nativeShapeType.sphere, {
    mass: 1,
    radius: 1,
    restitution: 0.75,
  });

  return () => {
    if (!world) return;

    removePhysicsBody(world, sphereAggregate.body);
    releasePhysicsShape(world, sphereAggregate.shape);
    removePhysicsBody(world, groundAggregate.body);
    releasePhysicsShape(world, groundAggregate.shape);
    disposePhysics(world);
    world = null;
  };
};

const bootstrap = async (): Promise<void> => {
  if (!("gpu" in navigator)) {
    throw new Error("This template requires a browser with WebGPU support.");
  }

  const engine = new WebGPUEngine(canvas, {
    antialias: true,
    adaptToDeviceRatio: true,
  });
  await engine.initAsync();

  const scene = new Scene(engine);
  const camera = new ArcRotateCamera("camera", Math.PI / 2, (80 * Math.PI) / 180, 20, sceneOrigin, scene);
  camera.attachControl(canvas, true);
  scene.activeCamera = camera;

  const light = new HemisphericLight("light", Vector3.Up(), scene);
  light.intensity = 0.5;

  scene.createDefaultEnvironment({ createGround: false, createSkybox: false });

  const ground = MeshBuilder.CreateGround("ground", { width: 10, height: 10 }, scene);
  ground.position = sceneOrigin.clone();

  const sphere = MeshBuilder.CreateSphere("sphere", { diameter: 2, segments: 32 }, scene);
  sphere.position = new Vector3(0, 4, sceneOrigin.z);

  const disposeNativePhysics = await createNativePhysics(
    scene,
    ground as unknown as PrivateLiteMesh,
    sphere as unknown as PrivateLiteMesh,
  );

  const axesGizmo = import.meta.env.DEV ? createDisplayOnlyGizmo(scene) : null;

  await ImportMeshAsync(modelUrl, scene);

  const animation = scene.animationGroups[1] ?? scene.animationGroups[0];
  animation?.start(true);

  engine.runRenderLoop(() => {
    scene.render();
    fps.textContent = `${engine.getFps().toFixed(0)} fps`;
  });

  window.addEventListener("resize", () => engine.resize());
  window.addEventListener("beforeunload", () => {
    axesGizmo?.manager.dispose();
    axesGizmo?.target.dispose();
    disposeNativePhysics();
    scene.dispose();
    engine.dispose();
  });
};

void bootstrap().catch((error: unknown) => {
  console.error(error);
  fps.textContent = "error";
  fps.title = error instanceof Error ? error.message : "The Lite Compat scene failed to start.";
});
