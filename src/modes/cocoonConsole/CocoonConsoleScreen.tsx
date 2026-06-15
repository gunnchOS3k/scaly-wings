import { useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ScreenShell } from '@/src/components/ScreenShell';
import { HotPinkButton } from '@/src/components/HotPinkButton';
import { LocalizedText } from '@/src/components/LocalizedText';
import { getAssignmentSummary, assignControllerToPlayer } from './controllerAssignment';
import { inputManager } from '@/src/input/InputManager';
import { ARCADE_GAMES } from '@/src/data/arcadeCatalog';
import type { DisplayMode } from './types';
import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';

const DISPLAY_MODES: { id: DisplayMode; titleKey: string; descKey: string }[] = [
  { id: 'handheld', titleKey: 'cocoon.handheld', descKey: 'cocoon.handheldDesc' },
  { id: 'tabletop', titleKey: 'cocoon.tabletop', descKey: 'cocoon.tabletopDesc' },
  { id: 'bigScreen', titleKey: 'cocoon.bigScreen', descKey: 'cocoon.bigScreenDesc' },
];

const CONSOLE_GAMES = ARCADE_GAMES.filter((g) => g.badges.controller || g.badges.bigScreen);

export function CocoonConsoleScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const [mode, setMode] = useState<DisplayMode>('handheld');
  const [assignments, setAssignments] = useState<string[]>([]);

  const refresh = () => {
    inputManager.init();
    setAssignments(getAssignmentSummary());
  };

  const pads = inputManager.listGamepads();
  const steps = t('cocoon.bigScreenSteps', { returnObjects: true }) as string[];

  return (
    <ScreenShell>
      <LocalizedText i18nKey="cocoon.title" style={styles.title} />
      <LocalizedText i18nKey="cocoon.subtitle" style={styles.sub} />

      {DISPLAY_MODES.map((m) => (
        <HotPinkButton
          key={m.id}
          label={`${t(m.titleKey)}${mode === m.id ? ' ✓' : ''}`}
          variant={mode === m.id ? 'primary' : 'secondary'}
          onPress={() => setMode(m.id)}
        />
      ))}

      <Text style={styles.body}>
        {t(DISPLAY_MODES.find((d) => d.id === mode)?.descKey ?? 'cocoon.handheldDesc')}
      </Text>

      {mode === 'bigScreen' && (
        <View style={styles.box}>
          <LocalizedText i18nKey="cocoon.bigScreenPlaybook" style={styles.boxTitle} />
          {Array.isArray(steps) &&
            steps.map((s) => (
              <Text key={s} style={styles.step}>
                • {s}
              </Text>
            ))}
          <LocalizedText i18nKey="cocoon.bigScreenNote" style={styles.note} />
        </View>
      )}

      <LocalizedText i18nKey="cocoon.localMultiplayer" style={styles.section} />
      <HotPinkButton label={t('cocoon.refreshControllers')} variant="secondary" onPress={refresh} />
      {pads.map((gp) => (
        <View key={gp.index} style={styles.row}>
          <Text style={styles.rowText}>{gp.label}</Text>
          <HotPinkButton
            label="P1"
            variant="secondary"
            onPress={() => {
              assignControllerToPlayer(1, gp.index);
              refresh();
            }}
            style={styles.mini}
          />
          <HotPinkButton
            label="P2"
            variant="secondary"
            onPress={() => {
              assignControllerToPlayer(2, gp.index);
              refresh();
            }}
            style={styles.mini}
          />
        </View>
      ))}
      {assignments.map((a) => (
        <Text key={a} style={styles.assign}>
          {a}
        </Text>
      ))}

      <LocalizedText i18nKey="cocoon.supportedGames" style={styles.section} />
      {CONSOLE_GAMES.map((g) => (
        <HotPinkButton
          key={g.route}
          label={t(g.titleKey)}
          variant="secondary"
          onPress={() => router.push(g.route as never)}
        />
      ))}

      <HotPinkButton label={t('nav.controllerTest')} onPress={() => router.push('/controller-test')} />
      <HotPinkButton label={t('nav.settings')} variant="secondary" onPress={() => router.push('/settings')} />
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
    color: colors.hotPink,
  },
  sub: { color: colors.charcoal, marginVertical: spacing.md, lineHeight: 22 },
  body: { color: colors.black, marginBottom: spacing.lg },
  box: {
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.lg,
  },
  boxTitle: { fontWeight: typography.weights.bold, color: colors.purple },
  step: { color: colors.charcoal, marginTop: spacing.xs },
  note: { marginTop: spacing.md, fontSize: typography.sizes.sm, color: colors.hotPinkDark },
  section: {
    fontWeight: typography.weights.bold,
    color: colors.purple,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.sm },
  rowText: { flex: 1, color: colors.black },
  mini: { paddingVertical: spacing.xs },
  assign: { color: colors.charcoal, fontSize: typography.sizes.sm },
});
