const TIMES = ['7AM', '8AM', '9AM', '10AM', '11AM', '12PM', '2PM', '4PM', '6PM', '7PM']
const DAY_SETS = [
  'MON THRU FRI',
  'MON WED FRI',
  'TUE THUR SAT',
  'MON THRU SAT',
  'EXCEPT SUNDAY',
  'WEEKDAYS ONLY',
]
const ARROW_DIRS = ['↑', '↓', '↕', '←→']

function sr(seed, i) {
  let h = (seed * 2654435761 + i * 40503) >>> 0
  h = ((h ^ (h >>> 16)) * 0x45d9f3b) >>> 0
  return (h ^ (h >>> 16)) >>> 0
}
function pick(arr, seed, i) { return arr[sr(seed, i) % arr.length] }
function rInt(seed, i, min, max) { return min + (sr(seed, i) % (max - min)) }

// Each sign panel: { lines: string[], color: 'white'|'green'|'red'|'yellow', arrow?: string }
export function generateSigns(vehicle, day) {
  const seed = vehicle.id * 31 + day * 7
  const zone = vehicle.requestedZone
  const type = vehicle.vehicleType

  const t1 = pick(TIMES, seed, 0)
  const t2idx = (TIMES.indexOf(t1) + rInt(seed, 1, 2, 5)) % TIMES.length
  const t2 = TIMES[t2idx]
  const days1 = pick(DAY_SETS, seed, 2)
  const days2 = pick(DAY_SETS, seed, 3)
  const arrow = pick(ARROW_DIRS, seed, 4)
  const otherZone = ['A','B','C','D'].filter(z => z !== zone)[rInt(seed, 5, 0, 3)]
  const altZone = ['A','B','C','D'].filter(z => z !== zone && z !== otherZone)[rInt(seed, 6, 0, 2)]

  const signs = []

  // Sign 1: main prohibition — always present
  signs.push({
    color: 'red',
    arrow,
    lines: ['NO PARKING', `${t1} – ${t2}`, days1],
  })

  // Sign 2: zone exception (day 1+)
  signs.push({
    color: 'white',
    lines: [
      `PERMIT ZONE ${zone}`,
      'EXEMPT',
      `ZONE ${otherZone} RESTRICTED`,
    ],
  })

  // Sign 3: vehicle / time twist (day 2+)
  if (day >= 2) {
    const vehicleRule = type === 'Truck' || type === 'Van'
      ? ['NO COMMERCIAL', 'VEHICLES', `${t2} – 8PM`]
      : type === 'Motorcycle'
        ? ['MOTORCYCLES', 'SEE SIGN BELOW', `ZONE ${altZone} ONLY`]
        : ['2 HR PARKING', `${t2} – 8PM`, days2]

    signs.push({
      color: 'green',
      arrow: pick(ARROW_DIRS, seed, 7),
      lines: vehicleRule,
    })
  }

  // Sign 4: confusing exception stack (day 3+)
  if (day >= 3) {
    signs.push({
      color: 'yellow',
      lines: [
        `EXCEPT ZONE ${altZone}`,
        `& ZONE ${otherZone}`,
        `${days2} ONLY`,
        '↑ APPLIES ABOVE',
      ],
    })
  }

  return signs
}
