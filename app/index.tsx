import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ScreenShell } from '@/src/components/ScreenShell';
import { ButterflyMascot } from '@/src/components/ButterflyMascot';
import { HotPinkButton } from '@/src/components/HotPinkButton';
import { LanguageSwitcher } from '@/src/components/LanguageSwitcher';
import { LocalizedText } from '@/src/components/LocalizedText';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';
import { colors } from '@/src/theme/colors';

export default function HomeScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <ScreenShell>
      <LanguageSwitcher compact />
      <View style={styles.hero}>
        <ButterflyMascot size={100} />
        <LocalizedText i18nKey="home.title" style={styles.title} center />
        <LocalizedText i18nKey="home.subtitle" style={styles.subtitle} center />
        <LocalizedText i18nKey="home.credit" style={styles.credit} center />
      </View>
      <HotPinkButton label={t('home.playArcade')} onPress={() => router.push('/arcade')} />
      <HotPinkButton label={t('home.probabilityWing')} onPress={() => router.push('/probability-wing')} />
      <HotPinkButton
        label={t('home.cocoonConsole')}
        variant="secondary"
        onPress={() => router.push('/cocoon-console')}
      />
      <HotPinkButton
        label={t('home.aboutYasmine')}
        variant="secondary"
        onPress={() => router.push('/about-yasmine')}
      />
      <HotPinkButton label={t('home.portfolio')} variant="secondary" onPress={() => router.push('/portfolio')} />
      <HotPinkButton
        label={t('home.pythonGuide')}
        variant="secondary"
        onPress={() => router.push('/python-recreation')}
      />
      <HotPinkButton label={t('home.publishing')} variant="secondary" onPress={() => router.push('/publish')} />
      <HotPinkButton label={t('home.settings')} variant="secondary" onPress={() => router.push('/settings')} />
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  hero: { alignItems: 'center', marginBottom: spacing.xl },
  title: {
    fontSize: typography.sizes.hero,
    fontWeight: '700',
    color: colors.hotPink,
    marginTop: spacing.md,
  },
  subtitle: {
    fontSize: typography.sizes.lg,
    color: colors.black,
    marginTop: spacing.sm,
    lineHeight: 28,
  },
  credit: {
    fontSize: typography.sizes.sm,
    color: colors.charcoal,
    marginTop: spacing.md,
  },
});
