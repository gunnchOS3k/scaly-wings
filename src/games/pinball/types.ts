export type PinballPhase = 'start' | 'playing' | 'paused' | 'gameover';

export interface Vec2 {
  x: number;
  y: number;
}

export interface PinballBall {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

export interface PinballFlipper {
  side: 'left' | 'right';
  x: number;
  y: number;
  angle: number;
  active: boolean;
}

export interface PinballBumper {
  id: string;
  x: number;
  y: number;
  radius: number;
  multiplier: number;
}

export interface PinballState {
  phase: PinballPhase;
  ball: PinballBall;
  flippers: PinballFlipper[];
  bumpers: PinballBumper[];
  score: number;
  lives: number;
  plungerPower: number;
  tableW: number;
  tableH: number;
  highScore: number;
}
