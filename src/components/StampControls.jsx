import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import styles from './StampControls.module.css'

export default function StampControls() {
  const decide = useGameStore((s) => s.decide)
  const [stamp, setStamp] = useState(null)

  const handleDecision = (action) => {
    setStamp(action)
    setTimeout(() => {
      setStamp(null)
      decide(action)
    }, 700)
  }

  return (
    <div className={styles.wrapper}>
      <AnimatePresence>
        {stamp && (
          <motion.div
            className={[styles.stampOverlay, stamp === 'approve' ? styles.approved : styles.denied].join(' ')}
            initial={{ opacity: 0, scale: 2, rotate: -15 }}
            animate={{ opacity: 1, scale: 1, rotate: stamp === 'approve' ? -8 : 8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {stamp === 'approve' ? 'APPROVED' : 'DENIED'}
          </motion.div>
        )}
      </AnimatePresence>

      <div className={styles.controls}>
        <motion.button
          className={styles.denyButton}
          onClick={() => handleDecision('deny')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.93 }}
          disabled={!!stamp}
        >
          ✗ DENY
        </motion.button>
        <motion.button
          className={styles.approveButton}
          onClick={() => handleDecision('approve')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.93 }}
          disabled={!!stamp}
        >
          ✓ APPROVE
        </motion.button>
      </div>
    </div>
  )
}
