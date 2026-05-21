export type GamePhase = 'start' | 'playing' | 'gameover';

export interface Gate {
  id: number;
  x: number;
  gapY: number;
  gapHeight: number;
  passed: boolean;
}

export interface ButterflyState {
  y: number;
  velocity: number;
}

export interface FlutterFlightState {
  phase: GamePhase;
  butterfly: ButterflyState;
  gates: Gate[];
  score: number;
  worldWidth: number;
  worldHeight: number;
}
