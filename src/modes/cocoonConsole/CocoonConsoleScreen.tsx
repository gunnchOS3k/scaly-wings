import { useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenShell } from '@/src/components/ScreenShell';
import { HotPinkButton } from '@/src/components/HotPinkButton';
import { DISPLAY_MODES, BIG_SCREEN_STEPS } from './displayModes';
import { getAssignmentSummary, assignControllerToPlayer } from './controllerAssignment';
import { inputManager } from '@/src/input/InputManager';
import { ARCADE_GAMES } from '@/src/data/arcadeCatalog';
import type { DisplayMode } from './types';
import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';

const CONSOLE_GAMES = ARCADE_GAMES.filter(
  (g) => g.badges.controller || g.badges.bigScreen
);

export function CocoonConsoleScreen() {
  const router = useRouter();
  const [mode, setMode] = useState<DisplayMode>('handheld');
  const [assignments, setAssignments] = useState<string[]>([]);

  const refresh = () => {
    inputManager.init();
    setAssignments(getAssignmentSummary());
  };

  const pads = inputManager.listGamepads();

  return (
    <ScreenShell>
      <Text style={styles.title}>Cocoon Console Mode</Text>
      <Text style={styles.sub}>
        Phone as a tiny console — handheld, tabletop, or big screen when your device supports
        mirroring/HDMI.
      </Text>

      {DISPLAY_MODES.map((m) => (
        <HotPinkButton
          key={m.id}
          label={`${m.title}${mode === m.id ? ' ✓' : ''}`}
          variant={mode === m.id ? 'primary' : 'secondary'}
          onPress={() => setMode(m.id)}
        />
      ))}

      <Text style={styles.body}>{DISPLAY_MODES.find((d) => d.id === mode)?.description}</Text>

      {mode === 'bigScreen' && (
        <View style={styles.box}>
          <Text style={styles.boxTitle}>Big Screen playbook</Text>
          {BIG_SCREEN_STEPS.map((s) => (
            <Text key={s} style={styles.step}>
              • {s}
            </Text>
          ))}
          <Text style={styles.note}>
            Scaly Wings is big-screen ready when your device supports external display or screen
            mirroring. See docs/BIG_SCREEN_PLAYBOOK.md.
          </Text>
        </View>
      )}

      <Text style={styles.section}>Local multiplayer setup</Text>
      <HotPinkButton label="Refresh controllers" variant="secondary" onPress={refresh} />
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

      <Text style={styles.section}>Supported games</Text>
      {CONSOLE_GAMES.map((g) => (
        <HotPinkButton
          key={g.route}
          label={g.title}
          variant="secondary"
          onPress={() => router.push(g.route as never)}
        />
      ))}

      <HotPinkButton label="Controller Test" onPress={() => router.push('/controller-test')} />
      <HotPinkButton label="Settings" variant="secondary" onPress={() => router.push('/settings')} />
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
