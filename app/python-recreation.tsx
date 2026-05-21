import { Text, StyleSheet } from 'react-native';
import { ScreenShell } from '@/src/components/ScreenShell';
import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';

const WEEKS = [
  { week: 1, focus: 'Python classes & game objects' },
  { week: 2, focus: 'Flutter Flight in pygame' },
  { week: 3, focus: 'Larva Leaf Race grid algorithms' },
  { week: 4, focus: 'Pupa Math Boost + score analytics (pandas/matplotlib)' },
];

export default function PythonRecreationScreen() {
  return (
    <ScreenShell>
      <Text style={styles.heading}>Python Recreation Guide</Text>
      <Text style={styles.body}>
        Yasmine can rebuild every game engine in Python. The full guide lives in
        docs/PYTHON_RECREATION_GUIDE.md in this repository.
      </Text>
      <Text style={styles.sectionTitle}>4-week path (summary)</Text>
      {WEEKS.map((w) => (
        <Text key={w.week} style={styles.week}>
          Week {w.week}: {w.focus}
        </Text>
      ))}
      <Text style={styles.sectionTitle}>Recommended stack</Text>
      <Text style={styles.bullet}>• pygame — games</Text>
      <Text style={styles.bullet}>• tkinter — simple UI</Text>
      <Text style={styles.bullet}>• pandas — score logs</Text>
      <Text style={styles.bullet}>• matplotlib — progress charts</Text>
      <Text style={styles.tip}>
        Game logic in src/games/*/engine.ts mirrors what you will write in Python classes.
      </Text>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
    color: colors.hotPink,
  },
  body: { color: colors.black, lineHeight: 24, marginVertical: spacing.md },
  sectionTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.purple,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  week: { color: colors.charcoal, marginVertical: spacing.xs, lineHeight: 22 },
  bullet: { color: colors.charcoal, lineHeight: 24 },
  tip: {
    marginTop: spacing.xl,
    fontStyle: 'italic',
    color: colors.hotPinkDark,
    lineHeight: 22,
  },
});
