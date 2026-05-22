export interface ObstacleArrival {
  lane: number;
  time: number;
  interArrival: number;
  col: number;
}

export interface PoissonPondState {
  lambda: number[];
  lanes: number;
  butterflyRow: number;
  butterflyCol: number;
  obstacles: { lane: number; col: number; id: number }[];
  arrivals: ObstacleArrival[];
  time: number;
  phase: 'ready' | 'crossing' | 'won' | 'hit' | 'simulating';
  slowMode: boolean;
  survivalTime: number;
  simulationResults: { success: number; total: number } | null;
}
