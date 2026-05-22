import { Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenShell } from '@/src/components/ScreenShell';
import { GameCard } from '@/src/components/GameCard';
import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';

const GAMES = [
  {
    title: 'Flutter Flight',
    description: 'Flap through glowing gates. Game loop + collision demo.',
    emoji: '🦋',
    route: '/games/flutter-flight' as const,
  },
  {
    title: 'Larva Leaf Race',
    description: 'Two larva, one device. Grid eating + timer multiplayer.',
    emoji: '🐛',
    route: '/games/larva-leaf-race' as const,
  },
  {
    title: 'Pupa Math Boost',
    description: 'Correct answers speed metamorphosis. Math + progress UI.',
    emoji: '📐',
    route: '/games/pupa-math-boost' as const,
  },
];

export default function ArcadeScreen() {
  const router = useRouter();

  return (
    <ScreenShell>
      <Text style={styles.heading}>Butterfly Arcade</Text>
      <Text style={styles.sub}>Starter games + probability wing</Text>
      <GameCard
        title="Probability Wing"
        description="Chance, noise & stochastic flight — Yasmine's probability course."
        emoji="📊"
        onPress={() => router.push('/probability-wing')}
      />
      {GAMES.map((g) => (
        <GameCard
          key={g.route}
          title={g.title}
          description={g.description}
          emoji={g.emoji}
          onPress={() => router.push(g.route)}
        />
      ))}
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
    color: colors.hotPink,
    marginBottom: spacing.sm,
  },
  sub: { color: colors.charcoal, marginBottom: spacing.lg },
});
