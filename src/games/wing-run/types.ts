export type WingRunPhase = 'start' | 'playing' | 'paused' | 'checkpoint' | 'complete' | 'gameover';

export interface ButterflyPlayer {
  x: number;
  y: number;
  vx: number;
  vy: number;
  width: number;
  height: number;
  onGround: boolean;
  glideActive: boolean;
  shield: boolean;
  dashCooldown: number;
}

export interface Platform {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  type: 'leaf' | 'branch' | 'petal';
}

export interface Collectible {
  id: string;
  x: number;
  y: number;
  kind: 'pollen' | 'nectar' | 'sparkle';
  collected: boolean;
}

export interface Hazard {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  kind: 'web' | 'frog' | 'wind' | 'thorn';
}

export interface MathGate {
  id: string;
  x: number;
  y: number;
  prompt: string;
  answer: number;
  solved: boolean;
  shortcutOpen: boolean;
}

export interface WingRunState {
  phase: WingRunPhase;
  player: ButterflyPlayer;
  platforms: Platform[];
  collectibles: Collectible[];
  hazards: Hazard[];
  mathGate: MathGate | null;
  goalX: number;
  cameraX: number;
  levelW: number;
  score: number;
  pollen: number;
  timeSec: number;
  gateAnswer: string;
}
