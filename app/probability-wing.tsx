import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ScreenShell } from '@/src/components/ScreenShell';
import { GameCard } from '@/src/components/GameCard';
import { ButterflyMascot } from '@/src/components/ButterflyMascot';
import { LocalizedText } from '@/src/components/LocalizedText';
import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';

const PROB_GAME_KEYS = [
  {
    titleKey: 'probability.games.chanceGarden.title',
    descriptionKey: 'probability.games.chanceGarden.description',
    emoji: '🌸',
    route: '/games/probability-wing/chance-garden' as const,
  },
  {
    titleKey: 'probability.games.noiseNectar.title',
    descriptionKey: 'probability.games.noiseNectar.description',
    emoji: '🌬️',
    route: '/games/probability-wing/noise-nectar' as const,
  },
  {
    titleKey: 'probability.games.poissonPond.title',
    descriptionKey: 'probability.games.poissonPond.description',
    emoji: '🪷',
    route: '/games/probability-wing/poisson-pond' as const,
  },
];

export default function ProbabilityWingScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <ScreenShell>
      <View style={styles.hero}>
        <ButterflyMascot size={72} />
        <LocalizedText i18nKey="probability.fullTitle" style={styles.title} center />
        <LocalizedText i18nKey="probability.learnSubtitle" style={styles.subtitle} center />
      </View>
      <View style={styles.disclaimer}>
        <LocalizedText i18nKey="probability.disclaimer" style={styles.disclaimerText} />
      </View>
      <LocalizedText i18nKey="probability.mathGarden" style={styles.section} />
      {PROB_GAME_KEYS.map((g) => (
        <GameCard
          key={g.route}
          title={t(g.titleKey)}
          description={t(g.descriptionKey)}
          emoji={g.emoji}
          onPress={() => router.push(g.route)}
        />
      ))}
      <LocalizedText i18nKey="probability.docsHint" style={styles.docsHint} />
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  hero: { alignItems: 'center', marginBottom: spacing.md },
  title: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.hotPink,
    marginTop: spacing.sm,
  },
  subtitle: {
    fontSize: typography.sizes.md,
    color: colors.black,
    marginTop: spacing.sm,
    lineHeight: 22,
  },
  disclaimer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.md,
    borderStartWidth: 4,
    borderStartColor: colors.purple,
    marginBottom: spacing.lg,
  },
  disclaimerText: { color: colors.charcoal, lineHeight: 20, fontSize: typography.sizes.sm },
  section: {
    fontWeight: typography.weights.bold,
    color: colors.purple,
    marginBottom: spacing.md,
  },
  docsHint: {
    marginTop: spacing.lg,
    fontSize: typography.sizes.xs,
    color: colors.charcoal,
    lineHeight: 18,
  },
});
