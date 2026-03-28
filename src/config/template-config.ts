export const templateConfig = {
  features: {
    physics: true,
    demoModel: true,
    axesViewer: import.meta.env.DEV,
    pipeline: true,
    gui: true,
  },
  demoModel: {
    animation: {
      enabled: true,
      groupIndex: 1, // 'agree'
    },
  },
  rendering: {
    webgpuFirst: true,
    engine: {
      adaptToDeviceRatio: true,
      antialias: true,
      powerPreference: "high-performance" as const,
      preserveDrawingBuffer: true,
      stencil: true,
      disableWebGL2Support: false,
    },
    pipeline: {
      samples: 4,
      fxaaEnabled: true,
    },
  },
  debug: {
    showFps: true,
    inspectorInDevOnly: true,
  },
} as const;
