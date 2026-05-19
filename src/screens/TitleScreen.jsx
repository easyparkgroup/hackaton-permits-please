import { motion } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import styles from './TitleScreen.module.css'

export default function TitleScreen() {
  const startGame = useGameStore((s) => s.startGame)

  return (
    <div className={styles.container}>
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className={styles.badge}>PARKING AUTHORITY</div>
        <h1 className={styles.title}>PERMITS<br />PLEASE</h1>
        <p className={styles.subtitle}>
          Inspect. Verify. Stamp.
        </p>
        <motion.button
          className={styles.startButton}
          onClick={startGame}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          BEGIN SHIFT
        </motion.button>
        <p className={styles.hint}>
          A bureaucratic parking inspection game
        </p>
      </motion.div>
    </div>
  )
}
