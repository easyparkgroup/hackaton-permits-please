import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import { generateSigns } from '../data/signs'
import styles from './ParkingSign.module.css'

const COLORS = {
  red:    { bg: '#c0392b', banner: '#a93226', text: '#fff' },
  green:  { bg: '#1a5c2a', banner: '#155224', text: '#fff' },
  white:  { bg: '#f4f4f0', banner: '#2c2c2c', text: '#111' },
  yellow: { bg: '#f0c030', banner: '#c9a020', text: '#111' },
}

export default function ParkingSign() {
  const currentVehicle = useGameStore((s) => s.currentVehicle)
  const day = useGameStore((s) => s.day)

  if (!currentVehicle) return null

  const signs = generateSigns(currentVehicle, day)

  return (
    <div className={styles.column}>
      <p className={styles.header}>⚠ ACTIVE SIGNS</p>

      <div className={styles.poleArea}>
        {/* pole */}
        <div className={styles.pole} />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentVehicle.id}
            className={styles.stack}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.35 }}
          >
            {signs.map((sign, i) => {
              const theme = COLORS[sign.color]
              return (
                <div
                  key={i}
                  className={styles.sign}
                  style={{ '--bg': theme.bg, '--banner': theme.banner, '--txt': theme.text }}
                >
                  {/* mounting bolts */}
                  <div className={styles.bolt} />
                  <div className={[styles.bolt, styles.boltBottom].join(' ')} />

                  <div className={styles.signInner}>
                    {/* top banner with arrow */}
                    <div className={styles.banner}>
                      {sign.lines[0]}
                      {sign.arrow && <span className={styles.arrowBadge}>{sign.arrow}</span>}
                    </div>

                    {/* body lines */}
                    <div className={styles.body}>
                      {sign.lines.slice(1).map((line, j) => (
                        <span key={j} className={styles.bodyLine}>{line}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
