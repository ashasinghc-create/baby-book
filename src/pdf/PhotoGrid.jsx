import { View, Image } from '@react-pdf/renderer'
import { styles } from './pdfStyles'

export default function PhotoGrid({ photos }) {
  if (!photos || photos.length === 0) return null

  const count = Math.min(photos.length, 4)
  const shown = photos.slice(0, count)

  if (count === 1) {
    return (
      <View style={styles.photoGrid1}>
        <Image src={shown[0]} style={[styles.photo, { width: '100%', height: '100%' }]} />
      </View>
    )
  }

  if (count === 2) {
    return (
      <View style={styles.photoGrid2}>
        {shown.map((src, i) => (
          <Image key={i} src={src} style={[styles.photo, { flex: 1, height: '100%' }]} />
        ))}
      </View>
    )
  }

  if (count === 3) {
    return (
      <View style={styles.photoGrid3}>
        <Image src={shown[0]} style={[styles.photo, { flex: 1.4, height: '100%' }]} />
        <View style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <Image src={shown[1]} style={[styles.photo, { flex: 1, width: '100%' }]} />
          <Image src={shown[2]} style={[styles.photo, { flex: 1, width: '100%' }]} />
        </View>
      </View>
    )
  }

  // 4 photos — 2x2 grid
  return (
    <View style={styles.photoGrid4}>
      {shown.map((src, i) => (
        <Image
          key={i}
          src={src}
          style={[styles.photo, { width: '48.5%', height: 90 }]}
        />
      ))}
    </View>
  )
}
