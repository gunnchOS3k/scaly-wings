import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { HotPinkButton } from '@/src/components/HotPinkButton';
import { EducationPanels } from '@/src/components/probability-wing/EducationPanels';
import {
  createNoiseNectarState,
  generateSample,
  setSignalVariance,
  setNoiseVariance,
  theoryMse,
  correlationXY,
} from './noiseNectarEngine';
import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';

function SliderRow({
  label,
  value,
  onLess,
  onMore,
}: {
  label: string;
  value: number;
  onLess: () => void;
  onMore: () => void;
}) {
  return (
    <View style={styles.sliderRow}>
      <Text style={styles.sliderLabel}>{label}: {value.toFixed(1)}</Text>
      <View style={styles.sliderBtns}>
        <HotPinkButton label="−" variant="secondary" onPress={onLess} style={styles.miniBtn} />
        <HotPinkButton label="+" variant="secondary" onPress={onMore} style={styles.miniBtn} />
      </View>
    </View>
  );
}

export function NoiseNectarScreen() {
  const router = useRouter();
  const [state, setState] = useState(createNoiseNectarState);
  const last = state.samples[state.samples.length - 1];

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Noise Nectar Rescue</Text>
      <Text style={styles.sub}>Hidden nectar X · Noisy sensor Y = X + N</Text>

      <View style={styles.play}>
        <SliderRow
          label="Signal variance σ²x"
          value={state.signalVariance}
          onLess={() => setState((s) => setSignalVariance(s, s.signalVariance - 0.5))}
          onMore={() => setState((s) => setSignalVariance(s, s.signalVariance + 0.5))}
        />
        <SliderRow
          label="Noise variance σ²n"
          value={state.noiseVariance}
          onLess={() => setState((s) => setNoiseVariance(s, s.noiseVariance - 0.5))}
          onMore={() => setState((s) => setNoiseVariance(s, s.noiseVariance + 0.5))}
        />
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Auto-MMSE Helper</Text>
          <Switch
            value={state.useMmseHelper}
            onValueChange={(v) => setState((s) => ({ ...s, useMmseHelper: v }))}
            trackColor={{ true: colors.hotPink }}
          />
        </View>
        {!state.useMmseHelper && (
          <TextInput
            style={styles.input}
            placeholder="Your estimate of X"
            value={state.playerGuess}
            onChangeText={(t) => setState((s) => ({ ...s, playerGuess: t }))}
            keyboardType="numeric"
          />
        )}
        <HotPinkButton label="New noisy measurement" onPress={() => setState(generateSample)} />
        {last && (
          <View style={styles.truth}>
            <Text>True X: {last.trueX.toFixed(2)}</Text>
            <Text>Observation Y: {last.observationY.toFixed(2)}</Text>
            <Text>Estimate X̂: {last.estimateX.toFixed(2)}</Text>
            <Text>Error: {last.error.toFixed(2)} · SE: {last.squaredError.toFixed(2)}</Text>
          </View>
        )}
      </View>

      <Text style={styles.tableTitle}>Recent samples (X, Y, X̂, e, e²)</Text>
      {state.samples
        .slice(-6)
        .reverse()
        .map((s, i) => (
          <Text key={i} style={styles.tableRow}>
            {s.trueX.toFixed(1)}, {s.observationY.toFixed(1)}, {s.estimateX.toFixed(1)},{' '}
            {s.error.toFixed(1)}, {s.squaredError.toFixed(1)}
          </Text>
        ))}

      <EducationPanels
        learning={[
          'Random variable X = hidden nectar location',
          'Noise N is zero-mean; Y = X + N is the sensor reading',
          'Covariance & correlation link signal and observation strength',
          'Orthogonality: MMSE error ⊥ observation (estimation geometry)',
          'Higher noise variance → worse estimates (larger MSE)',
          'Gaussian case: linear estimator X̂ = aY is optimal (MMSE)',
        ]}
        data={[
          { label: 'Trial count', value: String(state.samples.length) },
          { label: 'Theoretical MMSE', value: theoryMse(state).toFixed(3) },
          { label: 'Running MSE', value: state.runningMse.toFixed(3) },
          { label: 'Corr(X,Y)', value: correlationXY(state.signalVariance, state.noiseVariance).toFixed(3) },
          { label: 'σ²x', value: state.signalVariance.toFixed(2) },
          { label: 'σ²n', value: state.noiseVariance.toFixed(2) },
        ]}
        python={[
          'X = np.random.normal(0, np.sqrt(sig_var))',
          'Y = X + np.random.normal(0, np.sqrt(noise_var))',
          'a = sig_var / (sig_var + noise_var); x_hat = a * Y',
          'mse_sim = ((X - x_hat)**2).mean()',
        ]}
        recruiter={[
          'Signal/noise model + MMSE linear estimation',
          'Empirical MSE vs theoretical MSE comparison',
          'Interactive variance sliders for intuition',
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
    borderColor: colors.sky,
  },
  sliderRow: { marginBottom: spacing.sm },
  sliderLabel: { color: colors.black, fontWeight: typography.weights.semibold },
  sliderBtns: { flexDirection: 'row', gap: spacing.sm },
  miniBtn: { flex: 1, paddingVertical: spacing.sm },
  switchRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: spacing.sm },
  switchLabel: { color: colors.charcoal },
  input: {
    borderWidth: 2,
    borderColor: colors.hotPink,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.sm,
    backgroundColor: colors.cream,
  },
  truth: { marginTop: spacing.md, gap: spacing.xs },
  tableTitle: { fontWeight: typography.weights.bold, color: colors.purple, marginTop: spacing.lg },
  tableRow: { fontFamily: 'monospace', fontSize: typography.sizes.xs, color: colors.charcoal },
});
