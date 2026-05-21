import { Text, StyleSheet, View } from 'react-native';
import { ScreenShell } from '@/src/components/ScreenShell';
import { SkillBadge } from '@/src/components/SkillBadge';
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
  const p = yasmineProfile;
  const s = p.sections;

  return (
    <ScreenShell>
      <Text style={styles.hero}>{p.name}</Text>
      <Text style={styles.tagline}>{p.tagline}</Text>
      <Text style={styles.meta}>
        {p.school} · {p.major} · Class of {p.expectedGraduation}
      </Text>

      <Section title="Who Yasmine Is" body={s.whoSheIs} />
      <Section title="What She's Building" body={s.whatShesBuilding} />
      <Section title="Technical Interests" body={s.technicalInterests} />
      <Section title="Favorite Tools" body={s.favoriteTools} />
      <Section title="Math + Curiosity" body={s.mathCuriosity} />
      <Section title="Why Scaly Wings Exists" body={s.whyScalyWings} />

      <Text style={styles.sectionTitle}>Skills</Text>
      <View style={styles.badges}>
        {p.skills.map((sk) => (
          <SkillBadge key={sk} label={sk} />
        ))}
      </View>

      <Section title="Projects" body={p.projectHighlights} />
      <Section title="Resume Snapshot" body={p.resumeBullets} />
      <Section title="Recruiter Highlights" body={s.recruiterHighlights} />

      <Text style={styles.sectionTitle}>Contact / Links</Text>
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
