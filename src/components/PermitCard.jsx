import { motion } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import { isExpired, zoneMatches, plateMatchesVehicle } from '../data/rules'
import CustomerFace from './CustomerFace'
import styles from './PermitCard.module.css'

export default function PermitCard({ vehicle }) {
  const day = useGameStore((s) => s.day)
  const { permit } = vehicle

  const expiredFlag = isExpired(permit.expiryDate)
  const zoneMismatch = day >= 2 && !zoneMatches(permit.zone, vehicle.requestedZone)
  const plateMismatch = day >= 3 && !plateMatchesVehicle(permit.plate, vehicle.plate)

  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      key={vehicle.id}
    >
      <div className={styles.cardHeader}>
        <span className={styles.authority}>CITY PARKING AUTHORITY</span>
        <span className={styles.permitType}>{permit.type} PERMIT</span>
      </div>

      <div className={styles.photoRow}>
        <div className={styles.photoBox}>
          <CustomerFace vehicleId={vehicle.id} size={72} />
          <span className={styles.photoLabel}>PHOTO ID</span>
        </div>
        <div className={styles.holderInfo}>
          <span className={styles.holderName}>{permit.holderName}</span>
          <span className={styles.holderPermit}>{permit.number}</span>
        </div>
      </div>

      <div className={styles.grid}>
        <Field label="Permit No." value={permit.number} />
        <Field label="Plate No." value={permit.plate} highlight={plateMismatch} />
        <Field label="Holder" value={permit.holderName} />
        <Field label="Vehicle Type" value={permit.vehicleType} />
        <Field
          label="Zone"
          value={permit.zone}
          highlight={zoneMismatch}
        />
        <Field
          label="Expiry Date"
          value={permit.expiryDate}
          highlight={expiredFlag}
        />
        <Field label="Issue Date" value={permit.issueDate} />
        <Field label="Issuing Officer" value={permit.issuingOfficer} />
      </div>

      <div className={styles.vehicleInfo}>
        <div className={styles.vehicleRow}>
          <span className={styles.vehicleLabel}>VEHICLE AT BOOTH:</span>
          <span className={styles.vehiclePlate}>{vehicle.plate}</span>
          <span>→</span>
          <span className={styles.vehicleZone}>Zone {vehicle.requestedZone}</span>
        </div>
      </div>
    </motion.div>
  )
}

function Field({ label, value, highlight }) {
  return (
    <div className={[styles.field, highlight ? styles.fieldHighlight : ''].join(' ')}>
      <span className={styles.fieldLabel}>{label}</span>
      <span className={styles.fieldValue}>{value}</span>
    </div>
  )
}
