export type Difficulty = 'easy' | 'medium' | 'hard';
export type MetamorphStage = 'larva' | 'pupa' | 'butterfly';

export interface MathProblem {
  id: string;
  prompt: string;
  answer: number | string;
  choices?: (number | string)[];
  hint?: string;
  difficulty: Difficulty;
  category: 'arithmetic' | 'algebra' | 'pattern' | 'probability';
}

export interface PupaMathState {
  progress: number;
  multiplier: number;
  stage: MetamorphStage;
  currentIndex: number;
  correct: number;
  wrong: number;
  elapsedSec: number;
  finished: boolean;
}
