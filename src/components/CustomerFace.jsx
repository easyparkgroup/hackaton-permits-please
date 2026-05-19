// Deterministic pixel-art passport photo generated from a numeric seed

const SKIN_TONES = ['#FDDBB4', '#F5C5A3', '#D4956A', '#A0674A', '#7A4F3A', '#C68642']
const HAIR_COLORS = ['#1a1a1a', '#4a2c0a', '#8B5E3C', '#C49A3C', '#D4A017', '#E8E8E8', '#8B0000']
const EYE_COLORS = ['#3d2b1f', '#2e5e8e', '#2e7d32', '#5d4037']

const HAIR_STYLES = [
  // short flat top
  (c) => <rect x="8" y="4" width="16" height="6" fill={c} rx="1" />,
  // long hair (sides)
  (c) => (
    <>
      <rect x="8" y="4" width="16" height="8" fill={c} rx="2" />
      <rect x="6" y="10" width="4" height="10" fill={c} rx="1" />
      <rect x="22" y="10" width="4" height="10" fill={c} rx="1" />
    </>
  ),
  // bald / buzz cut
  (c) => <rect x="9" y="5" width="14" height="3" fill={c} rx="2" />,
  // curly / afro
  (c) => (
    <>
      <circle cx="16" cy="7" r="8" fill={c} />
      <rect x="8" y="7" width="16" height="6" fill={c} />
    </>
  ),
  // side part
  (c) => (
    <>
      <rect x="8" y="4" width="16" height="7" fill={c} rx="1" />
      <rect x="8" y="4" width="5" height="9" fill={c} rx="1" />
    </>
  ),
  // ponytail
  (c) => (
    <>
      <rect x="8" y="4" width="16" height="7" fill={c} rx="2" />
      <rect x="22" y="8" width="4" height="14" fill={c} rx="2" />
    </>
  ),
]

const ACCESSORIES = [
  null,
  // glasses
  (color) => (
    <g stroke="#333" strokeWidth="1" fill="none">
      <rect x="9" y="16" width="6" height="4" rx="1" />
      <rect x="17" y="16" width="6" height="4" rx="1" />
      <line x1="15" y1="18" x2="17" y2="18" />
      <line x1="9" y1="18" x2="7" y2="18" />
      <line x1="23" y1="18" x2="25" y2="18" />
    </g>
  ),
  // hat
  (color) => (
    <>
      <rect x="7" y="6" width="18" height="3" fill="#333" rx="1" />
      <rect x="10" y="3" width="12" height="5" fill="#333" rx="1" />
    </>
  ),
  // earrings
  () => (
    <>
      <circle cx="8" cy="20" r="1.5" fill="#FFD700" />
      <circle cx="24" cy="20" r="1.5" fill="#FFD700" />
    </>
  ),
]

const EXPRESSIONS = [
  // neutral
  (skin) => <path d="M13 24 Q16 25 19 24" stroke="#333" strokeWidth="1.2" fill="none" strokeLinecap="round" />,
  // slight smile
  (skin) => <path d="M13 24 Q16 27 19 24" stroke="#333" strokeWidth="1.2" fill="none" strokeLinecap="round" />,
  // frown
  (skin) => <path d="M13 25 Q16 23 19 25" stroke="#333" strokeWidth="1.2" fill="none" strokeLinecap="round" />,
  // open smile
  (skin) => (
    <>
      <path d="M13 24 Q16 27 19 24" stroke="#333" strokeWidth="1.2" fill="white" strokeLinecap="round" />
      <line x1="15" y1="25" x2="17" y2="25" stroke="#333" strokeWidth="0.8" />
    </>
  ),
]

function seededRand(seed, index) {
  // simple deterministic hash
  let h = (seed * 2654435761 + index * 40503) >>> 0
  h = ((h ^ (h >>> 16)) * 0x45d9f3b) >>> 0
  h = ((h ^ (h >>> 16)) * 0x45d9f3b) >>> 0
  return (h ^ (h >>> 16)) >>> 0
}

function pick(arr, seed, index) {
  return arr[seededRand(seed, index) % arr.length]
}

export default function CustomerFace({ vehicleId, size = 80 }) {
  const seed = vehicleId || 1

  const skin = pick(SKIN_TONES, seed, 0)
  const hairColor = pick(HAIR_COLORS, seed, 1)
  const eyeColor = pick(EYE_COLORS, seed, 2)
  const hairStyleFn = pick(HAIR_STYLES, seed, 3)
  const expressionFn = pick(EXPRESSIONS, seed, 4)
  const accessoryFn = pick(ACCESSORIES, seed, 5)

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      style={{ imageRendering: 'pixelated', display: 'block' }}
    >
      {/* background (photo backdrop) */}
      <rect width="32" height="32" fill="#c8d8e8" />

      {/* neck */}
      <rect x="13" y="26" width="6" height="6" fill={skin} />

      {/* head */}
      <rect x="8" y="10" width="16" height="18" fill={skin} rx="3" />

      {/* hair (behind head for long styles) */}
      {hairStyleFn(hairColor)}

      {/* eyes */}
      <rect x="10" y="16" width="4" height="4" fill="white" rx="1" />
      <rect x="18" y="16" width="4" height="4" fill="white" rx="1" />
      <rect x="11" y="17" width="2" height="2" fill={eyeColor} rx="0.5" />
      <rect x="19" y="17" width="2" height="2" fill={eyeColor} rx="0.5" />
      {/* pupils */}
      <rect x="11.5" y="17.5" width="1" height="1" fill="#000" />
      <rect x="19.5" y="17.5" width="1" height="1" fill="#000" />

      {/* nose */}
      <rect x="15" y="20" width="2" height="2" fill={skin} style={{ filter: 'brightness(0.85)' }} rx="0.5" />

      {/* expression */}
      {expressionFn(skin)}

      {/* ears */}
      <rect x="6" y="17" width="3" height="4" fill={skin} rx="1" />
      <rect x="23" y="17" width="3" height="4" fill={skin} rx="1" />

      {/* accessory */}
      {accessoryFn && accessoryFn(hairColor)}
    </svg>
  )
}
