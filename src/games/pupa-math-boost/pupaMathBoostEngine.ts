import type { PupaMathState, MetamorphStage, MathProblem } from './types';
import { clamp } from '@/src/utils/scoring';

export const PUPA_BEST_TIME_KEY = 'pupa_math_best_time';

export function createMathState(): PupaMathState {
  return {
    progress: 0,
    multiplier: 1,
    stage: 'larva',
    currentIndex: 0,
    correct: 0,
    wrong: 0,
    elapsedSec: 0,
    finished: false,
  };
}

function stageFromProgress(progress: number): MetamorphStage {
  if (progress >= 100) return 'butterfly';
  if (progress >= 45) return 'pupa';
  return 'larva';
}

export function submitAnswer(
  state: PupaMathState,
  userAnswer: string,
  problem: MathProblem,
  poolSize: number
): PupaMathState {
  if (state.finished) return state;
  const normalized = userAnswer.trim().toLowerCase();
  const expected = String(problem.answer).trim().toLowerCase();
  const correct = normalized === expected || parseFloat(normalized) === Number(problem.answer);

  let progress = state.progress;
  let multiplier = state.multiplier;
  let correctCount = state.correct;
  let wrongCount = state.wrong;

  if (correct) {
    correctCount += 1;
    multiplier = clamp(multiplier + 0.15, 0.5, 2.5);
    progress = clamp(progress + 12 * multiplier, 0, 100);
  } else {
    wrongCount += 1;
    multiplier = clamp(multiplier - 0.2, 0.4, 2.5);
    progress = clamp(progress - 4, 0, 100);
  }

  const nextIndex = state.currentIndex + 1;
  const finished = progress >= 100 || nextIndex >= poolSize * 3;

  return {
    progress: finished ? 100 : progress,
    multiplier,
    stage: stageFromProgress(finished ? 100 : progress),
    currentIndex: nextIndex,
    correct: correctCount,
    wrong: wrongCount,
    elapsedSec: state.elapsedSec,
    finished,
  };
}

export function tickElapsed(state: PupaMathState, sec: number): PupaMathState {
  if (state.finished) return state;
  return { ...state, elapsedSec: state.elapsedSec + sec };
}
