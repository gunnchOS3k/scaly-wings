import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ScreenShell } from '@/src/components/ScreenShell';
import { LocalizedText } from '@/src/components/LocalizedText';
import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';

export default function PythonRecreationScreen() {
  const { t } = useTranslation();

  return (
    <ScreenShell>
      <LocalizedText i18nKey="python.title" style={styles.heading} />
      <LocalizedText i18nKey="python.body" style={styles.body} />
      <LocalizedText i18nKey="python.weekPath" style={styles.sectionTitle} />
      <LocalizedText i18nKey="python.week1" style={styles.week} />
      <LocalizedText i18nKey="python.week2" style={styles.week} />
      <LocalizedText i18nKey="python.week3" style={styles.week} />
      <LocalizedText i18nKey="python.week4" style={styles.week} />
      <LocalizedText i18nKey="python.recommendedStack" style={styles.sectionTitle} />
      <LocalizedText i18nKey="python.pygame" style={styles.bullet} />
      <LocalizedText i18nKey="python.tkinter" style={styles.bullet} />
      <LocalizedText i18nKey="python.pandas" style={styles.bullet} />
      <LocalizedText i18nKey="python.matplotlib" style={styles.bullet} />
      <LocalizedText i18nKey="python.tip" style={styles.tip} />
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
