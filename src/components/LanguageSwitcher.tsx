import { View, Text, Pressable, StyleSheet, Alert } from 'react-native';
import { useLanguage } from '@/src/i18n/useLanguage';
import { getLanguageMeta } from '@/src/i18n/languages';
import type { LanguageCode } from '@/src/i18n/types';
import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';

interface LanguageSwitcherProps {
  compact?: boolean;
}

export function LanguageSwitcher({ compact = false }: LanguageSwitcherProps) {
  const { currentLanguage, setLanguage, supportedLanguages, t } = useLanguage();

  const onSelect = async (code: LanguageCode) => {
    if (code === currentLanguage) return;
    await setLanguage(code);
    if (code === 'ar') {
      Alert.alert(
        getLanguageMeta('ar').nativeName,
        t('language.rtlRestartMessage')
      );
    }
  };

  return (
    <View style={[styles.wrap, compact && styles.wrapCompact]}>
      {!compact && <Text style={styles.label}>{t('language.choose')}</Text>}
      <View style={styles.row}>
        {supportedLanguages.map((lang) => {
          const active = lang.code === currentLanguage;
          const draft = lang.status === 'draft-human-review-required';
          return (
            <Pressable
              key={lang.code}
              onPress={() => onSelect(lang.code)}
              style={({ pressed }) => [
                styles.chip,
                active && styles.chipActive,
                lang.direction === 'rtl' && styles.chipRtl,
                pressed && styles.chipPressed,
              ]}
              accessibilityRole="button"
              accessibilityLabel={`${lang.nativeName} ${lang.englishName}`}
            >
              <Text style={[styles.chipText, active && styles.chipTextActive, lang.code === 'ar' && styles.arabicText]}>
                {lang.nativeName}
              </Text>
              {draft && (
                <Text style={styles.reviewTag}>{t('language.reviewNeeded')}</Text>
              )}
            </Pressable>
          );
        })}
      </View>
      <Text style={styles.current}>
        {t('settings.currentLanguage')}: {getLanguageMeta(currentLanguage).nativeName}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: spacing.lg },
  wrapCompact: { marginBottom: spacing.sm },
  label: {
    fontWeight: typography.weights.bold,
    color: colors.purple,
    marginBottom: spacing.sm,
    fontSize: typography.sizes.md,
  },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  chip: {
    minHeight: 44,
    minWidth: 88,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 12,
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.creamDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipActive: {
    borderColor: colors.hotPink,
    backgroundColor: colors.hotPinkLight,
  },
  chipRtl: {},
  chipPressed: { opacity: 0.9 },
  chipText: {
    color: colors.black,
    fontWeight: typography.weights.semibold,
    fontSize: typography.sizes.sm,
  },
  chipTextActive: { color: colors.hotPinkDark },
  arabicText: { writingDirection: 'rtl' },
  reviewTag: {
    fontSize: typography.sizes.xs,
    color: colors.charcoal,
    marginTop: 2,
  },
  current: {
    marginTop: spacing.sm,
    color: colors.charcoal,
    fontSize: typography.sizes.sm,
  },
});
