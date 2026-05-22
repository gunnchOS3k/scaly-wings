export interface SlotSymbol {
  id: string;
  emoji: string;
  label: string;
  probability: number;
  nectarPayout: number;
}

export interface SpinOutcome {
  reels: string[];
  nectarReward: number;
  pattern: string;
  theoreticalProbability: number;
}

export interface ChanceGardenState {
  pollenTokens: number;
  totalSpins: number;
  totalNectar: number;
  rewards: number[];
  lastOutcome: SpinOutcome | null;
  batchResults: number[] | null;
}
