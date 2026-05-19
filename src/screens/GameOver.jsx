import { motion } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import styles from './GameOver.module.css'

export default function GameOver() {
  const { score, day, resetGame } = useGameStore((s) => ({
    score: s.score,
    day: s.day,
    resetGame: s.resetGame,
  }))

  return (
    <div className={styles.container}>
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.stamp}>TERMINATED</div>
        <h2 className={styles.title}>You've been relieved of duty.</h2>
        <p className={styles.body}>
          Too many violations were missed on your watch. The Parking Authority
          cannot tolerate such negligence.
        </p>
        <div className={styles.finalScore}>
          <span className={styles.scoreLabel}>FINAL SCORE</span>
          <span className={styles.scoreValue}>{score}</span>
          <span className={styles.scoreLabel}>Day {day}</span>
        </div>
        <motion.button
          className={styles.retryButton}
          onClick={resetGame}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          TRY AGAIN
        </motion.button>
      </motion.div>
    </div>
  )
}
