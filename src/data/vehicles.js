const ZONES = ['A', 'B', 'C', 'D']
const VEHICLE_TYPES = ['Sedan', 'SUV', 'Truck', 'Motorcycle', 'Van']
const PERMIT_TYPES = ['Residential', 'Commercial', 'Visitor']
const OFFICERS = ['J. Torres', 'M. Kwan', 'B. Smith', 'R. Osei']

const FIRST_NAMES = ['Alex', 'Jordan', 'Morgan', 'Taylor', 'Casey', 'Riley', 'Sam', 'Drew']
const LAST_NAMES = ['Rivera', 'Chen', 'Patel', 'Kim', 'Garcia', 'Johnson', 'Lee', 'Walker']

let idCounter = 0

function rand(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function randPlate() {
  const letters = 'ABCDEFGHJKLMNPRSTUVWXYZ'
  const digits = '0123456789'
  const L = () => letters[Math.floor(Math.random() * letters.length)]
  const D = () => digits[Math.floor(Math.random() * digits.length)]
  return `${L()}${L()}${L()}-${D()}${D()}${D()}${D()}`
}

function randDate(daysOffset) {
  const d = new Date('2026-05-19')
  d.setDate(d.getDate() + daysOffset)
  return d.toISOString().slice(0, 10)
}

function randPermitNumber() {
  return `PKT-${Math.floor(100000 + Math.random() * 900000)}`
}

function generateVehicle(day, forceInvalid = false) {
  const plate = randPlate()
  const zone = rand(ZONES)
  const permitType = rand(PERMIT_TYPES)
  const vehicleType = rand(VEHICLE_TYPES)

  // Determine what kind of violation to inject based on day
  const violations = []
  if (day >= 1) violations.push('expired')
  if (day >= 2) violations.push('zone')
  if (day >= 3) violations.push('plate')

  const violationType = forceInvalid && violations.length > 0
    ? rand(violations)
    : null

  const expiryDate = violationType === 'expired'
    ? randDate(-Math.floor(Math.random() * 30 + 1)) // expired 1–30 days ago
    : randDate(Math.floor(Math.random() * 180 + 1)) // valid for 1–180 days

  const permitPlate = violationType === 'plate'
    ? randPlate() // different plate on permit
    : plate

  const permitZone = violationType === 'zone'
    ? rand(ZONES.filter((z) => z !== zone)) // wrong zone
    : zone

  return {
    id: ++idCounter,
    plate,
    requestedZone: zone,
    vehicleType,
    permit: {
      number: randPermitNumber(),
      type: permitType,
      holderName: `${rand(FIRST_NAMES)} ${rand(LAST_NAMES)}`,
      plate: permitPlate,
      vehicleType,
      zone: permitZone,
      expiryDate,
      issueDate: randDate(-Math.floor(Math.random() * 365 + 30)),
      issuingOfficer: rand(OFFICERS),
    },
  }
}

export function generateQueue(day, count) {
  const vehicles = []
  // Roughly half valid, half invalid
  for (let i = 0; i < count; i++) {
    const forceInvalid = i % 2 === 1
    vehicles.push(generateVehicle(day, forceInvalid))
  }
  // Shuffle
  return vehicles.sort(() => Math.random() - 0.5)
}
