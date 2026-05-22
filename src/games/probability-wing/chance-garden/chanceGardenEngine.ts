import { GARDEN_SYMBOLS, symbolById } from './symbols';
import type { ChanceGardenState, SpinOutcome } from './types';

export const STARTING_POLLEN = 50;
const SPIN_COST = 1;

function weightedPick(): string {
  const r = Math.random();
  let cum = 0;
  for (const s of GARDEN_SYMBOLS) {
    cum += s.probability;
    if (r <= cum) return s.id;
  }
  return GARDEN_SYMBOLS[GARDEN_SYMBOLS.length - 1].id;
}

function patternReward(reels: string[]): { reward: number; pattern: string; prob: number } {
  const counts: Record<string, number> = {};
  for (const id of reels) counts[id] = (counts[id] ?? 0) + 1;
  const max = Math.max(...Object.values(counts));

  if (max === 3) {
    const id = Object.keys(counts).find((k) => counts[k] === 3)!;
    const s = symbolById(id);
    const prob = Math.pow(s.probability, 3);
    return { reward: s.nectarPayout * 3, pattern: 'Triple bloom', prob };
  }
  if (max === 2) {
    const id = Object.keys(counts).find((k) => counts[k] === 2)!;
    const s = symbolById(id);
    const prob =
      3 * Math.pow(s.probability, 2) * (1 - s.probability);
    return { reward: s.nectarPayout, pattern: 'Pair match', prob };
  }
  const prob = GARDEN_SYMBOLS.reduce((p, s) => p * (1 - s.probability), 1);
  return { reward: 0, pattern: 'No match', prob: 1 - enumerateMatchProb() };
}

function enumerateMatchProb(): number {
  let match = 0;
  for (const s of GARDEN_SYMBOLS) {
    match += 3 * Math.pow(s.probability, 2) * (1 - s.probability);
    match += Math.pow(s.probability, 3);
  }
  return match;
}

export function createChanceGardenState(): ChanceGardenState {
  return {
    pollenTokens: STARTING_POLLEN,
    totalSpins: 0,
    totalNectar: 0,
    rewards: [],
    lastOutcome: null,
    batchResults: null,
  };
}

export function spinOnce(state: ChanceGardenState): ChanceGardenState {
  if (state.pollenTokens < SPIN_COST) return state;
  const reels = [weightedPick(), weightedPick(), weightedPick()];
  const { reward, pattern, prob } = patternReward(reels);
  const outcome: SpinOutcome = {
    reels,
    nectarReward: reward,
    pattern,
    theoreticalProbability: prob,
  };
  const rewards = [...state.rewards, reward];
  return {
    ...state,
    pollenTokens: state.pollenTokens - SPIN_COST + reward,
    totalSpins: state.totalSpins + 1,
    totalNectar: state.totalNectar + reward,
    rewards,
    lastOutcome: outcome,
    batchResults: null,
  };
}

export function simulateBatch(n: number): { rewards: number[]; mean: number; variance: number } {
  const rewards: number[] = [];
  for (let i = 0; i < n; i++) {
    const reels = [weightedPick(), weightedPick(), weightedPick()];
    rewards.push(patternReward(reels).reward);
  }
  const mean = rewards.reduce((a, b) => a + b, 0) / n;
  const variance =
    rewards.reduce((a, b) => a + (b - mean) ** 2, 0) / Math.max(1, n - 1);
  return { rewards, mean, variance };
}

export function batchSimulate(state: ChanceGardenState, n: number): ChanceGardenState {
  const batch = simulateBatch(n);
  return { ...state, batchResults: batch.rewards };
}

export function expectedValuePerSpin(): number {
  let ev = 0;
  const ids = GARDEN_SYMBOLS.map((s) => s.id);
  for (const a of ids)
    for (const b of ids)
      for (const c of ids) {
        const { reward, prob } = patternReward([a, b, c]);
        const p =
          symbolById(a).probability *
          symbolById(b).probability *
          symbolById(c).probability;
        ev += p * reward;
      }
  return ev;
}

export function empiricalStats(rewards: number[]) {
  if (rewards.length === 0) return { mean: 0, variance: 0, runningAvg: [] as number[] };
  const runningAvg: number[] = [];
  let sum = 0;
  for (let i = 0; i < rewards.length; i++) {
    sum += rewards[i];
    runningAvg.push(sum / (i + 1));
  }
  const mean = sum / rewards.length;
  const variance =
    rewards.reduce((a, b) => a + (b - mean) ** 2, 0) / Math.max(1, rewards.length - 1);
  return { mean, variance, runningAvg };
}

export { SPIN_COST };
