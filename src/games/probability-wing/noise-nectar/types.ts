export interface NoisySample {
  trueX: number;
  observationY: number;
  estimateX: number;
  error: number;
  squaredError: number;
}

export interface NoiseNectarState {
  signalVariance: number;
  noiseVariance: number;
  samples: NoisySample[];
  playerGuess: string;
  useMmseHelper: boolean;
  runningMse: number;
}
