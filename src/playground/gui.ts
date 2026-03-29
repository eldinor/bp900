import { AdvancedDynamicTexture, Button, StackPanel, TextBlock } from "@babylonjs/gui/2D";
import type { Scene } from "@babylonjs/core/scene";
import { getSceneRuntimeState } from "./scene-runtime";

const uiConfig = {
  panel: {
    width: 0.15,
    height: 50,
    topInPixels: 20,
  },
  button: {
    width: 0.9,
    height: "40px",
    textColor: "white",
    primaryBackground: "MidnightBlue",
    secondaryBackground: "Maroon",
    tertiaryBackground: "DarkOliveGreen",
    clickLabel: "Click Me",
    disposeAxesLabel: "Dispose axes",
    disposeXbotLabel: "Dispose xBot",
    disposeLabel: "Dispose GUI",
  },
} as const;

export const setUI = async (scene: Scene): Promise<void> => {
  const runtimeState = getSceneRuntimeState(scene);

  if (scene.getEngine().name === "WebGPU") {
    await import("@babylonjs/core/Engines/WebGPU/Extensions/engine.dynamicTexture");
  }

  const advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("myUI");
  advancedTexture.rootContainer.scaleX = window.devicePixelRatio;
  advancedTexture.rootContainer.scaleY = window.devicePixelRatio;

  const panel = new StackPanel();
  panel.width = uiConfig.panel.width;
  panel.height = uiConfig.panel.height;
  panel.verticalAlignment = 0;
  panel.horizontalAlignment = 0;
  panel.isVertical = true;
  panel.topInPixels = uiConfig.panel.topInPixels;
  advancedTexture.addControl(panel);

  const button = Button.CreateSimpleButton("but", uiConfig.button.clickLabel);
  button.width = uiConfig.button.width;
  button.height = uiConfig.button.height;
  button.color = uiConfig.button.textColor;
  button.background = uiConfig.button.primaryBackground;
  panel.addControl(button);

  let counter = 0;
  button.onPointerUpObservable.add(() => {
    counter++;
    (button.children[0] as TextBlock).text = counter.toString();
  });

  const disposeAxesButton = Button.CreateSimpleButton("disposeAxesButton", uiConfig.button.disposeAxesLabel);
  disposeAxesButton.width = uiConfig.button.width;
  disposeAxesButton.height = uiConfig.button.height;
  disposeAxesButton.color = uiConfig.button.textColor;
  disposeAxesButton.background = uiConfig.button.tertiaryBackground;
  panel.addControl(disposeAxesButton);

  disposeAxesButton.onPointerUpObservable.addOnce(() => {
    runtimeState.axesViewer?.dispose();
    delete runtimeState.axesViewer;
    disposeAxesButton.isEnabled = false;
  });

  const disposeXbotButton = Button.CreateSimpleButton("disposeXbotButton", uiConfig.button.disposeXbotLabel);
  disposeXbotButton.width = uiConfig.button.width;
  disposeXbotButton.height = uiConfig.button.height;
  disposeXbotButton.color = uiConfig.button.textColor;
  disposeXbotButton.background = uiConfig.button.tertiaryBackground;
  panel.addControl(disposeXbotButton);

  disposeXbotButton.onPointerUpObservable.addOnce(() => {
    runtimeState.demoModelRootMesh?.dispose(false, true);
    delete runtimeState.demoModelRootMesh;
    disposeXbotButton.isEnabled = false;
  });

  const disposeButton = Button.CreateSimpleButton("disposeButton", uiConfig.button.disposeLabel);
  disposeButton.width = uiConfig.button.width;
  disposeButton.height = uiConfig.button.height;
  disposeButton.color = uiConfig.button.textColor;
  disposeButton.background = uiConfig.button.secondaryBackground;
  panel.addControl(disposeButton);

  disposeButton.onPointerUpObservable.addOnce(() => {
    advancedTexture.dispose();
  });
};
