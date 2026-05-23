import { useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Pressable, useWindowDimensions, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import {
  createPinballState,
  startGame,
  setFlipper,
  chargePlunger,
  launchBall,
  tick,
  togglePause,
} from './pinballEngine';
import { PINBALL_HIGH_SCORE_KEY } from './pinballLevels';
import type { PinballState } from './types';
import { createGameLoop } from '@/src/utils/gameLoop';
import { loadScore, saveScore } from '@/src/utils/storage';
import { isNewHighScore } from '@/src/utils/scoring';
import { useGameInput } from '@/src/input/useGameInput';
import { isPressed } from '@/src/input/inputTypes';
import { inputManager } from '@/src/input/InputManager';
import { HotPinkButton } from '@/src/components/HotPinkButton';
import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';

export function PinballScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const tableW = Math.min(width - 32, 360);
  const tableH = tableW * 1.55;
  const [state, setState] = useState<PinballState>(() => createPinballState(tableW, tableH));
  const stateRef = useRef(state);
  stateRef.current = state;
  const input = useGameInput(1);
  const prevPause = useRef(false);

  useEffect(() => {
    loadScore(PINBALL_HIGH_SCORE_KEY).then((h) => setState((s) => ({ ...s, highScore: h })));
  }, []);

  useEffect(() => {
    const loop = createGameLoop(() => {
      if (stateRef.current.phase !== 'playing') return;
      setState((s) => tick(s));
    });
    loop.start();
    return () => loop.stop();
  }, []);

  useEffect(() => {
    if (isPressed(input, 'leftFlipper')) setState((s) => setFlipper(s, 'left', true));
    else setState((s) => setFlipper(s, 'left', false));
    if (isPressed(input, 'rightFlipper')) setState((s) => setFlipper(s, 'right', true));
    else setState((s) => setFlipper(s, 'right', false));
    if (isPressed(input, 'launch')) {
      setState((s) => chargePlunger(s, 0.05));
    }
    const pauseNow = isPressed(input, 'pause');
    if (pauseNow && !prevPause.current) setState(togglePause);
    prevPause.current = pauseNow;
  }, [input]);

  useEffect(() => {
    if (state.phase !== 'gameover') return;
    if (isNewHighScore(state.score, state.highScore)) {
      saveScore(PINBALL_HIGH_SCORE_KEY, state.score);
      setState((s) => ({ ...s, highScore: state.score }));
    }
  }, [state.phase, state.score, state.highScore]);

  const touchFlip = useCallback((side: 'left' | 'right', active: boolean) => {
    inputManager.setTouch(1, side === 'left' ? 'leftFlipper' : 'rightFlipper', active);
    setState((s) => setFlipper(s, side, active));
  }, []);

  const launch = () => setState((s) => launchBall(s));

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Scaly Wings Pinball</Text>
      <Text style={styles.sub}>Nectar pearl · flower bumpers · wing flippers</Text>
      <Text style={styles.hud}>
        Score {state.score} · Lives {state.lives} · Best {state.highScore}
      </Text>

      <View style={[styles.table, { width: tableW, height: tableH }]}>
        {state.bumpers.map((b) => (
          <View
            key={b.id}
            style={[
              styles.bumper,
              {
                left: b.x - b.radius,
                top: b.y - b.radius,
                width: b.radius * 2,
                height: b.radius * 2,
                borderRadius: b.radius,
              },
            ]}
          />
        ))}
        <View
          style={[
            styles.ball,
            { left: state.ball.x - state.ball.radius, top: state.ball.y - state.ball.radius },
          ]}
        />
        {state.flippers.map((f) => (
          <View
            key={f.side}
            style={[
              styles.flipper,
              f.side === 'left' ? styles.flipperL : styles.flipperR,
              { top: f.y, left: f.x - 30 },
              f.active && styles.flipperOn,
            ]}
          />
        ))}
        {state.phase === 'start' && (
          <View style={styles.overlay}>
            <Text style={styles.overlayText}>Tap Start · Hold launch zone to plunger</Text>
          </View>
        )}
      </View>

      <View style={styles.touchRow}>
        <Pressable
          style={styles.touchZone}
          onPressIn={() => touchFlip('left', true)}
          onPressOut={() => touchFlip('left', false)}
        >
          <Text>Left flipper</Text>
        </Pressable>
        <Pressable style={styles.launchZone} onPressIn={launch}>
          <Text>Launch</Text>
        </Pressable>
        <Pressable
          style={styles.touchZone}
          onPressIn={() => touchFlip('right', true)}
          onPressOut={() => touchFlip('right', false)}
        >
          <Text>Right flipper</Text>
        </Pressable>
      </View>

      {state.phase === 'start' && (
        <HotPinkButton label="Start" onPress={() => setState(startGame)} />
      )}
      <HotPinkButton label="Back to Arcade" variant="secondary" onPress={() => router.back()} />

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>What this demonstrates</Text>
        <Text style={styles.panelLine}>Physics simulation · collision · input abstraction</Text>
        <Text style={styles.panelLine}>Game state machine · cross-platform controls</Text>
        <Text style={styles.panelLine}>Web: A/D flippers · Space launch · Enter pause</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: colors.cream },
  content: { padding: spacing.md, alignItems: 'center' },
  title: { fontSize: typography.sizes.xl, fontWeight: typography.weights.bold, color: colors.hotPink },
  sub: { color: colors.charcoal, marginBottom: spacing.sm },
  hud: { fontWeight: typography.weights.semibold, color: colors.purple, marginBottom: spacing.md },
  table: {
    backgroundColor: colors.leafDark,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: colors.hotPink,
  },
  bumper: { position: 'absolute', backgroundColor: colors.hotPinkLight, opacity: 0.9 },
  ball: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.gold,
    borderWidth: 2,
    borderColor: colors.white,
  },
  flipper: {
    position: 'absolute',
    width: 60,
    height: 14,
    backgroundColor: colors.purpleLight,
    borderRadius: 7,
  },
  flipperL: { transform: [{ rotate: '-25deg' }] },
  flipperR: { transform: [{ rotate: '25deg' }] },
  flipperOn: { backgroundColor: colors.hotPink },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.overlay,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayText: { color: colors.white, textAlign: 'center', padding: spacing.md },
  touchRow: { flexDirection: 'row', width: '100%', marginTop: spacing.md, gap: spacing.sm },
  touchZone: {
    flex: 1,
    minHeight: 56,
    backgroundColor: colors.white,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.hotPink,
  },
  launchZone: {
    flex: 1,
    minHeight: 56,
    backgroundColor: colors.hotPink,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  panel: {
    marginTop: spacing.lg,
    padding: spacing.md,
    backgroundColor: colors.white,
    borderRadius: 12,
    width: '100%',
  },
  panelTitle: { fontWeight: typography.weights.bold, color: colors.purple },
  panelLine: { color: colors.charcoal, marginTop: spacing.xs },
});
