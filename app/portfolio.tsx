import { StyleSheet } from 'react-native';
import { ScreenShell } from '@/src/components/ScreenShell';
import { PortfolioCard } from '@/src/components/PortfolioCard';
import { LocalizedText } from '@/src/components/LocalizedText';
import { portfolioProjects } from '@/src/data/portfolioProjects';
import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';

export default function PortfolioScreen() {
  const sorted = [...portfolioProjects].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

  return (
    <ScreenShell>
      <LocalizedText i18nKey="portfolio.title" style={styles.heading} />
      <LocalizedText i18nKey="portfolio.subtitle" style={styles.sub} />
      <LocalizedText i18nKey="portfolio.languagesTitle" style={styles.languagesTitle} />
      <LocalizedText i18nKey="portfolio.languagesList" style={styles.languagesList} />
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
  sub: { color: colors.charcoal, marginBottom: spacing.md, lineHeight: 22 },
  languagesTitle: {
    fontWeight: typography.weights.bold,
    color: colors.purple,
    marginTop: spacing.sm,
  },
  languagesList: { color: colors.charcoal, marginBottom: spacing.lg, lineHeight: 22 },
});
