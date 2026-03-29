import { Page, View, Text } from '@react-pdf/renderer'
import { styles, COLORS } from './pdfStyles'
import CategorySection from './CategorySection'
import '../pdf/pdfFonts'

const CATEGORY_KEYS = ['birthdays', 'milestones', 'funnyHabits', 'memories', 'achievements']

export default function AgeSectionPage({ ageGroup, categoryEntries, totalCount }) {
  return (
    <>
      {/* Section divider page */}
      <Page size="A4" style={[styles.page, styles.sectionPage, { backgroundColor: COLORS.gray50 }]}>
        <View style={styles.sectionAccentBar} />
        <Text style={styles.sectionSuperLabel}>{ageGroup.section}</Text>
        <Text style={styles.sectionAgeLabel}>{ageGroup.label}</Text>
        <Text style={styles.sectionDescription}>{ageGroup.section} · Age group</Text>

        <View style={styles.sectionCountBadge}>
          <Text style={styles.sectionCountText}>
            {totalCount} {totalCount === 1 ? 'memory' : 'memories'}
          </Text>
        </View>

        <Text
          style={styles.pageNumber}
          render={({ pageNumber }) => `${pageNumber}`}
          fixed
        />
      </Page>

      {/* Content pages for this age group */}
      <Page size="A4" style={styles.page}>
        <Text
          style={[styles.sectionSuperLabel, { marginBottom: 12 }]}
        >
          {ageGroup.label}
        </Text>

        {CATEGORY_KEYS.map(catKey => {
          const entries = categoryEntries[catKey]
          if (!entries || entries.length === 0) return null
          return (
            <CategorySection
              key={catKey}
              categoryKey={catKey}
              entries={entries}
            />
          )
        })}

        <Text
          style={styles.pageNumber}
          render={({ pageNumber }) => `${pageNumber}`}
          fixed
        />
      </Page>
    </>
  )
}
