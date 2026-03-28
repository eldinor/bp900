const assetBaseUrl = import.meta.env.BASE_URL;

export const sceneAssets = {
  texture: {
    amiga: `${assetBaseUrl}texture/amiga.jpg`,
  },
  model: {
    xbot: `${assetBaseUrl}model/Xbot.glb`,
  },
} as const;

export const getAssetUrl = (assetPath: string): string => `${assetBaseUrl}${assetPath}`;
