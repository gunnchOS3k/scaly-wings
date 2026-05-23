import { Text, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenShell } from '@/src/components/ScreenShell';
import { ArcadeGameCard } from '@/src/components/ArcadeGameCard';
import { ARCADE_GAMES } from '@/src/data/arcadeCatalog';
import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';

const SECTIONS = [
  { key: 'core', title: 'Core Arcade' },
  { key: 'probability', title: 'Probability Wing' },
  { key: 'console', title: 'Console Arcade' },
  { key: 'tools', title: 'System Tools' },
] as const;

export default function ArcadeScreen() {
  const router = useRouter();

  return (
    <ScreenShell>
      <Text style={styles.heading}>Butterfly Arcade</Text>
      <Text style={styles.sub}>Touch · keyboard · controller-ready</Text>
      {SECTIONS.map((sec) => {
        const games = ARCADE_GAMES.filter((g) => g.section === sec.key);
        if (games.length === 0) return null;
        return (
          <View key={sec.key}>
            <Text style={styles.section}>{sec.title}</Text>
            {games.map((g) => (
              <ArcadeGameCard
                key={g.route}
                entry={g}
                onPress={() => router.push(g.route as never)}
              />
            ))}
          </View>
        );
      })}
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
  section: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.purple,
    marginBottom: spacing.sm,
    marginTop: spacing.md,
  },
});
