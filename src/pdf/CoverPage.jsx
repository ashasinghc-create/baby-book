import { Page, View, Text, Image } from '@react-pdf/renderer'
import { styles, COLORS } from './pdfStyles'
import '../pdf/pdfFonts'

function formatBirthDate(dateStr) {
  if (!dateStr) return null
  try {
    return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric',
    })
  } catch { return dateStr }
}

export default function CoverPage({ profile, totalMemories, ageCount }) {
  const birthFormatted = formatBirthDate(profile?.birthDate)

  return (
    <Page size="A4" style={styles.coverPage}>
      {/* Photo banner */}
      {profile?.coverPhoto ? (
        <View style={styles.coverPhotoContainer}>
          <Image src={profile.coverPhoto} style={styles.coverPhoto} />
        </View>
      ) : (
        <View style={[styles.coverGradientFallback, { backgroundColor: COLORS.pinkLight }]}>
          <Text style={{ fontSize: 72, color: COLORS.pink }}>Baby</Text>
        </View>
      )}

      {/* Content area */}
      <View style={styles.coverContent}>
        <Text style={styles.coverBookLabel}>Memory Book</Text>

        <Text style={styles.coverBabyName}>
          {profile?.babyName || 'Baby'}
        </Text>

        {birthFormatted && (
          <Text style={styles.coverSubtitle}>Born {birthFormatted}</Text>
        )}

        <View style={styles.coverDivider} />

        <Text style={styles.coverStats}>
          {totalMemories} {totalMemories === 1 ? 'memory' : 'memories'} across {ageCount} {ageCount === 1 ? 'age group' : 'age groups'}
        </Text>
      </View>

      <Text
        style={styles.pageNumber}
        render={({ pageNumber }) => `${pageNumber}`}
        fixed
      />
    </Page>
  )
}
