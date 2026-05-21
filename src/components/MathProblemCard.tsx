import { View, Text, StyleSheet } from 'react-native';
import type { MathProblem } from '@/src/games/pupa-math-boost/types';
import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';

interface MathProblemCardProps {
  problem: MathProblem;
  level: string;
}

export function MathProblemCard({ problem, level }: MathProblemCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.level}>{level.toUpperCase()}</Text>
      <Text style={styles.prompt}>{problem.prompt}</Text>
      {problem.hint ? <Text style={styles.hint}>Hint: {problem.hint}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: spacing.lg,
    borderWidth: 2,
    borderColor: colors.purpleLight,
  },
  level: {
    color: colors.hotPink,
    fontWeight: typography.weights.bold,
    fontSize: typography.sizes.xs,
    marginBottom: spacing.sm,
  },
  prompt: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.semibold,
    color: colors.black,
    textAlign: 'center',
  },
  hint: {
    marginTop: spacing.md,
    fontSize: typography.sizes.sm,
    color: colors.charcoal,
    textAlign: 'center',
  },
});
