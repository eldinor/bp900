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

  const axesGizmo = import.meta.env.DEV ? createDisplayOnlyGizmo(scene) : null;

  await ImportMeshAsync(modelUrl, scene);

  const animation = scene.animationGroups[1] ?? scene.animationGroups[0];
  animation?.start(true);

  let verticalVelocity = 0;
  scene.registerBeforeRender(() => {
    const deltaSeconds = Math.min(engine.getDeltaTime() / 1000, 0.05);
    verticalVelocity -= 9.81 * deltaSeconds;
    sphere.position.y += verticalVelocity * deltaSeconds;

    if (sphere.position.y <= 1) {
      sphere.position.y = 1;
      verticalVelocity = Math.abs(verticalVelocity) * 0.75;
    }
  });

  engine.runRenderLoop(() => {
    scene.render();
    fps.textContent = `${engine.getFps().toFixed(0)} fps`;
  });

  window.addEventListener("resize", () => engine.resize());
  window.addEventListener("beforeunload", () => {
    axesGizmo?.manager.dispose();
    axesGizmo?.target.dispose();
    scene.dispose();
    engine.dispose();
  });
};

void bootstrap().catch((error: unknown) => {
  console.error(error);
  fps.textContent = "error";
  fps.title = error instanceof Error ? error.message : "The Lite Compat scene failed to start.";
});
