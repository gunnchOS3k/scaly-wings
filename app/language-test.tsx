import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ScreenShell } from '@/src/components/ScreenShell';
import { LanguageSwitcher } from '@/src/components/LanguageSwitcher';
import { HotPinkButton } from '@/src/components/HotPinkButton';
import { LocalizedText } from '@/src/components/LocalizedText';
import { useLanguage } from '@/src/i18n/useLanguage';
import { getLanguageMeta, supportedLanguages } from '@/src/i18n/languages';
import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';

const SAMPLE_KEYS = [
  'language.sampleHello',
  'home.playArcade',
  'games.start',
  'games.gameOver',
  'probability.concepts.expectedValue',
];

export default function LanguageTestScreen() {
  const { t } = useTranslation();
  const { currentLanguage, languageDirection, deviceLanguage, savedLanguage } = useLanguage();

  return (
    <ScreenShell>
      <LocalizedText i18nKey="languageTest.title" style={styles.title} />
      <Text style={styles.row}>
        {t('languageTest.currentLanguage')}: {getLanguageMeta(currentLanguage).nativeName}
      </Text>
      <Text style={styles.row}>
        {t('languageTest.direction')}: {languageDirection}
      </Text>
      <Text style={styles.row}>
        {t('languageTest.deviceLocale')}: {getLanguageMeta(deviceLanguage).nativeName}
      </Text>
      <Text style={styles.row}>
        {t('languageTest.savedLanguage')}:{' '}
        {savedLanguage ? getLanguageMeta(savedLanguage).nativeName : '(device default)'}
      </Text>

      <LanguageSwitcher />

      <LocalizedText i18nKey="languageTest.sampleBlock" style={styles.section} />
      {supportedLanguages.map((lang) => (
        <View key={lang.code} style={styles.sampleBlock}>
          <Text style={styles.langLabel}>{lang.nativeName}</Text>
          <Text style={[styles.sampleText, lang.direction === 'rtl' && styles.rtlText]}>
            {t('language.sampleHello', { lng: lang.code })}
          </Text>
        </View>
      ))}

      <LocalizedText i18nKey="languageTest.rtlSample" style={styles.section} />
      <Text style={[styles.rtlBlock, styles.rtlText]}>
        {t('language.sampleHello', { lng: 'ar' })}
      </Text>
      <Text style={styles.rtlBlock}>{t('home.subtitle', { lng: 'ar' })}</Text>

      <LocalizedText i18nKey="languageTest.buttonsSample" style={styles.section} />
      {SAMPLE_KEYS.map((key) => (
        <HotPinkButton key={key} label={t(key)} variant="secondary" onPress={() => {}} />
      ))}

      <LocalizedText i18nKey="languageTest.missingKeyTest" style={styles.section} />
      <Text style={styles.row}>{t('languageTest.missingKeyLabel')}</Text>
      <Text style={styles.fallback}>{t('this.key.does.not.exist')}</Text>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
    color: colors.hotPink,
    marginBottom: spacing.md,
  },
  row: { color: colors.charcoal, marginBottom: spacing.xs, lineHeight: 22 },
  section: {
    fontWeight: typography.weights.bold,
    color: colors.purple,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  sampleBlock: {
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.sm,
  },
  langLabel: { fontWeight: typography.weights.semibold, color: colors.hotPink },
  sampleText: { color: colors.black, marginTop: spacing.xs },
  rtlText: { writingDirection: 'rtl', textAlign: 'right' },
  rtlBlock: {
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.sm,
    color: colors.black,
    lineHeight: 24,
  },
  fallback: { color: colors.charcoal, fontStyle: 'italic' },
});
