import { useGameStore } from '../store/gameStore'
import PermitCard from '../components/PermitCard'
import Rulebook from '../components/Rulebook'
import StampControls from '../components/StampControls'
import VehicleQueue from '../components/VehicleQueue'
import HUD from '../components/HUD'
import ParkingSign from '../components/ParkingSign'
import styles from './GameScreen.module.css'

export default function GameScreen() {
  const currentVehicle = useGameStore((s) => s.currentVehicle)

  return (
    <div className={styles.container}>
      <HUD />
      <div className={styles.main}>
        <aside className={styles.left}>
          <VehicleQueue />
        </aside>

        <section className={styles.center}>
          {currentVehicle ? (
            <>
              <div className={styles.centerLeft}>
                <PermitCard vehicle={currentVehicle} />
                <StampControls />
              </div>
              <div className={styles.centerRight}>
                <ParkingSign />
              </div>
            </>
          ) : (
            <div className={styles.idle}>
              <p>Waiting for next vehicle...</p>
            </div>
          )}
        </section>

        <aside className={styles.right}>
          <Rulebook />
        </aside>
      </div>
    </div>
  )
}
