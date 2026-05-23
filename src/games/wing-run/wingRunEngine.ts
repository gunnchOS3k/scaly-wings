import { PETAL_PATH_1_1 } from './levelData';
import { followCamera } from './camera';
import { resolvePlatformCollision, hitsHazard, collectItems } from './collision';
import type { WingRunState } from './types';

const GRAVITY = 0.55;
const MOVE_SPEED = 4;
const JUMP = -11;
const GLIDE_GRAVITY = 0.2;
const DASH = 12;

export function createWingRunState(viewW: number): WingRunState {
  const level = PETAL_PATH_1_1;
  return {
    phase: 'start',
    player: {
      x: 80,
      y: 350,
      vx: 0,
      vy: 0,
      width: 28,
      height: 24,
      onGround: false,
      glideActive: false,
      shield: false,
      dashCooldown: 0,
    },
    platforms: [...level.platforms],
    collectibles: [...level.collectibles],
    hazards: [...level.hazards],
    mathGate: { ...level.mathGate },
    goalX: level.goalX,
    cameraX: 0,
    levelW: level.levelW,
    score: 0,
    pollen: 0,
    timeSec: 0,
    gateAnswer: '',
  };
}

export function startLevel(state: WingRunState): WingRunState {
  return { ...state, phase: 'playing', timeSec: 0 };
}

export function applyInput(
  state: WingRunState,
  input: {
    moveLeft?: boolean;
    moveRight?: boolean;
    jump?: boolean;
    glide?: boolean;
    dash?: boolean;
    pause?: boolean;
  }
): WingRunState {
  if (input.pause && state.phase === 'playing') return { ...state, phase: 'paused' };
  if (input.pause && state.phase === 'paused') return { ...state, phase: 'playing' };
  if (state.phase !== 'playing') return state;

  let p = { ...state.player };
  if (input.moveLeft) p.vx = -MOVE_SPEED;
  else if (input.moveRight) p.vx = MOVE_SPEED;
  else p.vx *= 0.8;

  if (input.jump && p.onGround) {
    p.vy = JUMP;
    p.onGround = false;
  }
  p.glideActive = !!input.glide && !p.onGround;
  if (input.dash && p.dashCooldown <= 0) {
    p.vx += p.vx >= 0 ? DASH : -DASH;
    p.dashCooldown = 30;
  }
  if (p.dashCooldown > 0) p.dashCooldown -= 1;

  return { ...state, player: p };
}

export function tick(state: WingRunState, viewW: number): WingRunState {
  if (state.phase !== 'playing') return state;

  let p = { ...state.player };
  p.vy += p.glideActive ? GLIDE_GRAVITY : GRAVITY;
  p.x += p.vx;
  p.y += p.vy;

  const resolved = resolvePlatformCollision(p, state.platforms);
  p = resolved.player;

  if (p.y > 520) {
    return { ...state, phase: 'gameover' };
  }

  const { items, gained } = collectItems(p, state.collectibles);
  let score = state.score + gained;
  let pollen = state.pollen + gained;

  const hazard = hitsHazard(p, state.hazards);
  if (hazard && !p.shield) {
    return { ...state, phase: 'gameover' };
  }
  if (hazard && p.shield) {
    p.shield = false;
  }

  if (p.x >= state.goalX) {
    return {
      ...state,
      player: p,
      collectibles: items,
      score,
      pollen,
      phase: 'complete',
      cameraX: followCamera(p.x, viewW, state.levelW),
      timeSec: state.timeSec + 1 / 60,
    };
  }

  return {
    ...state,
    player: p,
    collectibles: items,
    score,
    pollen,
    cameraX: followCamera(p.x, viewW, state.levelW),
    timeSec: state.timeSec + 1 / 60,
  };
}

export function submitGateAnswer(state: WingRunState, answer: string): WingRunState {
  if (!state.mathGate) return state;
  const correct = parseFloat(answer) === state.mathGate.answer;
  return {
    ...state,
    mathGate: {
      ...state.mathGate,
      solved: true,
      shortcutOpen: correct,
    },
    score: state.score + (correct ? 100 : 0),
  };
}
