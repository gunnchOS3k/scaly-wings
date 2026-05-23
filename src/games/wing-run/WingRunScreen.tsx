import { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  useWindowDimensions,
  ScrollView,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import { createWingRunState, startLevel, applyInput, tick, submitGateAnswer } from './wingRunEngine';
import { PETAL_PATH_1_1 } from './levelData';
import type { WingRunState } from './types';
import { createGameLoop } from '@/src/utils/gameLoop';
import { useGameInput } from '@/src/input/useGameInput';
import { isPressed } from '@/src/input/inputTypes';
import { inputManager } from '@/src/input/InputManager';
import { HotPinkButton } from '@/src/components/HotPinkButton';
import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';

const VIEW_H = 440;

export function WingRunScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const viewW = Math.min(width - 16, 400);
  const [state, setState] = useState<WingRunState>(() => createWingRunState(viewW));
  const stateRef = useRef(state);
  stateRef.current = state;
  const input = useGameInput(1);

  useEffect(() => {
    const loop = createGameLoop(() => {
      const s = stateRef.current;
      if (s.phase !== 'playing') return;
      let next = applyInput(s, {
        moveLeft: isPressed(input, 'moveLeft'),
        moveRight: isPressed(input, 'moveRight'),
        jump: isPressed(input, 'jump') || isPressed(input, 'flap'),
        glide: isPressed(input, 'glide'),
        dash: isPressed(input, 'dash'),
        pause: isPressed(input, 'pause'),
      });
      next = tick(next, viewW);
      setState(next);
    });
    loop.start();
    return () => loop.stop();
  }, [input, viewW]);

  const touch = (action: Parameters<typeof inputManager.setTouch>[1], on: boolean) => {
    inputManager.setTouch(1, action, on);
  };

  const cam = state.cameraX;
  const p = state.player;

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Wing Run: Nectar Valley</Text>
      <Text style={styles.sub}>{PETAL_PATH_1_1.name} — original butterfly platformer</Text>
      <Text style={styles.hud}>
        Pollen {state.pollen} · Score {state.score} · {state.phase}
      </Text>

      <View style={[styles.world, { width: viewW, height: VIEW_H }]}>
        {state.platforms.map((plat) => (
          <View
            key={plat.id}
            style={[
              styles.platform,
              {
                left: plat.x - cam,
                top: plat.y,
                width: plat.w,
                height: plat.h,
              },
            ]}
          />
        ))}
        {state.collectibles
          .filter((c) => !c.collected)
          .map((c) => (
            <Text key={c.id} style={[styles.collect, { left: c.x - cam, top: c.y }]}>
              {c.kind === 'pollen' ? '✨' : c.kind === 'nectar' ? '💧' : '🌟'}
            </Text>
          ))}
        {state.hazards.map((h) => (
          <View
            key={h.id}
            style={[styles.hazard, { left: h.x - cam, top: h.y, width: h.w, height: h.h }]}
          />
        ))}
        {state.mathGate && !state.mathGate.solved && (
          <View style={[styles.gate, { left: state.mathGate.x - cam, top: state.mathGate.y }]}>
            <Text style={styles.gateText}>?</Text>
          </View>
        )}
        <View style={[styles.goal, { left: state.goalX - cam, top: 240 }]}>
          <Text>🫛</Text>
        </View>
        <View style={[styles.player, { left: p.x - cam, top: p.y, width: p.width, height: p.height }]} />
      </View>

      {state.mathGate && state.player.x > state.mathGate.x - 120 && !state.mathGate.solved && (
        <View style={styles.gatePanel}>
          <Text>{state.mathGate.prompt}</Text>
          <TextInput
            style={styles.gateInput}
            value={state.gateAnswer}
            onChangeText={(t) => setState((s) => ({ ...s, gateAnswer: t }))}
            keyboardType="decimal-pad"
          />
          <HotPinkButton
            label="Answer"
            onPress={() => setState((s) => submitGateAnswer(s, s.gateAnswer))}
          />
        </View>
      )}

      <View style={styles.controls}>
        <Pressable style={styles.btn} onPressIn={() => touch('moveLeft', true)} onPressOut={() => touch('moveLeft', false)}>
          <Text>←</Text>
        </Pressable>
        <Pressable style={styles.btn} onPressIn={() => touch('moveRight', true)} onPressOut={() => touch('moveRight', false)}>
          <Text>→</Text>
        </Pressable>
        <Pressable style={styles.btn} onPressIn={() => touch('jump', true)} onPressOut={() => touch('jump', false)}>
          <Text>Flap</Text>
        </Pressable>
        <Pressable style={styles.btn} onPressIn={() => touch('glide', true)} onPressOut={() => touch('glide', false)}>
          <Text>Glide</Text>
        </Pressable>
        <Pressable style={styles.btn} onPressIn={() => touch('dash', true)} onPressOut={() => touch('dash', false)}>
          <Text>Dash</Text>
        </Pressable>
      </View>

      {state.phase === 'start' && (
        <HotPinkButton label="Start Petal Path" onPress={() => setState(startLevel)} />
      )}
      {state.phase === 'complete' && (
        <Text style={styles.win}>Chrysalis gate reached! 🦋</Text>
      )}
      {state.phase === 'gameover' && (
        <HotPinkButton label="Retry" onPress={() => setState(createWingRunState(viewW))} />
      )}
      <HotPinkButton label="Back to Arcade" variant="secondary" onPress={() => router.back()} />

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>What this demonstrates</Text>
        <Text style={styles.panelLine}>Side-scrolling camera · entity/collision design</Text>
        <Text style={styles.panelLine}>Educational probability gate · cross-platform input</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: colors.cream },
  content: { padding: spacing.md },
  title: { fontSize: typography.sizes.xl, fontWeight: typography.weights.bold, color: colors.hotPink },
  sub: { color: colors.charcoal },
  hud: { marginVertical: spacing.sm, color: colors.purple, fontWeight: typography.weights.semibold },
  world: {
    backgroundColor: colors.skyLight,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: colors.leafGreen,
  },
  platform: { position: 'absolute', backgroundColor: colors.leafGreen, borderRadius: 8 },
  collect: { position: 'absolute', fontSize: 18 },
  hazard: { position: 'absolute', backgroundColor: colors.charcoal, opacity: 0.5, borderRadius: 8 },
  gate: {
    position: 'absolute',
    width: 40,
    height: 50,
    backgroundColor: colors.purpleLight,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  gateText: { color: colors.white, fontWeight: typography.weights.bold },
  goal: { position: 'absolute', fontSize: 32 },
  player: {
    position: 'absolute',
    backgroundColor: colors.hotPink,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.white,
  },
  gatePanel: {
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: 12,
    marginVertical: spacing.sm,
  },
  gateInput: { borderWidth: 1, borderColor: colors.hotPink, padding: spacing.sm, marginVertical: spacing.sm, borderRadius: 8 },
  controls: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.md },
  btn: {
    minWidth: 56,
    minHeight: 48,
    backgroundColor: colors.white,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.hotPink,
  },
  win: { textAlign: 'center', fontWeight: typography.weights.bold, color: colors.hotPink, marginVertical: spacing.md },
  panel: { marginTop: spacing.lg, padding: spacing.md, backgroundColor: colors.white, borderRadius: 12 },
  panelTitle: { fontWeight: typography.weights.bold, color: colors.purple },
  panelLine: { color: colors.charcoal, marginTop: spacing.xs },
});
