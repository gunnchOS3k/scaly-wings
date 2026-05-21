import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';

interface ProgressMetamorphosisProps {
  progress: number; // 0–100
  stage: 'larva' | 'pupa' | 'butterfly';
}

const STAGES = [
  { key: 'larva', label: 'Larva', emoji: '🐛' },
  { key: 'pupa', label: 'Pupa', emoji: '🫛' },
  { key: 'butterfly', label: 'Butterfly', emoji: '🦋' },
] as const;

export function ProgressMetamorphosis({ progress, stage }: ProgressMetamorphosisProps) {
  return (
    <View style={styles.wrap}>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${Math.min(100, Math.max(0, progress))}%` }]} />
      </View>
      <View style={styles.labels}>
        {STAGES.map((s) => (
          <Text
            key={s.key}
            style={[styles.stageLabel, stage === s.key && styles.stageActive]}
          >
            {s.emoji} {s.label}
          </Text>
        ))}
      </View>
      <Text style={styles.percent}>{Math.round(progress)}% transformed</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginVertical: spacing.md },
  track: {
    height: 14,
    backgroundColor: colors.creamDark,
    borderRadius: 8,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: colors.hotPink,
    borderRadius: 8,
  },
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
  },
  stageLabel: { fontSize: typography.sizes.xs, color: colors.charcoal },
  stageActive: { color: colors.hotPink, fontWeight: typography.weights.bold },
  percent: {
    textAlign: 'center',
    marginTop: spacing.sm,
    color: colors.purple,
    fontWeight: typography.weights.semibold,
  },
});
