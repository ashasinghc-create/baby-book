import { View, Text } from '@react-pdf/renderer'
import { styles, CATEGORY_COLORS } from './pdfStyles'
import PhotoGrid from './PhotoGrid'

function formatEntryDate(dateStr) {
  if (!dateStr) return null
  try {
    return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric',
    })
  } catch { return dateStr }
}

export default function EntryBlock({ entry, categoryKey }) {
  const catColors = CATEGORY_COLORS[categoryKey] ?? CATEGORY_COLORS.memories
  const dateFormatted = formatEntryDate(entry.date)

  return (
    <View
      style={[styles.entryBlock, { borderLeftColor: catColors.accent }]}
      wrap={false}
    >
      {/* Title + date row */}
      <View style={styles.entryTitleRow}>
        <Text style={styles.entryTitle}>{entry.title}</Text>
        {dateFormatted && (
          <Text style={styles.entryDate}>{dateFormatted}</Text>
        )}
      </View>

      {/* Caption */}
      {!!entry.caption && (
        <Text style={styles.entryCaption}>{entry.caption}</Text>
      )}

      {/* Notes */}
      {!!entry.notes && (
        <Text style={styles.entryNotes}>{entry.notes}</Text>
      )}

      {/* Photos */}
      {entry.photos?.length > 0 && (
        <PhotoGrid photos={entry.photos} />
      )}
    </View>
  )
}
