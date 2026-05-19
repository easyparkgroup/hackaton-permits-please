const BODY_COLORS = [
  '#C0392B', '#E74C3C', // reds
  '#2980B9', '#3498DB', // blues
  '#27AE60', '#2ECC71', // greens
  '#8E44AD', '#9B59B6', // purples
  '#E67E22', '#F39C12', // oranges
  '#2C3E50', '#34495E', // dark grey
  '#ECF0F1', '#BDC3C7', // silver/white
  '#F1C40F', '#F9CA24', // yellows
]

function seededRand(seed, index) {
  let h = (seed * 2654435761 + index * 40503) >>> 0
  h = ((h ^ (h >>> 16)) * 0x45d9f3b) >>> 0
  h = ((h ^ (h >>> 16)) * 0x45d9f3b) >>> 0
  return (h ^ (h >>> 16)) >>> 0
}

function pick(arr, seed, index) {
  return arr[seededRand(seed, index) % arr.length]
}

function darken(hex) {
  const n = parseInt(hex.slice(1), 16)
  const r = Math.max(0, (n >> 16) - 40)
  const g = Math.max(0, ((n >> 8) & 0xff) - 40)
  const b = Math.max(0, (n & 0xff) - 40)
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`
}

function Sedan({ color, dark }) {
  return (
    <g>
      {/* body */}
      <rect x="4" y="18" width="56" height="14" fill={color} rx="2" />
      {/* cabin */}
      <rect x="14" y="10" width="30" height="10" fill={color} rx="2" />
      {/* windshield */}
      <rect x="15" y="11" width="12" height="8" fill="#AED6F1" opacity="0.85" rx="1" />
      {/* rear window */}
      <rect x="31" y="11" width="12" height="8" fill="#AED6F1" opacity="0.85" rx="1" />
      {/* wheels */}
      <circle cx="15" cy="32" r="6" fill="#1a1a1a" />
      <circle cx="15" cy="32" r="3" fill="#555" />
      <circle cx="49" cy="32" r="6" fill="#1a1a1a" />
      <circle cx="49" cy="32" r="3" fill="#555" />
      {/* bumpers */}
      <rect x="2" y="20" width="4" height="6" fill={dark} rx="1" />
      <rect x="58" y="20" width="4" height="6" fill={dark} rx="1" />
      {/* headlight */}
      <rect x="58" y="21" width="3" height="3" fill="#F9E79F" rx="0.5" />
      {/* taillight */}
      <rect x="3" y="21" width="3" height="3" fill="#E74C3C" rx="0.5" />
      {/* door line */}
      <line x1="32" y1="18" x2="32" y2="32" stroke={dark} strokeWidth="0.8" />
    </g>
  )
}

function SUV({ color, dark }) {
  return (
    <g>
      {/* body */}
      <rect x="3" y="14" width="58" height="18" fill={color} rx="2" />
      {/* roof */}
      <rect x="8" y="8" width="48" height="8" fill={color} rx="2" />
      {/* windows */}
      <rect x="10" y="9" width="16" height="6" fill="#AED6F1" opacity="0.85" rx="1" />
      <rect x="28" y="9" width="14" height="6" fill="#AED6F1" opacity="0.85" rx="1" />
      <rect x="44" y="9" width="10" height="6" fill="#AED6F1" opacity="0.85" rx="1" />
      {/* wheels */}
      <circle cx="16" cy="33" r="7" fill="#1a1a1a" />
      <circle cx="16" cy="33" r="3.5" fill="#555" />
      <circle cx="48" cy="33" r="7" fill="#1a1a1a" />
      <circle cx="48" cy="33" r="3.5" fill="#555" />
      {/* bumpers */}
      <rect x="1" y="18" width="4" height="8" fill={dark} rx="1" />
      <rect x="59" y="18" width="4" height="8" fill={dark} rx="1" />
      {/* headlight */}
      <rect x="59" y="19" width="3" height="4" fill="#F9E79F" rx="0.5" />
      <rect x="2" y="19" width="3" height="4" fill="#E74C3C" rx="0.5" />
      {/* door lines */}
      <line x1="28" y1="14" x2="28" y2="32" stroke={dark} strokeWidth="0.8" />
      <line x1="44" y1="14" x2="44" y2="32" stroke={dark} strokeWidth="0.8" />
      {/* roof rack */}
      <rect x="12" y="7" width="40" height="2" fill={dark} rx="1" />
    </g>
  )
}

function Truck({ color, dark }) {
  return (
    <g>
      {/* truck bed */}
      <rect x="3" y="16" width="32" height="16" fill={dark} rx="1" />
      <rect x="4" y="17" width="30" height="14" fill="#888" rx="1" />
      {/* cab body */}
      <rect x="33" y="14" width="26" height="18" fill={color} rx="2" />
      {/* cab roof */}
      <rect x="36" y="8" width="22" height="8" fill={color} rx="2" />
      {/* windshield */}
      <rect x="38" y="9" width="18" height="6" fill="#AED6F1" opacity="0.85" rx="1" />
      {/* wheels */}
      <circle cx="14" cy="33" r="7" fill="#1a1a1a" />
      <circle cx="14" cy="33" r="3.5" fill="#555" />
      <circle cx="50" cy="33" r="7" fill="#1a1a1a" />
      <circle cx="50" cy="33" r="3.5" fill="#555" />
      {/* bumpers */}
      <rect x="1" y="20" width="4" height="6" fill={dark} rx="1" />
      <rect x="59" y="20" width="4" height="6" fill={dark} rx="1" />
      {/* headlight */}
      <rect x="59" y="21" width="3" height="4" fill="#F9E79F" rx="0.5" />
      <rect x="2" y="21" width="3" height="4" fill="#E74C3C" rx="0.5" />
      {/* bed rails */}
      <line x1="3" y1="16" x2="3" y2="32" stroke={dark} strokeWidth="1.5" />
      <line x1="35" y1="16" x2="35" y2="32" stroke={dark} strokeWidth="1.5" />
    </g>
  )
}

function Motorcycle({ color, dark }) {
  return (
    <g>
      {/* frame */}
      <line x1="22" y1="20" x2="42" y2="20" stroke={dark} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="30" y1="14" x2="42" y2="20" stroke={dark} strokeWidth="2" strokeLinecap="round" />
      <line x1="22" y1="20" x2="18" y2="16" stroke={dark} strokeWidth="2" strokeLinecap="round" />
      {/* body / tank */}
      <ellipse cx="32" cy="19" rx="10" ry="5" fill={color} />
      {/* seat */}
      <rect x="28" y="14" width="12" height="4" fill={dark} rx="2" />
      {/* handlebars */}
      <rect x="42" y="13" width="2" height="8" fill="#888" rx="1" />
      <rect x="40" y="13" width="6" height="2" fill="#888" rx="1" />
      {/* front fork */}
      <line x1="43" y1="20" x2="46" y2="28" stroke="#888" strokeWidth="2" strokeLinecap="round" />
      {/* wheels */}
      <circle cx="18" cy="28" r="8" fill="#1a1a1a" />
      <circle cx="18" cy="28" r="4" fill="#555" />
      <circle cx="46" cy="28" r="8" fill="#1a1a1a" />
      <circle cx="46" cy="28" r="4" fill="#555" />
      {/* exhaust */}
      <rect x="20" y="22" width="8" height="2" fill="#888" rx="1" />
      {/* headlight */}
      <circle cx="49" cy="22" r="3" fill="#F9E79F" />
      <circle cx="49" cy="22" r="2" fill="#FDFEFE" />
    </g>
  )
}

function Van({ color, dark }) {
  return (
    <g>
      {/* body — tall boxy van */}
      <rect x="4" y="10" width="56" height="22" fill={color} rx="2" />
      {/* front face (cab) */}
      <rect x="48" y="10" width="12" height="22" fill={dark} rx="2" />
      {/* windshield */}
      <rect x="50" y="12" width="8" height="10" fill="#AED6F1" opacity="0.85" rx="1" />
      {/* side windows */}
      <rect x="8" y="13" width="12" height="8" fill="#AED6F1" opacity="0.85" rx="1" />
      <rect x="22" y="13" width="12" height="8" fill="#AED6F1" opacity="0.85" rx="1" />
      <rect x="36" y="13" width="10" height="8" fill="#AED6F1" opacity="0.85" rx="1" />
      {/* wheels */}
      <circle cx="16" cy="33" r="7" fill="#1a1a1a" />
      <circle cx="16" cy="33" r="3.5" fill="#555" />
      <circle cx="48" cy="33" r="7" fill="#1a1a1a" />
      <circle cx="48" cy="33" r="3.5" fill="#555" />
      {/* bumpers */}
      <rect x="2" y="22" width="4" height="6" fill={dark} rx="1" />
      <rect x="58" y="22" width="4" height="6" fill={dark} rx="1" />
      {/* headlight */}
      <rect x="58" y="23" width="3" height="4" fill="#F9E79F" rx="0.5" />
      <rect x="3" y="23" width="3" height="4" fill="#E74C3C" rx="0.5" />
      {/* sliding door line */}
      <line x1="34" y1="10" x2="34" y2="32" stroke={dark} strokeWidth="0.8" />
      {/* door handle */}
      <rect x="38" y="20" width="4" height="1.5" fill={dark} rx="0.5" />
    </g>
  )
}

const SHAPES = { Sedan, SUV, Truck, Motorcycle, Van }

export default function VehicleIllustration({ vehicleType, vehicleId, size = 96 }) {
  const seed = vehicleId || 1
  const color = pick(BODY_COLORS, seed, 10)
  const dark = darken(color)
  const Shape = SHAPES[vehicleType] || Sedan

  return (
    <svg
      width={size}
      height={size * 0.6}
      viewBox="0 0 64 40"
      xmlns="http://www.w3.org/2000/svg"
      style={{ imageRendering: 'pixelated', display: 'block' }}
    >
      <rect width="64" height="40" fill="#e8e8e8" />
      <Shape color={color} dark={dark} />
      {/* ground shadow */}
      <ellipse cx="32" cy="39" rx="26" ry="1.5" fill="rgba(0,0,0,0.15)" />
    </svg>
  )
}
