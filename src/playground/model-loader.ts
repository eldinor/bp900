import { ImportMeshAsync } from "@babylonjs/core/Loading/sceneLoader";
import type { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh";
import type { Scene } from "@babylonjs/core/scene";
import { templateConfig } from "../config/template-config";

export const loadDemoModel = async (scene: Scene, modelUrl: string): Promise<AbstractMesh | null> => {
  const { GLTFLoaderAnimationStartMode } = await import("@babylonjs/loaders/glTF");

  const result = await ImportMeshAsync(modelUrl, scene, {
    meshNames: "",
    pluginOptions: {
      gltf: {
        animationStartMode: GLTFLoaderAnimationStartMode.NONE,
      },
    },
  });
  const rootMesh = result.meshes[0];

  if (!rootMesh) {
    return null;
  }

  if (import.meta.env.DEV) {
    console.log(
      "GLB animation groups:",
      result.animationGroups.map((animationGroup, index) => ({
        index,
        name: animationGroup.name,
      })),
    );
  }

  if (templateConfig.demoModel.animation.enabled) {
    const animationGroup = result.animationGroups[templateConfig.demoModel.animation.groupIndex];
    if (animationGroup) {
      animationGroup.start(true);
    }
  }

  return rootMesh;
};
