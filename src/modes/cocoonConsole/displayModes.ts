import type { DisplayMode } from './types';

export const DISPLAY_MODES: {
  id: DisplayMode;
  title: string;
  description: string;
}[] = [
  {
    id: 'handheld',
    title: 'Handheld Mode',
    description: 'Phone portrait — touch-first, one player.',
  },
  {
    id: 'tabletop',
    title: 'Tabletop Mode',
    description: 'Share one device — split touch or multiple controllers.',
  },
  {
    id: 'bigScreen',
    title: 'Big Screen Mode',
    description:
      'Landscape + mirror/cast/HDMI when your OS supports it. Scaly Wings does not force HDMI output.',
  },
];

export const BIG_SCREEN_STEPS = [
  'Rotate phone to landscape (optional but recommended).',
  'Pair PS5/Xbox controller via Bluetooth or USB-C where supported.',
  'Use Android DisplayPort/USB-C or iPhone external display/mirroring if hardware allows.',
  'Open a game — controller or touch backup on phone.',
];
