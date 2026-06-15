import { useEffect, useState } from 'react';
import { Text, StyleSheet, Switch, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ScreenShell } from '@/src/components/ScreenShell';
import { LanguageSwitcher } from '@/src/components/LanguageSwitcher';
import { HotPinkButton } from '@/src/components/HotPinkButton';
import { LocalizedText } from '@/src/components/LocalizedText';
import { LanguageBadge } from '@/src/components/LanguageBadge';
import { DEFAULT_SETTINGS, type AppSettings } from '@/src/data/settingsOptions';
import { loadSettings, saveSettings } from '@/src/storage/settingsStorage';
import { useLanguage } from '@/src/i18n/useLanguage';
import { getLanguageMeta } from '@/src/i18n/languages';
import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';

function ToggleRow({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Switch value={value} onValueChange={onChange} trackColor={{ true: colors.hotPink }} />
    </View>
  );
}

export default function SettingsScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { currentLanguage, deviceLanguage, savedLanguage, resetLanguage } = useLanguage();
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    loadSettings().then(setSettings);
  }, []);

  const update = <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
    const next = { ...settings, [key]: value };
    setSettings(next);
    saveSettings(next);
  };

  return (
    <ScreenShell>
      <LocalizedText i18nKey="settings.title" style={styles.title} />

      <LocalizedText i18nKey="settings.languageSection" style={styles.section} />
      <LanguageSwitcher />
      <Text style={styles.note}>
        {t('settings.currentLanguage')}: {getLanguageMeta(currentLanguage).nativeName}
      </Text>
      <Text style={styles.note}>
        {t('settings.deviceLanguage')}: {getLanguageMeta(deviceLanguage).nativeName}
        {savedLanguage ? '' : ' (active)'}
      </Text>
      <LanguageBadge code={currentLanguage} />
      <Text style={styles.note}>{t('settings.arabicRtlNote')}</Text>
      <Text style={styles.note}>{t('settings.draftReviewNote')}</Text>
      <HotPinkButton label={t('settings.resetToDevice')} variant="secondary" onPress={resetLanguage} />
      <HotPinkButton
        label={t('settings.languageTest')}
        variant="secondary"
        onPress={() => router.push('/language-test' as never)}
      />

      <LocalizedText i18nKey="settings.preferredMode" style={styles.section} />
      {(['phone', 'tabletop', 'cocoonConsole'] as const).map((m) => (
        <ToggleRow
          key={m}
          label={t(`settings.modes.${m}`)}
          value={settings.preferredMode === m}
          onChange={(on) => on && update('preferredMode', m)}
        />
      ))}
      <LocalizedText i18nKey="settings.accessibility" style={styles.section} />
      <ToggleRow
        label={t('settings.reducedMotion')}
        value={settings.reducedMotion}
        onChange={(v) => update('reducedMotion', v)}
      />
      <ToggleRow
        label={t('settings.highContrast')}
        value={settings.highContrast}
        onChange={(v) => update('highContrast', v)}
      />
      <LocalizedText i18nKey="settings.panels" style={styles.section} />
      <ToggleRow
        label={t('settings.showLearningPanels')}
        value={settings.showLearningPanels}
        onChange={(v) => update('showLearningPanels', v)}
      />
      <ToggleRow
        label={t('settings.showRecruiterPanels')}
        value={settings.showRecruiterPanels}
        onChange={(v) => update('showRecruiterPanels', v)}
      />
      <ToggleRow
        label={t('settings.inputDebug')}
        value={settings.inputDebugOverlay}
        onChange={(v) => update('inputDebugOverlay', v)}
      />
      <ToggleRow
        label={t('settings.haptics')}
        value={settings.hapticsPlaceholder}
        onChange={(v) => update('hapticsPlaceholder', v)}
      />
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
    color: colors.hotPink,
    marginBottom: spacing.lg,
  },
  section: {
    fontWeight: typography.weights.bold,
    color: colors.purple,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  note: {
    color: colors.charcoal,
    fontSize: typography.sizes.sm,
    lineHeight: 20,
    marginBottom: spacing.xs,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.creamDark,
  },
  rowLabel: { color: colors.black, fontSize: typography.sizes.md, flex: 1, marginEnd: spacing.sm },
});
