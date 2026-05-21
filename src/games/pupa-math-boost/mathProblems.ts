import type { MathProblem } from './types';

export const mathProblems: MathProblem[] = [
  { id: 'e1', prompt: '7 + 5 = ?', answer: 12, difficulty: 'easy', category: 'arithmetic' },
  { id: 'e2', prompt: '3 × 4 = ?', answer: 12, difficulty: 'easy', category: 'arithmetic' },
  { id: 'e3', prompt: '20 − 8 = ?', answer: 12, difficulty: 'easy', category: 'arithmetic' },
  {
    id: 'e4',
    prompt: 'Next in sequence: 2, 4, 8, 16, ?',
    answer: 32,
    hint: 'Each term doubles',
    difficulty: 'easy',
    category: 'pattern',
  },
  {
    id: 'm1',
    prompt: 'If x + 3 = 10, x = ?',
    answer: 7,
    difficulty: 'medium',
    category: 'algebra',
  },
  {
    id: 'm2',
    prompt: '2x = 14, x = ?',
    answer: 7,
    difficulty: 'medium',
    category: 'algebra',
  },
  {
    id: 'm3',
    prompt: 'A fair coin is flipped once. P(heads)? (decimal)',
    answer: 0.5,
    hint: 'One favorable of two outcomes',
    difficulty: 'medium',
    category: 'probability',
  },
  {
    id: 'h1',
    prompt: '(x − 2)² = 0 → x = ?',
    answer: 2,
    difficulty: 'hard',
    category: 'algebra',
  },
  {
    id: 'h2',
    prompt: 'Fibonacci: 1, 1, 2, 3, 5, ?',
    answer: 8,
    difficulty: 'hard',
    category: 'pattern',
  },
  {
    id: 'h3',
    prompt: 'Roll a die. P(even number)? (fraction as decimal, 2 decimals)',
    answer: 0.5,
    difficulty: 'hard',
    category: 'probability',
  },
];

export function problemsByDifficulty(d: 'easy' | 'medium' | 'hard'): MathProblem[] {
  return mathProblems.filter((p) => p.difficulty === d);
}
