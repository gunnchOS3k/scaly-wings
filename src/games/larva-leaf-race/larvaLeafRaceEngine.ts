import type { LarvaRaceState } from './types';
import { percentEaten } from '@/src/utils/scoring';

export const RACE_DURATION_SEC = 45;
export const LARVA_RACE_BEST_KEY = 'larva_race_best_pct';

export function createRaceState(cols = 12, rows = 10): LarvaRaceState {
  return {
    phase: 'ready',
    gridCols: cols,
    gridRows: rows,
    eaten: Array.from({ length: rows }, () => Array(cols).fill(false)),
    larva1: { id: 1, row: 1, col: 1, color: '#FF1493', eaten: 0 },
    larva2: { id: 2, row: rows - 2, col: cols - 2, color: '#7B2CBF', eaten: 0 },
    timeLeft: RACE_DURATION_SEC,
    winner: null,
  };
}

export function startRace(state: LarvaRaceState): LarvaRaceState {
  return { ...createRaceState(state.gridCols, state.gridRows), phase: 'racing' };
}

function moveLarva(
  state: LarvaRaceState,
  larvaId: 1 | 2,
  dRow: number,
  dCol: number
): LarvaRaceState {
  if (state.phase !== 'racing') return state;
  const key = larvaId === 1 ? 'larva1' : 'larva2';
  const larva = state[key];
  const row = Math.max(0, Math.min(state.gridRows - 1, larva.row + dRow));
  const col = Math.max(0, Math.min(state.gridCols - 1, larva.col + dCol));

  const eaten = state.eaten.map((r) => [...r]);
  let eatenCount = larva.eaten;
  if (!eaten[row][col]) {
    eaten[row][col] = true;
    eatenCount += 1;
  }

  const updated = { ...larva, row, col, eaten: eatenCount };
  return { ...state, [key]: updated, eaten } as LarvaRaceState;
}

export function moveP1(state: LarvaRaceState, key: string): LarvaRaceState {
  const map: Record<string, [number, number]> = {
    up: [-1, 0],
    down: [1, 0],
    left: [0, -1],
    right: [0, 1],
  };
  const d = map[key];
  return d ? moveLarva(state, 1, d[0], d[1]) : state;
}

export function moveP2(state: LarvaRaceState, key: string): LarvaRaceState {
  const map: Record<string, [number, number]> = {
    up: [-1, 0],
    down: [1, 0],
    left: [0, -1],
    right: [0, 1],
  };
  const d = map[key];
  return d ? moveLarva(state, 2, d[0], d[1]) : state;
}

export function tickTimer(state: LarvaRaceState, deltaSec: number): LarvaRaceState {
  if (state.phase !== 'racing') return state;
  const timeLeft = Math.max(0, state.timeLeft - deltaSec);
  if (timeLeft > 0) return { ...state, timeLeft };
  let winner: 1 | 2 | null = null;
  if (state.larva1.eaten > state.larva2.eaten) winner = 1;
  else if (state.larva2.eaten > state.larva1.eaten) winner = 2;
  return { ...state, timeLeft: 0, phase: 'finished', winner };
}

export function totalCells(state: LarvaRaceState): number {
  return state.gridCols * state.gridRows;
}

export function scorePercent(state: LarvaRaceState, larvaId: 1 | 2): number {
  const larva = larvaId === 1 ? state.larva1 : state.larva2;
  return percentEaten(larva.eaten, totalCells(state));
}
