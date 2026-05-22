import { mmseEstimate, sampleGaussian, theoreticalMse } from './estimation';
import type { NoiseNectarState, NoisySample } from './types';

export function createNoiseNectarState(): NoiseNectarState {
  return {
    signalVariance: 4,
    noiseVariance: 1,
    samples: [],
    playerGuess: '',
    useMmseHelper: true,
    runningMse: 0,
  };
}

export function generateSample(state: NoiseNectarState): NoiseNectarState {
  const sigmaX = Math.sqrt(state.signalVariance);
  const sigmaN = Math.sqrt(state.noiseVariance);
  const trueX = sampleGaussian(sigmaX);
  const noise = sampleGaussian(sigmaN);
  const observationY = trueX + noise;

  const guessNum = parseFloat(state.playerGuess);
  const estimateX = state.useMmseHelper
    ? mmseEstimate(observationY, state.signalVariance, state.noiseVariance)
    : Number.isFinite(guessNum)
      ? guessNum
      : mmseEstimate(observationY, state.signalVariance, state.noiseVariance);

  const error = trueX - estimateX;
  const squaredError = error * error;
  const sample: NoisySample = {
    trueX,
    observationY,
    estimateX,
    error,
    squaredError,
  };
  const samples = [...state.samples.slice(-49), sample];
  const runningMse =
    samples.reduce((s, x) => s + x.squaredError, 0) / samples.length;

  return { ...state, samples, runningMse };
}

export function setSignalVariance(state: NoiseNectarState, v: number): NoiseNectarState {
  return { ...state, signalVariance: Math.max(0.1, v) };
}

export function setNoiseVariance(state: NoiseNectarState, v: number): NoiseNectarState {
  return { ...state, noiseVariance: Math.max(0.1, v) };
}

export function theoryMse(state: NoiseNectarState): number {
  return theoreticalMse(state.signalVariance, state.noiseVariance);
}

export function correlationXY(signalVar: number, noiseVar: number): number {
  const sigmaX = Math.sqrt(signalVar);
  const sigmaY = Math.sqrt(signalVar + noiseVar);
  return sigmaX / sigmaY;
}
