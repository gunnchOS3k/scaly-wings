import { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  createInitialState,
  startGame,
  flap,
  tick,
  FLUTTER_HIGH_SCORE_KEY,
  BUTTERFLY_SIZE,
  GATE_WIDTH,
} from './flutterFlightEngine';
import type { FlutterFlightState } from './types';
import { createGameLoop } from '@/src/utils/gameLoop';
import { loadScore, saveScore } from '@/src/utils/storage';
import { isNewHighScore } from '@/src/utils/scoring';
import { HotPinkButton } from '@/src/components/HotPinkButton';
import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';

export function FlutterFlightScreen() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const gameHeight = Math.min(height * 0.55, 480);
  const [state, setState] = useState<FlutterFlightState>(() =>
    createInitialState(width, gameHeight)
  );
  const [highScore, setHighScore] = useState(0);
  const stateRef = useRef(state);
  stateRef.current = state;

  useEffect(() => {
    loadScore(FLUTTER_HIGH_SCORE_KEY).then(setHighScore);
  }, []);

  useEffect(() => {
    setState((s) => ({ ...createInitialState(width, gameHeight), phase: s.phase, score: s.score }));
  }, [width, gameHeight]);

  useEffect(() => {
    const loop = createGameLoop(() => {
      if (stateRef.current.phase !== 'playing') return;
      setState((s) => tick(s));
    });
    loop.start();
    return () => loop.stop();
  }, []);

  useEffect(() => {
    if (state.phase !== 'gameover') return;
    if (isNewHighScore(state.score, highScore)) {
      saveScore(FLUTTER_HIGH_SCORE_KEY, state.score);
      setHighScore(state.score);
    }
  }, [state.phase, state.score, highScore]);

  const handleFlap = useCallback(() => {
    setState((s) => (s.phase === 'start' ? startGame(s) : flap(s)));
  }, []);

  useEffect(() => {
    if (Platform.OS !== 'web') return;
    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        handleFlap();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handleFlap]);

  return (
    <View style={styles.container}>
      <Text style={styles.hud}>
        Score {state.score} · Best {highScore}
      </Text>
      <Pressable style={[styles.arena, { height: gameHeight }]} onPress={handleFlap}>
        <View style={styles.sky} />
        {state.gates.map((g) => (
          <View key={g.id}>
            <View
              style={[
                styles.gate,
                { left: g.x, top: 0, width: GATE_WIDTH, height: g.gapY },
              ]}
            />
            <View
              style={[
                styles.gate,
                {
                  left: g.x,
                  top: g.gapY + g.gapHeight,
                  width: GATE_WIDTH,
                  height: gameHeight - g.gapY - g.gapHeight,
                },
              ]}
            />
          </View>
        ))}
        <View
          style={[
            styles.butterfly,
            {
              top: state.butterfly.y,
              left: width * 0.25,
              width: BUTTERFLY_SIZE,
              height: BUTTERFLY_SIZE,
            },
          ]}
        />
        {state.phase === 'start' && (
          <View style={styles.overlay}>
            <Text style={styles.overlayTitle}>Flutter Flight</Text>
            <Text style={styles.overlaySub}>Tap or press Space to flap</Text>
          </View>
        )}
        {state.phase === 'gameover' && (
          <View style={styles.overlay}>
            <Text style={styles.overlayTitle}>Game Over</Text>
            <Text style={styles.overlaySub}>Score: {state.score}</Text>
          </View>
        )}
      </Pressable>
      <HotPinkButton label="Flap!" onPress={handleFlap} />
      {state.phase === 'gameover' && (
        <HotPinkButton
          label="Play Again"
          onPress={() => setState(startGame(createInitialState(width, gameHeight)))}
        />
      )}
      <HotPinkButton label="Back to Arcade" variant="secondary" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.md, backgroundColor: colors.cream },
  hud: {
    textAlign: 'center',
    fontWeight: typography.weights.bold,
    color: colors.hotPink,
    marginBottom: spacing.sm,
  },
  arena: {
    width: '100%',
    backgroundColor: colors.skyLight,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: colors.purpleLight,
  },
  sky: { ...StyleSheet.absoluteFillObject, backgroundColor: colors.skyGradientEnd },
  gate: {
    position: 'absolute',
    backgroundColor: colors.leafDark,
    borderRadius: 4,
  },
  butterfly: {
    position: 'absolute',
    backgroundColor: colors.hotPink,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: colors.white,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.overlay,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayTitle: {
    color: colors.white,
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
  },
  overlaySub: { color: colors.cream, marginTop: spacing.sm },
});
