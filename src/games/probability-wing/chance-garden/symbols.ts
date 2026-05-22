import type { SlotSymbol } from './types';

/** Fictional flower/butterfly symbols — probabilities sum to 1. */
export const GARDEN_SYMBOLS: SlotSymbol[] = [
  { id: 'rose', emoji: '🌹', label: 'Rose Bloom', probability: 0.12, nectarPayout: 8 },
  { id: 'lily', emoji: '🌸', label: 'Lily Petal', probability: 0.18, nectarPayout: 5 },
  { id: 'vine', emoji: '🌿', label: 'Vine Curl', probability: 0.22, nectarPayout: 3 },
  { id: 'moth', emoji: '🦋', label: 'Mini Moth', probability: 0.2, nectarPayout: 4 },
  { id: 'dew', emoji: '💧', label: 'Dew Drop', probability: 0.18, nectarPayout: 2 },
  { id: 'seed', emoji: '🌱', label: 'Seed Pod', probability: 0.1, nectarPayout: 6 },
];

export function symbolById(id: string): SlotSymbol {
  return GARDEN_SYMBOLS.find((s) => s.id === id) ?? GARDEN_SYMBOLS[0];
}
