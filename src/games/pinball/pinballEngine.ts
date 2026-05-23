import { createBumpers, createFlippers } from './pinballObjects';
import {
  integrateBall,
  collideBumper,
  collideFlipper,
  isDrained,
} from './pinballPhysics';
import { DEFAULT_TABLE } from './pinballLevels';
import type { PinballPhase, PinballState } from './types';

export function createPinballState(tableW = DEFAULT_TABLE.width, tableH = DEFAULT_TABLE.height): PinballState {
  return {
    phase: 'start',
    ball: { x: tableW * 0.85, y: tableH * 0.75, vx: 0, vy: 0, radius: 10 },
    flippers: createFlippers(tableW, tableH),
    bumpers: createBumpers(tableW, tableH),
    score: 0,
    lives: 3,
    plungerPower: 0,
    tableW,
    tableH,
    highScore: 0,
  };
}

export function startGame(state: PinballState): PinballState {
  return { ...state, phase: 'playing', score: 0, lives: 3 };
}

export function setFlipper(state: PinballState, side: 'left' | 'right', active: boolean): PinballState {
  const flippers = state.flippers.map((f) =>
    f.side === side ? { ...f, active } : f
  );
  return { ...state, flippers };
}

export function chargePlunger(state: PinballState, delta: number): PinballState {
  return { ...state, plungerPower: Math.min(1, state.plungerPower + delta) };
}

export function launchBall(state: PinballState): PinballState {
  if (state.phase !== 'playing' && state.phase !== 'start') return state;
  const power = Math.max(0.3, state.plungerPower);
  return {
    ...state,
    phase: 'playing',
    plungerPower: 0,
    ball: {
      ...state.ball,
      x: state.tableW * DEFAULT_TABLE.launchX,
      y: state.tableH * DEFAULT_TABLE.launchY,
      vx: -4 * power,
      vy: -14 * power,
    },
  };
}

export function tick(state: PinballState): PinballState {
  if (state.phase !== 'playing') return state;

  let ball = integrateBall(state.ball, state.tableW, state.tableH);
  let score = state.score;
  let bumpers = state.bumpers;

  for (const b of bumpers) {
    const before = ball;
    ball = collideBumper(ball, b);
    if (ball.vx !== before.vx || ball.vy !== before.vy) {
      score += b.multiplier;
    }
  }
  for (const f of state.flippers) {
    ball = collideFlipper(ball, f);
  }

  let lives = state.lives;
  let phase: PinballPhase = state.phase;
  if (isDrained(ball, state.tableW, state.tableH)) {
    lives -= 1;
    if (lives <= 0) {
      phase = 'gameover';
    } else {
      ball = {
        x: state.tableW * DEFAULT_TABLE.launchX,
        y: state.tableH * 0.75,
        vx: 0,
        vy: 0,
        radius: state.ball.radius,
      };
    }
  }

  return { ...state, ball, score, lives, phase, bumpers };
}

export function togglePause(state: PinballState): PinballState {
  if (state.phase === 'playing') return { ...state, phase: 'paused' };
  if (state.phase === 'paused') return { ...state, phase: 'playing' };
  return state;
}
