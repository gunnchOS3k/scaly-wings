import type { PinballBumper, PinballFlipper } from './types';

export function createFlippers(tableW: number, tableH: number): PinballFlipper[] {
  return [
    { side: 'left', x: tableW * 0.28, y: tableH * 0.78, angle: -0.4, active: false },
    { side: 'right', x: tableW * 0.72, y: tableH * 0.78, angle: 0.4, active: false },
  ];
}

export function createBumpers(tableW: number, tableH: number): PinballBumper[] {
  return [
    { id: 'rose', x: tableW * 0.5, y: tableH * 0.35, radius: 22, multiplier: 50 },
    { id: 'lily', x: tableW * 0.25, y: tableH * 0.45, radius: 18, multiplier: 30 },
    { id: 'vine', x: tableW * 0.75, y: tableH * 0.45, radius: 18, multiplier: 30 },
    { id: 'pollen', x: tableW * 0.5, y: tableH * 0.55, radius: 14, multiplier: 20 },
  ];
}
