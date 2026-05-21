import type { FlutterFlightState, Gate } from './types';
import { clamp } from '@/src/utils/scoring';

const GRAVITY = 0.45;
const FLAP = -8;
const GATE_SPEED = 3;
const GATE_WIDTH = 56;
const GAP_HEIGHT = 140;
const BUTTERFLY_SIZE = 28;

export const FLUTTER_HIGH_SCORE_KEY = 'flutter_flight_high';

export function createInitialState(width: number, height: number): FlutterFlightState {
  return {
    phase: 'start',
    butterfly: { y: height / 2, velocity: 0 },
    gates: [],
    score: 0,
    worldWidth: width,
    worldHeight: height,
  };
}

export function startGame(state: FlutterFlightState): FlutterFlightState {
  return {
    ...createInitialState(state.worldWidth, state.worldHeight),
    phase: 'playing',
    gates: [spawnGate(state.worldWidth, state.worldHeight, 0)],
  };
}

function spawnGate(worldWidth: number, worldHeight: number, id: number): Gate {
  const margin = 80;
  const gapY = margin + Math.random() * (worldHeight - GAP_HEIGHT - margin * 2);
  return { id, x: worldWidth + 40, gapY, gapHeight: GAP_HEIGHT, passed: false };
}

export function flap(state: FlutterFlightState): FlutterFlightState {
  if (state.phase !== 'playing') return state;
  return {
    ...state,
    butterfly: { ...state.butterfly, velocity: FLAP },
  };
}

export function tick(state: FlutterFlightState): FlutterFlightState {
  if (state.phase !== 'playing') return state;

  let { y, velocity } = state.butterfly;
  velocity += GRAVITY;
  y += velocity;

  let gates = state.gates.map((g) => ({ ...g, x: g.x - GATE_SPEED }));
  let score = state.score;

  const last = gates[gates.length - 1];
  if (!last || last.x < state.worldWidth - 220) {
    gates = [...gates, spawnGate(state.worldWidth, state.worldHeight, (last?.id ?? 0) + 1)];
  }
  gates = gates.filter((g) => g.x > -GATE_WIDTH);

  const bx = state.worldWidth * 0.25;
  const by = y;

  for (const g of gates) {
    if (!g.passed && g.x + GATE_WIDTH < bx) {
      g.passed = true;
      score += 1;
    }
    if (collides(bx, by, g, state.worldHeight)) {
      return { ...state, phase: 'gameover', butterfly: { y, velocity }, gates, score };
    }
  }

  if (by < 0 || by > state.worldHeight - BUTTERFLY_SIZE) {
    return { ...state, phase: 'gameover', butterfly: { y, velocity }, gates, score };
  }

  return {
    ...state,
    butterfly: { y: clamp(y, 0, state.worldHeight), velocity },
    gates,
    score,
  };
}

function collides(bx: number, by: number, gate: Gate, worldHeight: number): boolean {
  const inX = bx + BUTTERFLY_SIZE > gate.x && bx < gate.x + GATE_WIDTH;
  if (!inX) return false;
  const topHit = by < gate.gapY;
  const bottomHit = by + BUTTERFLY_SIZE > gate.gapY + gate.gapHeight;
  return topHit || bottomHit;
}

export { BUTTERFLY_SIZE, GATE_WIDTH, GAP_HEIGHT };
