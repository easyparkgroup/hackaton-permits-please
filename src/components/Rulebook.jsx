import { useState } from 'react'
import { useGameStore } from '../store/gameStore'
import { getDayRules } from '../data/rules'
import styles from './Rulebook.module.css'

export default function Rulebook() {
  const day = useGameStore((s) => s.day)
  const rules = getDayRules(day)
  const [open, setOpen] = useState(true)

  return (
    <div className={styles.rulebook}>
      <button className={styles.toggle} onClick={() => setOpen((o) => !o)}>
        RULEBOOK {open ? '▲' : '▼'}
      </button>
      {open && (
        <div className={styles.content}>
          <p className={styles.subtitle}>Active regulations — Day {day}</p>
          <ul className={styles.list}>
            {rules.map((rule, i) => (
              <li key={i} className={rule.isNew ? styles.newRule : styles.rule}>
                {rule.isNew && <span className={styles.newBadge}>NEW</span>}
                <span>{rule.text}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
