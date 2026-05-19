import { motion } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import styles from './ShiftReport.module.css'

export default function ShiftReport() {
  const { score, mistakes, day, nextDay, decisions } = useGameStore((s) => ({
    score: s.score,
    mistakes: s.mistakes,
    day: s.day,
    nextDay: s.nextDay,
    decisions: s.decisions,
  }))

  const correct = decisions.filter((d) => d.correct).length
  const total = decisions.length

  return (
    <div className={styles.container}>
      <motion.div
        className={styles.report}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className={styles.header}>
          <span className={styles.label}>END OF SHIFT REPORT</span>
          <span className={styles.day}>DAY {day}</span>
        </div>

        <h2 className={styles.title}>Shift Complete</h2>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statValue}>{correct}/{total}</span>
            <span className={styles.statLabel}>Correct Decisions</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>{score}</span>
            <span className={styles.statLabel}>Score</span>
          </div>
          <div className={styles.stat}>
            <span className={[styles.statValue, mistakes > 2 ? styles.danger : ''].join(' ')}>
              {mistakes}
            </span>
            <span className={styles.statLabel}>Errors</span>
          </div>
        </div>

        <div className={styles.decisionLog}>
          <p className={styles.logTitle}>DECISION LOG:</p>
          {decisions.map((d, i) => (
            <div key={i} className={d.correct ? styles.logCorrect : styles.logError}>
              <span>{d.plate}</span>
              <span>{d.action}</span>
              <span>{d.correct ? '✓' : '✗'}</span>
            </div>
          ))}
        </div>

        <motion.button
          className={styles.nextButton}
          onClick={nextDay}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          NEXT DAY →
        </motion.button>
      </motion.div>
    </div>
  )
}
