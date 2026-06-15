import { Text, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ScreenShell } from '@/src/components/ScreenShell';
import { LocalizedText } from '@/src/components/LocalizedText';
import { iosChecklist, androidChecklist } from '@/src/data/appStoreChecklist';
import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';

function ChecklistBlock({ title, items }: { title: string; items: typeof iosChecklist }) {
  return (
    <View style={styles.block}>
      <Text style={styles.blockTitle}>{title}</Text>
      {items.map((item) => (
        <View key={item.id} style={styles.item}>
          <Text style={styles.itemTitle}>
            {item.done ? '☑' : '☐'} {item.title}
          </Text>
          <Text style={styles.itemDesc}>{item.description}</Text>
        </View>
      ))}
    </View>
  );
}


export default function PublishScreen() {
  const { t } = useTranslation();

  return (
    <ScreenShell>
      <LocalizedText i18nKey="publish.title" style={styles.heading} />
      <LocalizedText i18nKey="publish.subtitle" style={styles.sub} />
      <ChecklistBlock title={t('publish.iosAppStore')} items={iosChecklist} />
      <ChecklistBlock title={t('publish.googlePlay')} items={androidChecklist} />
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
    color: colors.hotPink,
  },
  sub: { color: colors.charcoal, marginBottom: spacing.lg },
  block: { marginBottom: spacing.xl },
  blockTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.purple,
    marginBottom: spacing.md,
  },
  item: {
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.sm,
  },
  itemTitle: { fontWeight: typography.weights.semibold, color: colors.black },
  itemDesc: { color: colors.charcoal, marginTop: spacing.xs, fontSize: typography.sizes.sm },
});
