// Today's in-game date used for expiry checks
export const TODAY = '2026-05-19'

export function isExpired(expiryDate) {
  return expiryDate < TODAY
}

export function zoneMatches(permitZone, requestedZone) {
  return permitZone === requestedZone
}

export function plateMatchesVehicle(permitPlate, vehiclePlate) {
  return permitPlate === vehiclePlate
}

// Returns true if the vehicle should be approved on the given day
export function isVehicleValid(vehicle, day) {
  const { permit } = vehicle

  // Day 1+: check expiry
  if (isExpired(permit.expiryDate)) return false

  // Day 2+: check zone
  if (day >= 2 && !zoneMatches(permit.zone, vehicle.requestedZone)) return false

  // Day 3+: check plate
  if (day >= 3 && !plateMatchesVehicle(permit.plate, vehicle.plate)) return false

  return true
}

const BASE_RULES = [
  { text: 'Permits must not be expired. Check the Expiry Date against today\'s date (2026-05-19).', isNew: false },
]

const DAY_RULES = {
  1: [],
  2: [{ text: 'The permit zone must match the requested parking zone.', isNew: true }],
  3: [{ text: 'The plate number on the permit must match the vehicle\'s plate.', isNew: true }],
  4: [{ text: 'Visitor permits are only valid Mon–Fri. Reject visitor permits on weekends.', isNew: true }],
}

export function getDayRules(day) {
  const rules = [...BASE_RULES]
  for (let d = 2; d <= day; d++) {
    const dayRules = DAY_RULES[d] || []
    // Mark as new only for the current day
    rules.push(...dayRules.map((r) => ({ ...r, isNew: d === day })))
  }
  return rules
}
