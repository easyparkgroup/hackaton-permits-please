import { motion } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import { getDayRules } from '../data/rules'
import styles from './DayBriefing.module.css'

export default function DayBriefing() {
  const { day, beginShift } = useGameStore((s) => ({ day: s.day, beginShift: s.beginShift }))
  const rules = getDayRules(day)

  return (
    <div className={styles.container}>
      <motion.div
        className={styles.bulletin}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className={styles.header}>
          <span className={styles.label}>PARKING AUTHORITY MEMO</span>
          <span className={styles.day}>DAY {day}</span>
        </div>

        <h2 className={styles.title}>Shift Briefing</h2>

        <div className={styles.rulesSection}>
          <p className={styles.rulesTitle}>ACTIVE REGULATIONS:</p>
          <ul className={styles.rulesList}>
            {rules.map((rule, i) => (
              <li key={i} className={rule.isNew ? styles.newRule : styles.rule}>
                {rule.isNew && <span className={styles.newBadge}>NEW</span>}
                {rule.text}
              </li>
            ))}
          </ul>
        </div>

        <p className={styles.warning}>
          Errors will be noted in your performance record.
        </p>

        <motion.button
          className={styles.startButton}
          onClick={beginShift}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          START SHIFT
        </motion.button>
      </motion.div>
    </div>
  )
}
