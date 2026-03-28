import { estimateStorageUsed, STORAGE_WARN_BYTES, STORAGE_LIMIT_BYTES } from '../../utils/storageUtils'
import { formatBytes } from '../../utils/photoUtils'

export default function StorageMeter() {
  const used = estimateStorageUsed()
  const pct = Math.min(100, (used / STORAGE_LIMIT_BYTES) * 100)
  const isWarn = used > STORAGE_WARN_BYTES

  if (used < 500 * 1024) return null // hide if under 500 KB

  return (
    <div className="flex items-center gap-2 text-xs text-gray-400" title={`${formatBytes(used)} used`}>
      <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${isWarn ? 'bg-orange-400' : 'bg-pink-300'}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span>{formatBytes(used)}</span>
    </div>
  )
}
