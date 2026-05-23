import { View, Text, Pressable, StyleSheet } from 'react-native';
import type { ArcadeEntry } from '@/src/data/arcadeCatalog';
import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';

const BADGE_LABELS: Record<string, string> = {
  touch: 'Touch',
  keyboard: 'Keyboard',
  controller: 'Controller',
  multiplayer: 'Local MP',
  bigScreen: 'Big Screen',
};

interface ArcadeGameCardProps {
  entry: ArcadeEntry;
  onPress: () => void;
}

export function ArcadeGameCard({ entry, onPress }: ArcadeGameCardProps) {
  const activeBadges = Object.entries(entry.badges)
    .filter(([, v]) => v)
    .map(([k]) => BADGE_LABELS[k] ?? k);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      accessibilityRole="button"
      accessibilityLabel={`Play ${entry.title}`}
    >
      <Text style={styles.emoji}>{entry.emoji}</Text>
      <View style={styles.textBlock}>
        <Text style={styles.title}>{entry.title}</Text>
        <Text style={styles.description}>{entry.description}</Text>
        <View style={styles.badges}>
          {activeBadges.map((b) => (
            <Text key={b} style={styles.badge}>
              {b}
            </Text>
          ))}
        </View>
        <View style={styles.skills}>
          {entry.skills.map((s) => (
            <Text key={s} style={styles.skill}>
              {s}
            </Text>
          ))}
        </View>
      </View>
      <Text style={styles.chevron}>›</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderLeftWidth: 6,
    borderLeftColor: colors.hotPink,
  },
  pressed: { opacity: 0.92 },
  emoji: { fontSize: 32, marginRight: spacing.md },
  textBlock: { flex: 1 },
  title: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.black,
  },
  description: {
    fontSize: typography.sizes.sm,
    color: colors.charcoal,
    marginTop: spacing.xs,
  },
  badges: { flexDirection: 'row', flexWrap: 'wrap', marginTop: spacing.sm, gap: spacing.xs },
  badge: {
    fontSize: typography.sizes.xs,
    backgroundColor: colors.cream,
    color: colors.purple,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: 6,
    overflow: 'hidden',
  },
  skills: { flexDirection: 'row', flexWrap: 'wrap', marginTop: spacing.xs, gap: spacing.xs },
  skill: {
    fontSize: typography.sizes.xs,
    color: colors.hotPinkDark,
    fontWeight: typography.weights.semibold,
  },
  chevron: { fontSize: 24, color: colors.hotPink, fontWeight: typography.weights.bold },
});
