import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import type { ArcadeEntry } from '@/src/data/arcadeCatalog';
import { BADGE_KEYS } from '@/src/data/arcadeCatalog';
import { useLanguage } from '@/src/i18n/useLanguage';
import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';

interface ArcadeGameCardProps {
  entry: ArcadeEntry;
  onPress: () => void;
}

export function ArcadeGameCard({ entry, onPress }: ArcadeGameCardProps) {
  const { t } = useTranslation();
  const { textAlign } = useLanguage();
  const title = t(entry.titleKey);
  const activeBadges = Object.entries(entry.badges)
    .filter(([, v]) => v)
    .map(([k]) => t(BADGE_KEYS[k as keyof typeof BADGE_KEYS]));

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      accessibilityRole="button"
      accessibilityLabel={`Play ${title}`}
    >
      <Text style={styles.emoji}>{entry.emoji}</Text>
      <View style={styles.textBlock}>
        <Text style={[styles.title, { textAlign }]}>{title}</Text>
        <Text style={[styles.description, { textAlign }]}>{t(entry.descriptionKey)}</Text>
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
    borderStartWidth: 6,
    borderStartColor: colors.hotPink,
  },
  pressed: { opacity: 0.92 },
  emoji: { fontSize: 32, marginEnd: spacing.md },
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
