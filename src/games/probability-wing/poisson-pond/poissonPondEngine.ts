import { scheduleArrivals, exponentialInterArrival } from './arrivalProcess';
import type { PoissonPondState, ObstacleArrival } from './types';

const COLS = 5;
const DEFAULT_LANES = 5;

export function createPoissonPondState(): PoissonPondState {
  return {
    lambda: [0.8, 1.2, 1.5, 1.0, 0.6],
    lanes: DEFAULT_LANES,
    butterflyRow: 0,
    butterflyCol: 2,
    obstacles: [],
    arrivals: [],
    time: 0,
    phase: 'ready',
    slowMode: false,
    survivalTime: 0,
    simulationResults: null,
  };
}

export function setLambda(state: PoissonPondState, lane: number, lambda: number): PoissonPondState {
  const arr = [...state.lambda];
  arr[lane] = Math.max(0.1, Math.min(5, lambda));
  return { ...state, lambda: arr };
}

export function startCrossing(state: PoissonPondState): PoissonPondState {
  const arrivals: ObstacleArrival[] = [];
  const obstacles: PoissonPondState['obstacles'] = [];
  let id = 0;
  for (let lane = 0; lane < state.lanes; lane++) {
    const events = scheduleArrivals(lane, state.lambda[lane], 30);
    for (const e of events) {
      arrivals.push({
        lane,
        time: e.time,
        interArrival: e.interArrival,
        col: Math.floor(Math.random() * COLS),
      });
      obstacles.push({ lane, col: Math.floor(Math.random() * COLS), id: id++ });
    }
  }
  return {
    ...createPoissonPondState(),
    lambda: state.lambda,
    lanes: state.lanes,
    phase: 'crossing',
    obstacles: obstacles.slice(0, 8),
    arrivals: arrivals.slice(0, 12),
    slowMode: state.slowMode,
  };
}

export function moveButterfly(
  state: PoissonPondState,
  dRow: number,
  dCol: number
): PoissonPondState {
  if (state.phase !== 'crossing') return state;
  const row = Math.max(0, Math.min(state.lanes - 1, state.butterflyRow + dRow));
  const col = Math.max(0, Math.min(COLS - 1, state.butterflyCol + dCol));
  const hit = state.obstacles.some((o) => o.lane === row && o.col === col);
  if (hit) {
    return { ...state, butterflyRow: row, butterflyCol: col, phase: 'hit', survivalTime: state.time };
  }
  if (row === state.lanes - 1) {
    return { ...state, butterflyRow: row, butterflyCol: col, phase: 'won', survivalTime: state.time };
  }
  const time = state.time + (state.slowMode ? 0.5 : 0.2);
  // spawn new obstacle occasionally
  let obstacles = state.obstacles;
  const lane = Math.floor(Math.random() * state.lanes);
  if (Math.random() < state.lambda[lane] * 0.05) {
    obstacles = [
      ...obstacles,
      { lane, col: Math.floor(Math.random() * COLS), id: Date.now() },
    ].slice(-10);
  }
  return {
    ...state,
    butterflyRow: row,
    butterflyCol: col,
    time,
    obstacles,
    survivalTime: time,
  };
}

export function runSimulations(state: PoissonPondState, n: number): PoissonPondState {
  let success = 0;
  for (let i = 0; i < n; i++) {
    let row = 0;
    let col = 2;
    let t = 0;
    let won = false;
    const obs = scheduleArrivals(0, state.lambda[0], 5).length;
    while (t < 8 && row < state.lanes - 1) {
      row++;
      col = Math.max(0, Math.min(COLS - 1, col + (Math.random() > 0.5 ? 1 : -1)));
      const hit = Math.random() < state.lambda[row] * 0.15;
      if (hit) break;
      t += exponentialInterArrival(1);
      if (row === state.lanes - 1) won = true;
    }
    if (won) success++;
  }
  return {
    ...state,
    phase: 'simulating',
    simulationResults: { success, total: n },
  };
}

export function avgInterArrival(arrivals: ObstacleArrival[]): number {
  if (arrivals.length === 0) return 0;
  return arrivals.reduce((s, a) => s + a.interArrival, 0) / arrivals.length;
}

export { COLS };
