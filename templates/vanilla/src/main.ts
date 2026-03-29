import "./style.css";
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import "@babylonjs/core/Cameras/arcRotateCameraInputsManager";
import { Color4 } from "@babylonjs/core/Maths/math.color";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { Engine } from "@babylonjs/core/Engines/engine";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import "@babylonjs/core/Meshes/Builders/boxBuilder";
import "@babylonjs/core/Meshes/Builders/groundBuilder";
import { Scene } from "@babylonjs/core/scene";

declare const __VANILLA_VERSION__: string;

console.info(`Vanilla version ${__VANILLA_VERSION__}`);

const canvas = document.querySelector<HTMLCanvasElement>("#renderCanvas");

if (!canvas) {
  throw new Error("Render canvas was not found.");
}

const engine = new Engine(canvas, true);

const createScene = () => {
  const scene = new Scene(engine);
  scene.clearColor = new Color4(0.08, 0.1, 0.18, 1);

  const camera = new ArcRotateCamera("camera", Math.PI / 2, Math.PI / 2.6, 6, Vector3.Zero(), scene);
  scene.activeCamera = camera;
  camera.attachControl(canvas, true);

  const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
  light.intensity = 1.2;

  const box = MeshBuilder.CreateBox("box", { size: 1.5 }, scene);
  box.position.y = 0.75;

  const boxMaterial = new StandardMaterial("boxMaterial", scene);
  boxMaterial.diffuseColor.set(0.27, 0.68, 0.98);
  box.material = boxMaterial;

  const ground = MeshBuilder.CreateGround("ground", { width: 8, height: 8 }, scene);
  const groundMaterial = new StandardMaterial("groundMaterial", scene);
  groundMaterial.diffuseColor.set(0.22, 0.24, 0.3);
  ground.material = groundMaterial;

  return scene;
};

const scene = createScene();

engine.runRenderLoop(() => {
  scene.render();
});

window.addEventListener("resize", () => {
  engine.resize();
});
