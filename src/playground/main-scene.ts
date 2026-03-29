import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { DefaultRenderingPipeline } from "@babylonjs/core/PostProcesses/RenderPipeline/Pipelines/defaultRenderingPipeline";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import type { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh";
import { Scene } from "@babylonjs/core/scene";
import { Tools } from "@babylonjs/core/Misc/tools";
import { Quaternion, Vector3 } from "@babylonjs/core/Maths/math.vector";
import "@babylonjs/core/Helpers/sceneHelpers";
import { templateConfig } from "../config/template-config";
import { sceneAssets } from "./assets";
import { getSceneRuntimeState } from "./scene-runtime";

export default class MainScene {
  private camera: ArcRotateCamera;

  constructor(
    private scene: Scene,
    private canvas: HTMLCanvasElement,
  ) {
    this._setCamera(scene);
    this._setLight(scene);
    this._setEnvironment(scene);
    if (templateConfig.features.pipeline) {
      this._setPipeLine();
    }
    void this.loadComponents();
  }

  _setCamera(scene: Scene): void {
    this.camera = new ArcRotateCamera("camera", Tools.ToRadians(90), Tools.ToRadians(80), 20, Vector3.Zero(), scene);
    this.camera.attachControl(this.canvas, true);
    this.camera.setTarget(Vector3.Zero());
  }

  _setLight(scene: Scene): void {
    const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
    light.intensity = 0.5;
  }

  _setEnvironment(scene: Scene) {
    scene.createDefaultEnvironment({ createGround: false, createSkybox: false });
  }

  _setPipeLine(): void {
    const pipeline = new DefaultRenderingPipeline("default-pipeline", false, this.scene, [this.scene.activeCamera!]);
    pipeline.fxaaEnabled = templateConfig.rendering.pipeline.fxaaEnabled;
    pipeline.samples = templateConfig.rendering.pipeline.samples;
  }

  async loadComponents(): Promise<void> {
    const [{ Ground }, guiModule, modelModule] = await Promise.all([
      import("./ground"),
      templateConfig.features.gui ? import("./gui") : Promise.resolve(null),
      templateConfig.features.demoModel ? import("./model-loader") : Promise.resolve(null),
    ]);

    this.scene.metadata = {
      ...(this.scene.metadata ?? {}),
      assets: sceneAssets,
    };

    new Ground(this.scene);

    if (guiModule) {
      await guiModule.setUI(this.scene);
    }

    if (modelModule) {
      const rootMesh = await modelModule.loadDemoModel(this.scene, sceneAssets.model.xbot);
      if (rootMesh) {
        rootMesh.position = new Vector3(0, 0, 4);
        rootMesh.rotationQuaternion = null; // then you may use usual rotation
        rootMesh.scaling = new Vector3(1.25, 1.25, 1.25);
        getSceneRuntimeState(this.scene).demoModelRootMesh = rootMesh;
      }
    }
  }
}
