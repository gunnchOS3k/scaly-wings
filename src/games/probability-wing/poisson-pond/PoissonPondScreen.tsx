import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { HotPinkButton } from '@/src/components/HotPinkButton';
import { EducationPanels } from '@/src/components/probability-wing/EducationPanels';
import {
  createPoissonPondState,
  startCrossing,
  moveButterfly,
  runSimulations,
  setLambda,
  avgInterArrival,
  COLS,
} from './poissonPondEngine';
import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';

export function PoissonPondScreen() {
  const router = useRouter();
  const [state, setState] = useState(createPoissonPondState);

  const renderPond = () => {
    const rows = [];
    for (let r = 0; r < state.lanes; r++) {
      const cells = [];
      for (let c = 0; c < COLS; c++) {
        const isB = state.butterflyRow === r && state.butterflyCol === c;
        const isO = state.obstacles.some((o) => o.lane === r && o.col === c);
        cells.push(
          <View
            key={c}
            style={[
              styles.cell,
              isB && styles.butterfly,
              isO && styles.obstacle,
            ]}
          >
            <Text style={styles.cellText}>{isB ? '🦋' : isO ? '🐸' : '🪷'}</Text>
          </View>
        );
      }
      rows.push(
        <View key={r} style={styles.row}>
          <Text style={styles.laneLabel}>λ{(state.lambda[r] ?? 1).toFixed(1)}</Text>
          {cells}
        </View>
      );
    }
    return rows;
  };

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Poisson Pond Crossing</Text>
      <Text style={styles.sub}>Obstacles arrive with rate λ · exponential waits</Text>

      <View style={styles.play}>
        <View style={styles.switchRow}>
          <Text>Slow mode (inspect arrivals)</Text>
          <Switch
            value={state.slowMode}
            onValueChange={(v) => setState((s) => ({ ...s, slowMode: v }))}
            trackColor={{ true: colors.hotPink }}
          />
        </View>
        {state.lambda.map((lam, i) => (
          <View key={i} style={styles.lambdaRow}>
            <Text>Lane {i + 1} λ={lam.toFixed(1)}</Text>
            <HotPinkButton
              label="λ−"
              variant="secondary"
              onPress={() => setState((s) => setLambda(s, i, lam - 0.2))}
              style={styles.mini}
            />
            <HotPinkButton
              label="λ+"
              variant="secondary"
              onPress={() => setState((s) => setLambda(s, i, lam + 0.2))}
              style={styles.mini}
            />
          </View>
        ))}
        <View style={styles.pond}>{renderPond()}</View>
        {state.phase === 'ready' && (
          <HotPinkButton label="Start crossing" onPress={() => setState(startCrossing)} />
        )}
        {state.phase === 'crossing' && (
          <View style={styles.controls}>
            <HotPinkButton label="↑" onPress={() => setState((s) => moveButterfly(s, 1, 0))} />
            <View style={styles.lr}>
              <HotPinkButton label="←" variant="secondary" onPress={() => setState((s) => moveButterfly(s, 0, -1))} />
              <HotPinkButton label="→" variant="secondary" onPress={() => setState((s) => moveButterfly(s, 0, 1))} />
            </View>
          </View>
        )}
        {state.phase === 'won' && <Text style={styles.status}>Crossed safely! 🦋</Text>}
        {state.phase === 'hit' && <Text style={styles.status}>Hit obstacle — try again</Text>}
        <HotPinkButton label="Simulate 100 crossings" onPress={() => setState((s) => runSimulations(s, 100))} />
        {state.simulationResults && (
          <Text style={styles.sim}>
            Empirical success:{' '}
            {((state.simulationResults.success / state.simulationResults.total) * 100).toFixed(1)}%
            ({state.simulationResults.success}/{state.simulationResults.total})
          </Text>
        )}
      </View>

      {state.slowMode && state.arrivals.length > 0 && (
        <>
          <Text style={styles.tableTitle}>Recent inter-arrival times</Text>
          {state.arrivals.slice(0, 6).map((a, i) => (
            <Text key={i} style={styles.arrival}>
              Lane {a.lane + 1}: Δt={a.interArrival.toFixed(2)}s @ t={a.time.toFixed(2)}
            </Text>
          ))}
        </>
      )}

      <EducationPanels
        learning={[
          'N(t) counting process: arrivals up to time t',
          'Rate λ controls average arrivals per unit time',
          'Inter-arrival times are exponential(λ) for Poisson processes',
          'Independent increments on disjoint intervals',
          'Higher λ → busier lanes (more frog/dragonfly traffic)',
          'Simulation vs formula: compare empirical success rate to intuition',
        ]}
        data={[
          { label: 'Time in pond', value: state.time.toFixed(2) },
          { label: 'Arrivals logged', value: String(state.arrivals.length) },
          { label: 'Avg inter-arrival', value: avgInterArrival(state.arrivals).toFixed(3) },
          { label: 'Mean λ (lanes)', value: (state.lambda.reduce((a, b) => a + b, 0) / state.lambda.length).toFixed(2) },
          { label: 'Survival time', value: state.survivalTime.toFixed(2) },
          {
            label: 'Sim success rate',
            value: state.simulationResults
              ? `${((state.simulationResults.success / state.simulationResults.total) * 100).toFixed(1)}%`
              : '—',
          },
        ]}
        python={[
          'wait = -np.log(np.random.rand()) / lam',
          'count = np.random.poisson(lam * T)',
          'arrivals = np.cumsum(np.random.exponential(1/lam, size=50))',
        ]}
        recruiter={[
          'Stochastic arrival simulation driving game difficulty',
          'Exponential inter-arrival + empirical crossing statistics',
          'Real-time lane parameters (λ sliders)',
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
    borderWidth: 2,
    borderColor: colors.leafGreen,
  },
  switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.sm },
  lambdaRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.xs },
  mini: { paddingVertical: spacing.xs, minHeight: 36 },
  pond: { marginVertical: spacing.md },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  laneLabel: { width: 36, fontSize: 10, color: colors.charcoal },
  cell: {
    width: 44,
    height: 44,
    backgroundColor: colors.skyLight,
    margin: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  butterfly: { backgroundColor: colors.hotPinkLight },
  obstacle: { backgroundColor: colors.leafDark },
  cellText: { fontSize: 20 },
  controls: { marginTop: spacing.md },
  lr: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.sm },
  status: { fontWeight: typography.weights.bold, color: colors.purple, textAlign: 'center', marginVertical: spacing.sm },
  sim: { textAlign: 'center', color: colors.hotPink, marginTop: spacing.sm },
  tableTitle: { fontWeight: typography.weights.bold, color: colors.purple, marginTop: spacing.lg },
  arrival: { fontFamily: 'monospace', fontSize: typography.sizes.xs, color: colors.charcoal },
});
