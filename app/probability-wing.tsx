import { Text, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenShell } from '@/src/components/ScreenShell';
import { GameCard } from '@/src/components/GameCard';
import { ButterflyMascot } from '@/src/components/ButterflyMascot';
import { probabilityWingMeta } from '@/src/data/probabilityTopics';
import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';

const PROB_GAMES = [
  {
    title: 'Butterfly Chance Garden',
    description: 'Pollen tokens, PMF, expected value, variance, law of large numbers.',
    emoji: '🌸',
    route: '/games/probability-wing/chance-garden' as const,
  },
  {
    title: 'Noise Nectar Rescue',
    description: 'Hidden nectar, noisy sensors, MMSE estimation, MSE tracking.',
    emoji: '🌬️',
    route: '/games/probability-wing/noise-nectar' as const,
  },
  {
    title: 'Poisson Pond Crossing',
    description: 'λ-driven arrivals, exponential waits, crossing simulations.',
    emoji: '🪷',
    route: '/games/probability-wing/poisson-pond' as const,
  },
];

export default function ProbabilityWingScreen() {
  const router = useRouter();

  return (
    <ScreenShell>
      <View style={styles.hero}>
        <ButterflyMascot size={72} />
        <Text style={styles.title}>{probabilityWingMeta.title}</Text>
        <Text style={styles.subtitle}>{probabilityWingMeta.subtitle}</Text>
      </View>
      <View style={styles.disclaimer}>
        <Text style={styles.disclaimerText}>{probabilityWingMeta.disclaimer}</Text>
      </View>
      <Text style={styles.section}>Math Garden — three mini-labs</Text>
      {PROB_GAMES.map((g) => (
        <GameCard
          key={g.route}
          title={g.title}
          description={g.description}
          emoji={g.emoji}
          onPress={() => router.push(g.route)}
        />
      ))}
      <Text style={styles.docsHint}>
        Syllabus mapping: docs/PROBABILITY_TO_GAME_MECHANICS.md · Python: docs/PYTHON_PROBABILITY_RECREATION_GUIDE.md
      </Text>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  hero: { alignItems: 'center', marginBottom: spacing.md },
  title: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.hotPink,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  subtitle: {
    fontSize: typography.sizes.md,
    color: colors.black,
    textAlign: 'center',
    marginTop: spacing.sm,
    lineHeight: 22,
  },
  disclaimer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: colors.purple,
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
