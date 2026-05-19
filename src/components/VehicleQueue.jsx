import { useGameStore } from '../store/gameStore'
import styles from './VehicleQueue.module.css'

export default function VehicleQueue() {
  const { queue, currentVehicle } = useGameStore((s) => ({
    queue: s.queue,
    currentVehicle: s.currentVehicle,
  }))

  return (
    <div className={styles.panel}>
      <p className={styles.title}>VEHICLE QUEUE</p>
      <div className={styles.list}>
        {currentVehicle && (
          <div className={[styles.item, styles.current].join(' ')}>
            <span className={styles.itemPlate}>{currentVehicle.plate}</span>
            <span className={styles.itemZone}>→ Zone {currentVehicle.requestedZone}</span>
            <span className={styles.currentBadge}>NOW</span>
          </div>
        )}
        {queue.map((v, i) => (
          <div key={v.id} className={styles.item}>
            <span className={styles.itemPlate}>{v.plate}</span>
            <span className={styles.itemZone}>→ Zone {v.requestedZone}</span>
            <span className={styles.position}>#{i + 1}</span>
          </div>
        ))}
        {queue.length === 0 && !currentVehicle && (
          <p className={styles.empty}>Queue empty</p>
        )}
      </div>
    </div>
  )
}
