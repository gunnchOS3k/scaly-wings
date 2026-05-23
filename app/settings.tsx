import { useEffect, useState } from 'react';
import { Text, StyleSheet, Switch, View } from 'react-native';
import { ScreenShell } from '@/src/components/ScreenShell';
import { DEFAULT_SETTINGS, type AppSettings } from '@/src/data/settingsOptions';
import { loadSettings, saveSettings } from '@/src/storage/settingsStorage';
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
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.section}>Preferred mode</Text>
      {(['phone', 'tabletop', 'cocoonConsole'] as const).map((m) => (
        <ToggleRow
          key={m}
          label={m}
          value={settings.preferredMode === m}
          onChange={(on) => on && update('preferredMode', m)}
        />
      ))}
      <Text style={styles.section}>Accessibility</Text>
      <ToggleRow
        label="Reduced motion"
        value={settings.reducedMotion}
        onChange={(v) => update('reducedMotion', v)}
      />
      <ToggleRow
        label="High contrast"
        value={settings.highContrast}
        onChange={(v) => update('highContrast', v)}
      />
      <Text style={styles.section}>Panels</Text>
      <ToggleRow
        label="Show learning panels"
        value={settings.showLearningPanels}
        onChange={(v) => update('showLearningPanels', v)}
      />
      <ToggleRow
        label="Show recruiter panels"
        value={settings.showRecruiterPanels}
        onChange={(v) => update('showRecruiterPanels', v)}
      />
      <ToggleRow
        label="Input debug overlay"
        value={settings.inputDebugOverlay}
        onChange={(v) => update('inputDebugOverlay', v)}
      />
      <ToggleRow
        label="Haptics (placeholder)"
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.creamDark,
  },
  rowLabel: { color: colors.black, fontSize: typography.sizes.md },
});
