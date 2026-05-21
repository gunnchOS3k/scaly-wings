export type RacePhase = 'ready' | 'racing' | 'finished';

export interface Larva {
  id: 1 | 2;
  row: number;
  col: number;
  color: string;
  eaten: number;
}

export interface LarvaRaceState {
  phase: RacePhase;
  gridCols: number;
  gridRows: number;
  eaten: boolean[][];
  larva1: Larva;
  larva2: Larva;
  timeLeft: number;
  winner: 1 | 2 | null;
}
