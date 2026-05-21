import { useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import {
  createRaceState,
  startRace,
  moveP1,
  moveP2,
  tickTimer,
  scorePercent,
  RACE_DURATION_SEC,
} from './larvaLeafRaceEngine';
import type { LarvaRaceState } from './types';
import { HotPinkButton } from '@/src/components/HotPinkButton';
import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';

const CELL = 22;

export function LarvaLeafRaceScreen() {
  const router = useRouter();
  const [state, setState] = useState<LarvaRaceState>(() => createRaceState());
  const stateRef = useRef(state);
  stateRef.current = state;

  useEffect(() => {
    if (state.phase !== 'racing') return;
    const id = setInterval(() => {
      setState((s) => tickTimer(s, 1));
    }, 1000);
    return () => clearInterval(id);
  }, [state.phase]);

  useEffect(() => {
    if (Platform.OS !== 'web') return;
    const onKey = (e: KeyboardEvent) => {
      const s = stateRef.current;
      if (s.phase !== 'racing') return;
      const k = e.key.toLowerCase();
      if (['w', 'a', 's', 'd'].includes(k)) {
        const dir = { w: 'up', s: 'down', a: 'left', d: 'right' }[k]!;
        setState((prev) => moveP1(prev, dir));
      }
      if (e.key === 'ArrowUp') setState((p) => moveP2(p, 'up'));
      if (e.key === 'ArrowDown') setState((p) => moveP2(p, 'down'));
      if (e.key === 'ArrowLeft') setState((p) => moveP2(p, 'left'));
      if (e.key === 'ArrowRight') setState((p) => moveP2(p, 'right'));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const renderGrid = () => {
    const cells = [];
    for (let r = 0; r < state.gridRows; r++) {
      for (let c = 0; c < state.gridCols; c++) {
        const eaten = state.eaten[r][c];
        const isP1 = state.larva1.row === r && state.larva1.col === c;
        const isP2 = state.larva2.row === r && state.larva2.col === c;
        cells.push(
          <View
            key={`${r}-${c}`}
            style={[
              styles.cell,
              { width: CELL, height: CELL },
              eaten && styles.cellEaten,
              isP1 && { backgroundColor: state.larva1.color },
              isP2 && { backgroundColor: state.larva2.color },
            ]}
          />
        );
      }
    }
    return (
      <View style={[styles.grid, { width: state.gridCols * CELL, height: state.gridRows * CELL }]}>
        {cells}
      </View>
    );
  };

  const p1Move = useCallback((dir: string) => {
    setState((s) => (s.phase === 'racing' ? moveP1(s, dir) : s));
  }, []);

  const p2Move = useCallback((dir: string) => {
    setState((s) => (s.phase === 'racing' ? moveP2(s, dir) : s));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Larva Leaf Race</Text>
      <Text style={styles.hud}>
        Time {Math.ceil(state.timeLeft)}s · P1 {scorePercent(state, 1)}% · P2{' '}
        {scorePercent(state, 2)}%
      </Text>
      <Text style={styles.controls}>
        P1: WASD (web) or left pad · P2: Arrows or right pad
      </Text>
      <View style={styles.boardWrap}>{renderGrid()}</View>
      {Platform.OS !== 'web' && state.phase === 'racing' && (
        <View style={styles.pads}>
          <View style={styles.padCol}>
            <Text style={styles.padLabel}>P1</Text>
            <View style={styles.padRow}>
              <Pressable style={styles.padBtn} onPress={() => p1Move('up')}>
                <Text>↑</Text>
              </Pressable>
            </View>
            <View style={styles.padRow}>
              <Pressable style={styles.padBtn} onPress={() => p1Move('left')}>
                <Text>←</Text>
              </Pressable>
              <Pressable style={styles.padBtn} onPress={() => p1Move('down')}>
                <Text>↓</Text>
              </Pressable>
              <Pressable style={styles.padBtn} onPress={() => p1Move('right')}>
                <Text>→</Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.padCol}>
            <Text style={styles.padLabel}>P2</Text>
            <View style={styles.padRow}>
              <Pressable style={styles.padBtn} onPress={() => p2Move('up')}>
                <Text>↑</Text>
              </Pressable>
            </View>
            <View style={styles.padRow}>
              <Pressable style={styles.padBtn} onPress={() => p2Move('left')}>
                <Text>←</Text>
              </Pressable>
              <Pressable style={styles.padBtn} onPress={() => p2Move('down')}>
                <Text>↓</Text>
              </Pressable>
              <Pressable style={styles.padBtn} onPress={() => p2Move('right')}>
                <Text>→</Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}
      {state.phase === 'ready' && (
        <HotPinkButton label={`Start ${RACE_DURATION_SEC}s Race`} onPress={() => setState(startRace(state))} />
      )}
      {state.phase === 'finished' && (
        <Text style={styles.winner}>
          {state.winner == null
            ? 'Tie! Both evolve together 🦋'
            : `${state.winner === 1 ? 'P1' : 'P2'} evolves first! 🦋`}
        </Text>
      )}
      {state.phase === 'finished' && (
        <HotPinkButton label="Rematch" onPress={() => setState(startRace(createRaceState()))} />
      )}
      <HotPinkButton label="Back to Arcade" variant="secondary" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.md, backgroundColor: colors.cream, alignItems: 'center' },
  title: { fontSize: typography.sizes.xl, fontWeight: typography.weights.bold, color: colors.hotPink },
  hud: { marginVertical: spacing.sm, color: colors.charcoal },
  controls: { fontSize: typography.sizes.xs, color: colors.charcoal, marginBottom: spacing.sm },
  boardWrap: { alignItems: 'center', marginVertical: spacing.md },
  grid: { flexDirection: 'row', flexWrap: 'wrap', backgroundColor: colors.leafGreen },
  cell: { backgroundColor: colors.leafGreen, borderWidth: 0.5, borderColor: colors.leafDark },
  cellEaten: { backgroundColor: colors.creamDark },
  pads: { flexDirection: 'row', justifyContent: 'space-around', width: '100%' },
  padCol: { alignItems: 'center' },
  padLabel: { fontWeight: typography.weights.bold, color: colors.hotPink },
  padRow: { flexDirection: 'row', gap: spacing.sm, margin: spacing.xs },
  padBtn: {
    minWidth: 44,
    minHeight: 44,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.hotPink,
  },
  winner: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.purple,
    marginVertical: spacing.md,
  },
});
