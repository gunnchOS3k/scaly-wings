import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';

interface GameCardProps {
  title: string;
  description: string;
  emoji: string;
  onPress: () => void;
}

export function GameCard({ title, description, emoji, onPress }: GameCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      accessibilityRole="button"
      accessibilityLabel={`Play ${title}`}
    >
      <Text style={styles.emoji} accessibilityElementsHidden>
        {emoji}
      </Text>
      <View style={styles.textBlock}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <Text style={styles.chevron}>›</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderLeftWidth: 6,
    borderLeftColor: colors.hotPink,
    shadowColor: colors.black,
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  pressed: { opacity: 0.92 },
  emoji: { fontSize: 36, marginRight: spacing.md },
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
  chevron: {
    fontSize: 28,
    color: colors.hotPink,
    fontWeight: typography.weights.bold,
  },
});
