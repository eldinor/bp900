<script lang="ts">
  import { onDestroy, onMount } from "svelte";
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

  let canvas: HTMLCanvasElement | undefined;
  let engine: Engine | undefined;
  let scene: Scene | undefined;

  const createScene = (currentEngine: Engine, currentCanvas: HTMLCanvasElement) => {
    const currentScene = new Scene(currentEngine);
    currentScene.clearColor = new Color4(0.08, 0.1, 0.18, 1);

    const camera = new ArcRotateCamera("camera", Math.PI / 2, Math.PI / 2.6, 6, Vector3.Zero(), currentScene);
    currentScene.activeCamera = camera;
    camera.attachControl(currentCanvas, true);

    const light = new HemisphericLight("light", new Vector3(0, 1, 0), currentScene);
    light.intensity = 1.2;

    const box = MeshBuilder.CreateBox("box", { size: 1.5 }, currentScene);
    box.position.y = 0.75;

    const boxMaterial = new StandardMaterial("boxMaterial", currentScene);
    boxMaterial.diffuseColor.set(0.27, 0.68, 0.98);
    box.material = boxMaterial;

    const ground = MeshBuilder.CreateGround("ground", { width: 8, height: 8 }, currentScene);
    const groundMaterial = new StandardMaterial("groundMaterial", currentScene);
    groundMaterial.diffuseColor.set(0.22, 0.24, 0.3);
    ground.material = groundMaterial;

    return currentScene;
  };

  const handleResize = () => {
    engine?.resize();
  };

  onMount(() => {
    if (!canvas) {
      return;
    }

    engine = new Engine(canvas, true);
    scene = createScene(engine, canvas);

    engine.runRenderLoop(() => {
      scene?.render();
    });

    window.addEventListener("resize", handleResize);
  });

  onDestroy(() => {
    window.removeEventListener("resize", handleResize);
    scene?.dispose();
    engine?.dispose();
  });
</script>

<div id="app-shell">
  <canvas id="renderCanvas" bind:this={canvas}></canvas>
</div>
