// Animated illustration for the booking panel:
// AC -> snow falling from the indoor unit, Washing Machine -> bubbles rising from the drum.

import { useEffect, useRef, useState } from 'react'
import Icon from './Icon'

// Small seeded random generator so particles look random but stay the same on every render.
function seeded(seed) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

const rand = seeded(42)
const snow = Array.from({ length: 28 }, () => ({
  left: 8 + rand() * 84,
  size: 4 + rand() * 8,
  delay: rand() * -6,
  duration: 4 + rand() * 4,
  drift: (rand() - 0.5) * 60,
  flake: rand() > 0.65,
}))

const bubbles = Array.from({ length: 18 }, () => ({
  left: 22 + rand() * 56,
  size: 10 + rand() * 26,
  delay: rand() * -6,
  duration: 3.5 + rand() * 3.5,
  drift: (rand() - 0.5) * 50,
}))

function AcScene() {
  return (
    <div className="scene scene-ac">
      <svg className="scene-ac-unit" viewBox="0 0 240 84" aria-hidden="true">
        <rect x="2" y="2" width="236" height="66" rx="16" fill="#fff" />
        <rect x="2" y="50" width="236" height="18" fill="#e6efff" />
        <rect x="2" y="54" width="236" height="14" rx="10" fill="#e6efff" />
        <rect x="24" y="57" width="192" height="4" rx="2" fill="#b9cdf3" />
        <circle cx="210" cy="22" r="5" fill="#22c55e" />
        <text x="22" y="34" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="18" fill="#4361ee">
          16°C
        </text>
      </svg>
      <div className="particles" aria-hidden="true">
        {snow.map((p, i) => (
          <span
            key={i}
            className={p.flake ? 'snow flake' : 'snow'}
            style={{
              '--x': `${p.left}%`,
              '--s': `${p.flake ? p.size * 2 : p.size}px`,
              '--d': `${p.duration}s`,
              '--delay': `${p.delay}s`,
              '--drift': `${p.drift}px`,
            }}
          >
            {p.flake ? '❄' : null}
          </span>
        ))}
      </div>
    </div>
  )
}

function WasherScene() {
  return (
    <div className="scene scene-wm">
      <div className="particles" aria-hidden="true">
        {bubbles.map((p, i) => (
          <span
            key={i}
            className="bubble"
            style={{
              '--x': `${p.left}%`,
              '--s': `${p.size}px`,
              '--d': `${p.duration}s`,
              '--delay': `${p.delay}s`,
              '--drift': `${p.drift}px`,
            }}
          />
        ))}
      </div>
      <svg className="scene-wm-unit" viewBox="0 0 160 180" aria-hidden="true">
        <rect x="4" y="4" width="152" height="172" rx="18" fill="#fff" />
        <rect x="4" y="4" width="152" height="34" rx="18" fill="#e6efff" />
        <rect x="4" y="24" width="152" height="14" fill="#e6efff" />
        <circle cx="28" cy="21" r="6" fill="#4361ee" />
        <rect x="44" y="16" width="44" height="10" rx="5" fill="#b9cdf3" />
        <circle cx="132" cy="21" r="8" fill="#ff7a00" />
        <circle cx="80" cy="106" r="52" fill="#dbe6fb" />
        <circle cx="80" cy="106" r="41" fill="#4361ee" />
        <g className="scene-drum">
          <path d="M47 114c11-9 22 9 33 0s22 9 33 0v14a41 41 0 0 1-66 0z" fill="#60a5fa" />
          <circle cx="64" cy="88" r="5" fill="#fff" opacity=".75" />
          <circle cx="94" cy="96" r="3.5" fill="#fff" opacity=".6" />
          <circle cx="78" cy="78" r="2.5" fill="#fff" opacity=".6" />
        </g>
        <circle cx="80" cy="106" r="41" fill="none" stroke="#fff" strokeWidth="3" opacity=".5" />
      </svg>
    </div>
  )
}

// Perk cards that take turns sliding in at the bottom of the scene (pure CSS timing).
function PerkCarousel({ perks }) {
  return (
    <div className="scene-perks" style={{ '--count': perks.length }}>
      <ul>
        {perks.map((p, i) => (
          <li key={p.title} className="scene-perk" style={{ '--n': i }}>
            <span className="scene-perk-icon">
              <Icon name={p.icon} size={20} />
            </span>
            <span>
              <strong>{p.title}</strong>
              <small>{p.text}</small>
            </span>
          </li>
        ))}
      </ul>
      <div className="scene-perk-dots" aria-hidden="true">
        {perks.map((p, i) => (
          <span key={p.title} style={{ '--n': i }} />
        ))}
      </div>
    </div>
  )
}

function BookingScene({ appliance, perks = [] }) {
  const isWasher = appliance === 'Washing Machine'
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  // Start the 3s hint only once the scene scrolls into view.
  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) return setInView(true)
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { threshold: 0.5 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className={`booking-scene ${isWasher ? 'is-washer' : 'is-ac'}`}>
      <div aria-hidden="true">
        {/* key forces a fresh fade-in when the appliance changes */}
        {isWasher ? <WasherScene key="wm" /> : <AcScene key="ac" />}
        {inView && !appliance && <span className="scene-hint">Pick an appliance to see it change →</span>}
      </div>
      {perks.length > 0 && <PerkCarousel perks={perks} />}
    </div>
  )
}

export default BookingScene
