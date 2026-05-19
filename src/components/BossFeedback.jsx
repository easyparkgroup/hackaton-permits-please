import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import { playWrongDecision, playGameOver } from '../utils/sounds'
import styles from './BossFeedback.module.css'

function BossSVG() {
  return (
    <svg width="130" height="163" viewBox="0 0 44 55" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated', display: 'block' }}>
      {/* suit body */}
      <rect x="4" y="32" width="36" height="23" fill="#2C3E50" rx="2" />
      {/* shirt / chest */}
      <rect x="17" y="32" width="10" height="14" fill="#ECF0F1" />
      {/* tie */}
      <polygon points="20,33 24,33 23,44 21,44" fill="#C0392B" />
      {/* lapels */}
      <polygon points="17,32 22,38 17,45" fill="#34495E" />
      <polygon points="27,32 22,38 27,45" fill="#34495E" />

      {/* left arm crossed */}
      <rect x="2" y="35" width="16" height="7" fill="#2C3E50" rx="3" />
      {/* right arm crossed (over left) */}
      <rect x="12" y="32" width="16" height="7" fill="#34495E" rx="3" />
      {/* hands */}
      <rect x="2" y="36" width="5" height="5" fill="#D4956A" rx="1" />
      <rect x="27" y="33" width="5" height="5" fill="#D4956A" rx="1" />

      {/* neck */}
      <rect x="18" y="26" width="8" height="8" fill="#D4956A" />
      {/* head */}
      <rect x="12" y="10" width="20" height="19" fill="#D4956A" rx="3" />
      {/* hair */}
      <rect x="12" y="10" width="20" height="6" fill="#2C2C2C" rx="3" />
      <rect x="12" y="10" width="4" height="10" fill="#2C2C2C" rx="1" />

      {/* furrowed brow */}
      <line x1="14" y1="17" x2="19" y2="19" stroke="#7A4F3A" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="30" y1="17" x2="25" y2="19" stroke="#7A4F3A" strokeWidth="1.2" strokeLinecap="round" />

      {/* eyes — stern narrow */}
      <rect x="14" y="19" width="5" height="2.5" fill="#2C2C2C" rx="0.5" />
      <rect x="25" y="19" width="5" height="2.5" fill="#2C2C2C" rx="0.5" />

      {/* nose */}
      <rect x="20" y="22" width="4" height="3" fill="#C68642" rx="1" />

      {/* frown mouth */}
      <path d="M16 28 Q22 25 28 28" stroke="#2C2C2C" strokeWidth="1.3" fill="none" strokeLinecap="round" />

      {/* glasses */}
      <rect x="13" y="18" width="7" height="4" rx="1" stroke="#555" strokeWidth="0.8" fill="none" />
      <rect x="24" y="18" width="7" height="4" rx="1" stroke="#555" strokeWidth="0.8" fill="none" />
      <line x1="20" y1="20" x2="24" y2="20" stroke="#555" strokeWidth="0.8" />
    </svg>
  )
}

const WRONG_PHRASES = [
  'SERIOUSLY?!',
  'COME ON!!',
  'PAY ATTENTION!',
  'ARE YOU BLIND?',
  'READ THE PERMIT!',
  'UNBELIEVABLE.',
  'FOCUS!!',
  'THAT WAS OBVIOUS.',
  'DO YOUR JOB!',
  'NOT AGAIN...',
]

export default function BossFeedback() {
  const lastResult = useGameStore((s) => s.lastResult)
  const clearLastResult = useGameStore((s) => s.clearLastResult)
  const phrase = lastResult === 'wrong'
    ? WRONG_PHRASES[Math.floor(Math.random() * WRONG_PHRASES.length)]
    : null

  useEffect(() => {
    if (!lastResult) return

    if (lastResult === 'wrong') playWrongDecision()
    if (lastResult === 'gameover') playGameOver()

    const timer = setTimeout(clearLastResult, 4000)
    return () => clearTimeout(timer)
  }, [lastResult, clearLastResult])

  const isGameOver = lastResult === 'gameover'

  return (
    <AnimatePresence>
      {lastResult && (
        <motion.div
          className={styles.wrapper}
          initial={{ x: 120, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 120, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        >
          <div className={[styles.panel, isGameOver ? styles.gameover : styles.wrong].join(' ')}>
            <BossSVG />
            <span className={styles.label}>
              {isGameOver ? "YOU'RE FIRED" : phrase}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
