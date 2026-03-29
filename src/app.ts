import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { AxesViewer } from "@babylonjs/core/Debug/axesViewer";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { WebGPUEngine } from "@babylonjs/core/Engines/webgpuEngine";
import { HavokPlugin } from "@babylonjs/core/Physics/v2/Plugins/havokPlugin";

import { templateConfig } from "./config/template-config";
import MainScene from "./playground/main-scene";
import { getSceneRuntimeState } from "./playground/scene-runtime";

class App {
  public engine: Engine | WebGPUEngine;
  public scene: Scene;

  private canvas: HTMLCanvasElement;

  constructor() {
    // create the canvas html element and attach it to the webpage
    this.canvas = document.createElement("canvas");
    this.canvas.style.width = "100%";
    this.canvas.style.height = "100%";
    this.canvas.id = "renderCanvas";
    document.body.appendChild(this.canvas);

    void this.bootstrap();
  }

  async bootstrap(): Promise<void> {
    this.engine = await this._createEngine();
    this.scene = new Scene(this.engine);

    if (templateConfig.features.physics) {
      await this._setPhysics();
    }

    new MainScene(this.scene, this.canvas);

    this._config();
    this._renderer();
  }

  async _createEngine(): Promise<Engine | WebGPUEngine> {
    if (templateConfig.rendering.webgpuFirst && "gpu" in navigator) {
      try {
        const webgpu = new WebGPUEngine(this.canvas, {
          adaptToDeviceRatio: templateConfig.rendering.engine.adaptToDeviceRatio,
          antialias: templateConfig.rendering.engine.antialias,
        });
        await webgpu.initAsync();
        return webgpu;
      } catch (error) {
        console.warn("WebGPU initialization failed, falling back to WebGL2.", error);
      }
    }

    return new Engine(this.canvas, true, {
      powerPreference: templateConfig.rendering.engine.powerPreference,
      preserveDrawingBuffer: templateConfig.rendering.engine.preserveDrawingBuffer,
      stencil: templateConfig.rendering.engine.stencil,
      disableWebGL2Support: templateConfig.rendering.engine.disableWebGL2Support,
      adaptToDeviceRatio: templateConfig.rendering.engine.adaptToDeviceRatio,
    });
  }

  async _setPhysics(): Promise<void> {
    const gravity = new Vector3(0, -9.81, 0);
    const { default: HavokPhysics } = await import("@babylonjs/havok");
    const hk = await HavokPhysics();
    const plugin = new HavokPlugin(true, hk);
    this.scene.enablePhysics(gravity, plugin);
  }

  _fps(): void {
    if (!templateConfig.debug.showFps) {
      return;
    }

    const dom = document.getElementById("display-fps");
    if (dom) {
      dom.innerHTML = `${this.engine.getFps().toFixed()} fps`;
    } else {
      const div = document.createElement("div");
      div.id = "display-fps";
      div.innerHTML = "0";
      document.body.appendChild(div);
    }
  }

  async _bindEvent(): Promise<void> {
    // Imports and hide/show the Inspector
    // Works only in DEV mode to reduce the size of the PRODUCTION build
    // Comment IF statement to work in both modes
    if (templateConfig.debug.inspectorInDevOnly && import.meta.env.DEV) {
      await Promise.all([import("@babylonjs/core/Debug/debugLayer"), import("@babylonjs/inspector")]);

      window.addEventListener("keydown", (ev) => {
        // Shift+Ctrl+Alt+I
        if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.key.toLowerCase() === "i") {
          if (this.scene.debugLayer.isVisible()) {
            this.scene.debugLayer.hide();
          } else {
            this.scene.debugLayer.show();
          }
        }
      });
    } // End of IF statement

    // resize window
    window.addEventListener("resize", () => {
      this.engine.resize();
    });

    window.addEventListener("beforeunload", () => {
      this.scene.dispose();
      this.engine.dispose();
    });
  }

  // Auxiliary Class Configuration
  _config(): void {
    if (templateConfig.features.axesViewer) {
      const axesViewer = new AxesViewer(this.scene, 2);
      getSceneRuntimeState(this.scene).axesViewer = axesViewer;
    }

    // Inspector and other stuff
    void this._bindEvent();
  }

  _renderer(): void {
    this.engine.runRenderLoop(() => {
      this._fps();
      this.scene.render();
    });
  }
}

new App();
