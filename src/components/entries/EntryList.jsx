import { useState } from 'react'
import EntryCard from './EntryCard'
import EntryForm from './EntryForm'
import EmptyState from '../ui/EmptyState'
import { useBabyBookContext } from '../../store/BabyBookContext'
import { getCategory } from '../../constants/categories'
import { getAgeGroup } from '../../constants/ageGroups'

export default function EntryList({ ageKey, categoryKey }) {
  const { getEntries, addEntry, updateEntry, deleteEntry } = useBabyBookContext()
  const [addingEntry, setAddingEntry] = useState(false)
  const [editingEntry, setEditingEntry] = useState(null)

  const entries = getEntries(ageKey, categoryKey)
  const cat = getCategory(categoryKey)
  const ageGroup = getAgeGroup(ageKey)

  function handleAdd(data) {
    addEntry(ageKey, categoryKey, data)
  }

  function handleEdit(entry, data) {
    updateEntry(ageKey, categoryKey, entry.id, data)
    setEditingEntry(null)
  }

  return (
    <div>
      {/* Add button */}
      <div className="flex justify-end mb-4">
        <button className="btn-primary" onClick={() => setAddingEntry(true)}>
          + Add {cat?.label}
        </button>
      </div>

      {/* List */}
      {entries.length === 0 ? (
        <EmptyState
          emoji={cat?.emoji}
          title={`No ${cat?.label} yet`}
          description={cat?.description}
          action={
            <button className="btn-primary" onClick={() => setAddingEntry(true)}>
              Add First {cat?.label}
            </button>
          }
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {entries.map(entry => (
            <EntryCard
              key={entry.id}
              entry={entry}
              categoryKey={categoryKey}
              onEdit={() => setEditingEntry(entry)}
              onDelete={() => deleteEntry(ageKey, categoryKey, entry.id)}
            />
          ))}
        </div>
      )}

      {/* Add modal */}
      <EntryForm
        isOpen={addingEntry}
        onClose={() => setAddingEntry(false)}
        onSave={handleAdd}
        categoryKey={categoryKey}
        ageLabel={ageGroup?.label ?? ''}
      />

      {/* Edit modal */}
      {editingEntry && (
        <EntryForm
          isOpen={true}
          onClose={() => setEditingEntry(null)}
          onSave={(data) => handleEdit(editingEntry, data)}
          categoryKey={categoryKey}
          ageLabel={ageGroup?.label ?? ''}
          initialData={editingEntry}
        />
      )}
    </div>
  )
}
