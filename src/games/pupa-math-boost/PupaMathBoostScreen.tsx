import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import {
  createMathState,
  submitAnswer,
  tickElapsed,
  PUPA_BEST_TIME_KEY,
} from './pupaMathBoostEngine';
import { problemsByDifficulty } from './mathProblems';
import type { PupaMathState, Difficulty } from './types';
import { MathProblemCard } from '@/src/components/MathProblemCard';
import { ProgressMetamorphosis } from '@/src/components/ProgressMetamorphosis';
import { HotPinkButton } from '@/src/components/HotPinkButton';
import { loadScore, saveScore } from '@/src/utils/storage';
import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';

export function PupaMathBoostScreen() {
  const router = useRouter();
  const [state, setState] = useState<PupaMathState>(createMathState);
  const [answer, setAnswer] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [bestTime, setBestTime] = useState<number | null>(null);

  const pool = problemsByDifficulty(difficulty);
  const problem = pool[state.currentIndex % pool.length] ?? pool[0];

  useEffect(() => {
    if (state.finished) return;
    const id = setInterval(() => setState((s) => tickElapsed(s, 1)), 1000);
    return () => clearInterval(id);
  }, [state.finished]);

  useEffect(() => {
    loadScore(PUPA_BEST_TIME_KEY, 9999).then((t) => setBestTime(t === 9999 ? null : t));
  }, []);

  useEffect(() => {
    if (!state.finished) return;
    if (bestTime === null || state.elapsedSec < bestTime) {
      saveScore(PUPA_BEST_TIME_KEY, state.elapsedSec);
      setBestTime(state.elapsedSec);
    }
  }, [state.finished, state.elapsedSec, bestTime]);

  const check = () => {
    if (!problem) return;
    setState((s) => submitAnswer(s, answer, problem, pool.length));
    setAnswer('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pupa Math Boost</Text>
      <Text style={styles.hud}>
        ✓ {state.correct} · ✗ {state.wrong} · ×{state.multiplier.toFixed(1)} · {state.elapsedSec}s
        {bestTime != null ? ` · Best ${bestTime}s` : ''}
      </Text>
      <View style={styles.diffRow}>
        {(['easy', 'medium', 'hard'] as Difficulty[]).map((d) => (
          <HotPinkButton
            key={d}
            label={d}
            variant={difficulty === d ? 'primary' : 'secondary'}
            onPress={() => setDifficulty(d)}
            style={styles.diffBtn}
          />
        ))}
      </View>
      <ProgressMetamorphosis progress={state.progress} stage={state.stage} />
      {!state.finished && problem && (
        <>
          <MathProblemCard problem={problem} level={difficulty} />
          <TextInput
            style={styles.input}
            value={answer}
            onChangeText={setAnswer}
            placeholder="Your answer"
            keyboardType="default"
            accessibilityLabel="Answer input"
          />
          <HotPinkButton label="Submit" onPress={check} />
        </>
      )}
      {state.finished && (
        <Text style={styles.done}>🦋 Metamorphosis complete in {state.elapsedSec}s!</Text>
      )}
      <HotPinkButton
        label="Reset"
        variant="secondary"
        onPress={() => {
          setState(createMathState());
          setAnswer('');
        }}
      />
      <HotPinkButton label="Back to Arcade" variant="secondary" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.md, backgroundColor: colors.cream },
  title: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.hotPink,
    textAlign: 'center',
  },
  hud: { textAlign: 'center', color: colors.charcoal, marginVertical: spacing.sm },
  diffRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
  diffBtn: { marginHorizontal: spacing.xs, paddingVertical: spacing.sm },
  input: {
    borderWidth: 2,
    borderColor: colors.hotPink,
    borderRadius: 12,
    padding: spacing.md,
    marginVertical: spacing.md,
    fontSize: typography.sizes.lg,
    backgroundColor: colors.white,
  },
  skipNote: { color: colors.charcoal, fontSize: typography.sizes.sm, textAlign: 'center' },
  done: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.purple,
    textAlign: 'center',
    marginVertical: spacing.lg,
  },
});
