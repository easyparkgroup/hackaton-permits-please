import { useGameStore } from '../store/gameStore'
import styles from './HUD.module.css'

export default function HUD() {
  const { score, mistakes, day, vehiclesRemaining, MAX_MISTAKES } = useGameStore((s) => ({
    score: s.score,
    mistakes: s.mistakes,
    day: s.day,
    vehiclesRemaining: s.queue.length,
    MAX_MISTAKES: s.MAX_MISTAKES,
  }))

  return (
    <header className={styles.hud}>
      <div className={styles.left}>
        <span className={styles.label}>PARKING AUTHORITY</span>
        <span className={styles.day}>DAY {day}</span>
      </div>
      <div className={styles.center}>
        <span className={styles.label}>QUEUE</span>
        <span className={styles.value}>{vehiclesRemaining} remaining</span>
      </div>
      <div className={styles.right}>
        <div className={styles.stat}>
          <span className={styles.label}>SCORE</span>
          <span className={styles.value}>{score}</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.label}>ERRORS</span>
          <span className={[styles.value, mistakes > 0 ? styles.danger : ''].join(' ')}>
            {mistakes} / {MAX_MISTAKES}
          </span>
        </div>
      </div>
    </header>
  )
}
