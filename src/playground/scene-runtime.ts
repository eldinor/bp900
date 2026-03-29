import type { AxesViewer } from "@babylonjs/core/Debug/axesViewer";
import type { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh";
import type { Scene } from "@babylonjs/core/scene";

type SceneRuntimeState = {
  axesViewer?: AxesViewer;
  demoModelRootMesh?: AbstractMesh;
};

const runtimeState = new WeakMap<Scene, SceneRuntimeState>();

export const getSceneRuntimeState = (scene: Scene): SceneRuntimeState => {
  let state = runtimeState.get(scene);

  if (!state) {
    state = {};
    runtimeState.set(scene, state);
  }

  return state;
};
