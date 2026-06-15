import { Text, StyleSheet } from 'react-native';
import { getLanguageMeta } from '@/src/i18n/languages';
import type { LanguageCode } from '@/src/i18n/types';
import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';

interface LanguageBadgeProps {
  code: LanguageCode;
  showReview?: boolean;
}

export function LanguageBadge({ code, showReview = true }: LanguageBadgeProps) {
  const meta = getLanguageMeta(code);
  const needsReview = meta.status === 'draft-human-review-required';

  return (
    <Text style={styles.badge}>
      {meta.nativeName}
      {showReview && needsReview ? ` · ${meta.reviewer}` : ''}
    </Text>
  );
}

const styles = StyleSheet.create({
  badge: {
    fontSize: typography.sizes.xs,
    color: colors.purple,
    backgroundColor: colors.cream,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: 8,
    overflow: 'hidden',
    alignSelf: 'flex-start',
  },
});
