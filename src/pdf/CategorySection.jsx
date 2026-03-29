import { View, Text } from '@react-pdf/renderer'
import { styles, CATEGORY_COLORS } from './pdfStyles'
import EntryBlock from './EntryBlock'

const CATEGORY_LABELS = {
  birthdays:    'Birthdays',
  milestones:   'Milestones',
  funnyHabits:  'Funny Habits',
  memories:     'Memories',
  achievements: 'Achievements',
}

export default function CategorySection({ categoryKey, entries }) {
  if (!entries || entries.length === 0) return null

  const catColors = CATEGORY_COLORS[categoryKey] ?? CATEGORY_COLORS.memories
  const label = CATEGORY_LABELS[categoryKey] ?? categoryKey

  return (
    <View>
      {/* Category header */}
      <View style={[styles.categoryHeader, { borderBottomColor: catColors.accent + '40' }]}>
        <View style={[styles.categoryAccentDot, { backgroundColor: catColors.accent }]} />
        <Text style={[styles.categoryLabel, { color: catColors.text }]}>{label}</Text>
        <Text style={styles.categoryCount}>
          {entries.length} {entries.length === 1 ? 'entry' : 'entries'}
        </Text>
      </View>

      {/* Entries */}
      {entries.map(entry => (
        <EntryBlock key={entry.id} entry={entry} categoryKey={categoryKey} />
      ))}
    </View>
  )
}
