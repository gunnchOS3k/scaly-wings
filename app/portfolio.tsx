import { Text, StyleSheet } from 'react-native';
import { ScreenShell } from '@/src/components/ScreenShell';
import { PortfolioCard } from '@/src/components/PortfolioCard';
import { portfolioProjects } from '@/src/data/portfolioProjects';
import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';

export default function PortfolioScreen() {
  const sorted = [...portfolioProjects].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

  return (
    <ScreenShell>
      <Text style={styles.heading}>Portfolio</Text>
      <Text style={styles.sub}>
        Featured work and collaborations. FINDS is listed as inspiration only — it lives in its
        own repository.
      </Text>
      {sorted.map((project) => (
        <PortfolioCard key={project.id} project={project} />
      ))}
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
    color: colors.hotPink,
  },
  sub: { color: colors.charcoal, marginBottom: spacing.lg, lineHeight: 22 },
});
