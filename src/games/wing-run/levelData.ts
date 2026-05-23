import type { Platform, Collectible, Hazard, MathGate } from './types';

export const PETAL_PATH_1_1 = {
  id: 'petal-path-1-1',
  name: 'Petal Path 1-1',
  levelW: 2400,
  goalX: 2200,
  platforms: [
    { id: 'p0', x: 0, y: 400, w: 400, h: 40, type: 'leaf' as const },
    { id: 'p1', x: 350, y: 340, w: 180, h: 24, type: 'branch' as const },
    { id: 'p2', x: 580, y: 280, w: 160, h: 24, type: 'petal' as const },
    { id: 'p3', x: 820, y: 360, w: 200, h: 28, type: 'leaf' as const },
    { id: 'p4', x: 1100, y: 300, w: 180, h: 24, type: 'branch' as const },
    { id: 'p5', x: 1400, y: 250, w: 220, h: 28, type: 'petal' as const },
    { id: 'p6', x: 1700, y: 320, w: 200, h: 28, type: 'leaf' as const },
    { id: 'p7', x: 2000, y: 280, w: 300, h: 40, type: 'leaf' as const },
  ] as Platform[],
  collectibles: [
    { id: 'c1', x: 400, y: 300, kind: 'pollen' as const, collected: false },
    { id: 'c2', x: 650, y: 240, kind: 'pollen' as const, collected: false },
    { id: 'c3', x: 950, y: 310, kind: 'nectar' as const, collected: false },
    { id: 'c4', x: 1250, y: 250, kind: 'sparkle' as const, collected: false },
    { id: 'c5', x: 1850, y: 230, kind: 'pollen' as const, collected: false },
  ] as Collectible[],
  hazards: [
    { id: 'h1', x: 750, y: 200, w: 80, h: 100, kind: 'web' as const },
    { id: 'h2', x: 1550, y: 180, w: 60, h: 80, kind: 'frog' as const },
  ] as Hazard[],
  mathGate: {
    id: 'gate1',
    x: 1650,
    y: 200,
    prompt: 'P(even die roll) = ? (decimal)',
    answer: 0.5,
    solved: false,
    shortcutOpen: false,
  } as MathGate,
};
