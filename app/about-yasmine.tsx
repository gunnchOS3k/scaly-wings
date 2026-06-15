import { Text, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ScreenShell } from '@/src/components/ScreenShell';
import { SkillBadge } from '@/src/components/SkillBadge';
import { LocalizedText } from '@/src/components/LocalizedText';
import { yasmineProfile } from '@/src/data/yasmineProfile';
import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';

function Section({ title, body }: { title: string; body: string | string[] }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {typeof body === 'string' ? (
        <Text style={styles.body}>{body}</Text>
      ) : (
        body.map((line) => (
          <Text key={line} style={styles.bullet}>
            • {line}
          </Text>
        ))
      )}
    </View>
  );
}

export default function AboutYasmineScreen() {
  const { t } = useTranslation();
  const p = yasmineProfile;
  const s = p.sections;

  return (
    <ScreenShell>
      <Text style={styles.hero}>{p.name}</Text>
      <Text style={styles.tagline}>{p.tagline}</Text>
      <Text style={styles.meta}>
        {p.school} · {p.major} · Class of {p.expectedGraduation}
      </Text>

      <Section title={t('about.whoSheIs')} body={s.whoSheIs} />
      <Section title={t('about.whatShesBuilding')} body={s.whatShesBuilding} />
      <Section title={t('about.technicalInterests')} body={s.technicalInterests} />
      <Section title={t('about.favoriteTools')} body={s.favoriteTools} />
      <Section title={t('about.mathCuriosity')} body={s.mathCuriosity} />
      <Section title={t('about.whyScalyWings')} body={s.whyScalyWings} />

      <LocalizedText i18nKey="about.skills" style={styles.sectionTitle} />
      <View style={styles.badges}>
        {p.skills.map((sk) => (
          <SkillBadge key={sk} label={sk} />
        ))}
      </View>

      <Section title={t('about.projects')} body={p.projectHighlights} />
      <Section title={t('about.resumeSnapshot')} body={p.resumeBullets} />
      <Section title={t('about.recruiterHighlights')} body={s.recruiterHighlights} />

      <LocalizedText i18nKey="about.contactLinks" style={styles.sectionTitle} />
      {p.links.map((l) => (
        <Text key={l.label} style={styles.link}>
          {l.label}: {l.url}
        </Text>
      ))}
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  hero: {
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
    color: colors.hotPink,
  },
  tagline: { fontSize: typography.sizes.md, color: colors.black, marginTop: spacing.sm },
  meta: { color: colors.charcoal, marginBottom: spacing.lg },
  section: { marginBottom: spacing.lg },
  sectionTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.purple,
    marginBottom: spacing.sm,
  },
  body: { color: colors.black, lineHeight: 24 },
  bullet: { color: colors.charcoal, lineHeight: 24, marginTop: spacing.xs },
  badges: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: spacing.lg },
  link: { color: colors.hotPink, marginTop: spacing.xs },
});
