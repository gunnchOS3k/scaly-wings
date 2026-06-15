import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenShell } from '@/src/components/ScreenShell';
import { ArcadeGameCard } from '@/src/components/ArcadeGameCard';
import { LocalizedText } from '@/src/components/LocalizedText';
import { ARCADE_GAMES, ARCADE_SECTION_KEYS } from '@/src/data/arcadeCatalog';
import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';

const SECTIONS = [
  { key: 'core' as const, titleKey: ARCADE_SECTION_KEYS.core },
  { key: 'probability' as const, titleKey: ARCADE_SECTION_KEYS.probability },
  { key: 'console' as const, titleKey: ARCADE_SECTION_KEYS.console },
  { key: 'tools' as const, titleKey: ARCADE_SECTION_KEYS.tools },
];

export default function ArcadeScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <ScreenShell>
      <LocalizedText i18nKey="arcade.heading" style={styles.heading} />
      <LocalizedText i18nKey="arcade.subtitle" style={styles.sub} />
      {SECTIONS.map((sec) => {
        const games = ARCADE_GAMES.filter((g) => g.section === sec.key);
        if (games.length === 0) return null;
        return (
          <View key={sec.key}>
            <LocalizedText i18nKey={sec.titleKey} style={styles.section} />
            {games.map((g) => (
              <ArcadeGameCard
                key={g.route}
                entry={g}
                onPress={() => router.push(g.route as never)}
              />
            ))}
          </View>
        );
      })}
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
    color: colors.hotPink,
    marginBottom: spacing.sm,
  },
  sub: { color: colors.charcoal, marginBottom: spacing.lg },
  section: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.purple,
    marginBottom: spacing.sm,
    marginTop: spacing.md,
  },
});
