import { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { HotPinkButton } from '@/src/components/HotPinkButton';
import { EducationPanels } from '@/src/components/probability-wing/EducationPanels';
import { GARDEN_SYMBOLS, symbolById } from './symbols';
import {
  createChanceGardenState,
  spinOnce,
  batchSimulate,
  simulateBatch,
  expectedValuePerSpin,
  empiricalStats,
} from './chanceGardenEngine';
import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';

export function ChanceGardenScreen() {
  const router = useRouter();
  const [state, setState] = useState(createChanceGardenState);
  const theoryEV = useMemo(() => expectedValuePerSpin(), []);
  const stats = useMemo(() => empiricalStats(state.rewards), [state.rewards]);
  const batchStats = useMemo(
    () => (state.batchResults ? empiricalStats(state.batchResults) : null),
    [state.batchResults]
  );

  const runBatch = (n: number) => {
    const b = simulateBatch(n);
    setState((s) => batchSimulate(s, n));
  };

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Butterfly Chance Garden</Text>
      <Text style={styles.sub}>
        Math Garden · Fictional pollen tokens only · No real money
      </Text>

      <View style={styles.play}>
        <Text style={styles.tokens}>Pollen Tokens: {state.pollenTokens}</Text>
        <View style={styles.reels}>
          {(state.lastOutcome?.reels ?? ['?', '?', '?']).map((id, i) => (
            <Text key={i} style={styles.reel}>
              {symbolById(id).emoji}
            </Text>
          ))}
        </View>
        {state.lastOutcome && (
          <Text style={styles.result}>
            {state.lastOutcome.pattern} → +{state.lastOutcome.nectarReward} nectar (P≈
            {(state.lastOutcome.theoreticalProbability * 100).toFixed(1)}%)
          </Text>
        )}
        <HotPinkButton label="Spin (1 pollen)" onPress={() => setState(spinOnce)} />
        <View style={styles.batchRow}>
          <HotPinkButton label="Sim 10" variant="secondary" onPress={() => runBatch(10)} />
          <HotPinkButton label="Sim 100" variant="secondary" onPress={() => runBatch(100)} />
          <HotPinkButton label="Sim 1000" variant="secondary" onPress={() => runBatch(1000)} />
        </View>
      </View>

      <Text style={styles.section}>Symbol probabilities (PMF)</Text>
      {GARDEN_SYMBOLS.map((s) => (
        <Text key={s.id} style={styles.symRow}>
          {s.emoji} {s.label}: P={(s.probability * 100).toFixed(0)}% · payout {s.nectarPayout}
        </Text>
      ))}

      <EducationPanels
        learning={[
          'Sample space: all triples of flower symbols on three reels',
          'Independent spins: each reel draw does not affect the next',
          'Expected value E[R]: average nectar per spin if you spin forever',
          'Variance: how spread-out rewards feel (streaks vs calm runs)',
          'Law of large numbers: running average → E[R] as spins grow',
          'Conditional probability: P(pair | first reel is rose)',
          "Bayes: update beliefs about hidden 'luck' after seeing outcomes",
          'House edge: EV per spin can be < cost — ethical game design',
        ]}
        data={[
          { label: 'Trial count', value: String(state.totalSpins) },
          { label: 'Theoretical E[R] per spin', value: theoryEV.toFixed(3) },
          { label: 'Empirical mean reward', value: stats.mean.toFixed(3) },
          { label: 'Empirical variance', value: stats.variance.toFixed(3) },
          {
            label: 'Last running average',
            value: stats.runningAvg.length
              ? stats.runningAvg[stats.runningAvg.length - 1].toFixed(3)
              : '—',
          },
          {
            label: 'Batch sim mean (if run)',
            value: batchStats ? batchStats.mean.toFixed(3) : '—',
          },
        ]}
        python={[
          'ids, w = zip(*[(s.id, s.probability) for s in symbols])',
          'reel = random.choices(ids, weights=w, k=3)',
          'ev = sum(p(a,b,c)*reward(a,b,c) for all triples)',
          'pandas.DataFrame(rewards).describe()',
        ]}
        recruiter={[
          'Weighted random generation + enumerated expected value',
          'Empirical vs theoretical convergence (LLN)',
          'Ethical framing of gambling-like mechanics as education',
        ]}
      />

      <HotPinkButton label="Back to Probability Wing" variant="secondary" onPress={() => router.back()} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: colors.cream },
  content: { padding: spacing.md, paddingBottom: spacing.xxl },
  title: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.hotPink,
    textAlign: 'center',
  },
  sub: { textAlign: 'center', color: colors.charcoal, marginBottom: spacing.md },
  play: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 2,
    borderColor: colors.leafGreen,
  },
  tokens: { fontWeight: typography.weights.bold, color: colors.purple, marginBottom: spacing.sm },
  reels: { flexDirection: 'row', justifyContent: 'center', gap: spacing.lg, marginVertical: spacing.md },
  reel: { fontSize: 48 },
  result: { textAlign: 'center', color: colors.black, marginBottom: spacing.sm },
  batchRow: { gap: spacing.sm },
  section: { fontWeight: typography.weights.bold, color: colors.purple, marginTop: spacing.md },
  symRow: { color: colors.charcoal, marginTop: spacing.xs },
});
