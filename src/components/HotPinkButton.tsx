import { Pressable, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';

interface HotPinkButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  style?: ViewStyle;
  accessibilityHint?: string;
}

export function HotPinkButton({
  label,
  onPress,
  variant = 'primary',
  style,
  accessibilityHint,
}: HotPinkButtonProps) {
  const isPrimary = variant === 'primary';
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        isPrimary ? styles.primary : styles.secondary,
        pressed && styles.pressed,
        style,
      ]}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityHint={accessibilityHint}
    >
      <Text style={[styles.label, isPrimary ? styles.labelPrimary : styles.labelSecondary]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: spacing.touchMin,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing.sm,
  },
  primary: {
    backgroundColor: colors.hotPink,
    shadowColor: colors.hotPinkDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
  secondary: {
    backgroundColor: colors.cream,
    borderWidth: 2,
    borderColor: colors.hotPink,
  },
  pressed: { opacity: 0.88, transform: [{ scale: 0.98 }] },
  label: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
  },
  labelPrimary: { color: colors.white },
  labelSecondary: { color: colors.hotPink },
});
