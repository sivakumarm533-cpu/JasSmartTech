import { useState } from 'react'
import Icon from './Icon'
import { business } from '../data/siteData'

const trust = [
  { icon: 'clock', title: 'Same-day', text: 'service' },
  { icon: 'shield', title: '30-day', text: 'warranty' },
  { icon: 'rupee', title: 'Pay after', text: 'service' },
]

function Hero({ onBook }) {
  const [appliance, setAppliance] = useState('AC')
  const [pincode, setPincode] = useState('')

  const quickBook = (e) => {
    e.preventDefault()
    onBook(appliance, '', { pincode: pincode.replace(/\D/g, '').slice(0, 6) })
  }

  return (
    <section className="hero" id="home">
      <div className="hero-shape hero-shape-1" aria-hidden="true" />
      <div className="hero-shape hero-shape-2" aria-hidden="true" />

      <div className="container hero-inner">
        <div className="hero-content">
          <div className="hero-rating">
            <div className="hero-avatars" aria-hidden="true">
              <span>R</span>
              <span>K</span>
              <span>M</span>
            </div>
            <div>
              <strong>4.8/5</strong> from 5,000+ happy homes
            </div>
          </div>

          <h1>
            Fast <span className="hero-highlight">Washing Machine & AC</span> Repair at Your Doorstep
          </h1>
          <p className="hero-text">
            Certified technicians, genuine spare parts and upfront pricing. Book in 60 seconds and get your
            appliance fixed today.
          </p>

          <form className="hero-quick" onSubmit={quickBook}>
            <div className="hero-quick-toggle" role="radiogroup" aria-label="Appliance">
              {['AC', 'Washing Machine'].map((a) => (
                <button
                  type="button"
                  key={a}
                  role="radio"
                  aria-checked={appliance === a}
                  className={appliance === a ? 'active' : ''}
                  onClick={() => setAppliance(a)}
                >
                  <Icon name={a === 'AC' ? 'ac' : 'washer'} size={18} />
                  {a === 'AC' ? 'AC' : 'Washer'}
                </button>
              ))}
            </div>
            <label className="hero-quick-pin">
              <Icon name="pin" size={18} />
              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                placeholder="Your pincode"
                aria-label="Pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
              />
            </label>
            <button type="submit" className="btn">Book Service</button>
          </form>

          <div className="hero-call">
            or call us at{' '}
            <a href={business.phoneHref}>
              <Icon name="phone" size={16} /> {business.phone}
            </a>
          </div>

          <ul className="hero-trust">
            {trust.map((t) => (
              <li key={t.title}>
                <span className="hero-trust-icon">
                  <Icon name={t.icon} size={20} />
                </span>
                <span>
                  <strong>{t.title}</strong> {t.text}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="hero-stage">
            {/* Split AC illustration */}
            <svg className="hero-ac" viewBox="0 0 320 120">
              <rect x="4" y="4" width="312" height="92" rx="20" fill="#fff" />
              <rect x="4" y="68" width="312" height="28" rx="0" fill="#eef4ff" />
              <rect x="4" y="76" width="312" height="20" rx="14" fill="#eef4ff" />
              <rect x="30" y="80" width="260" height="6" rx="3" fill="#c7d7f5" />
              <circle cx="270" cy="32" r="6" fill="#22c55e" />
              <rect x="210" y="27" width="44" height="10" rx="5" fill="#dbe6fb" />
              <text x="30" y="44" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="22" fill="#4361ee">18°C</text>
              <g className="hero-air" stroke="#fff" strokeWidth="4" strokeLinecap="round" fill="none">
                <path d="M70 104c10 6 20 6 30 0" />
                <path d="M145 108c10 6 20 6 30 0" />
                <path d="M220 104c10 6 20 6 30 0" />
              </g>
            </svg>

            {/* Front-load washer illustration */}
            <svg className="hero-wm" viewBox="0 0 200 240">
              <rect x="6" y="6" width="188" height="228" rx="22" fill="#fff" />
              <rect x="6" y="6" width="188" height="44" rx="22" fill="#eef4ff" />
              <rect x="6" y="30" width="188" height="20" fill="#eef4ff" />
              <circle cx="36" cy="28" r="8" fill="#4361ee" />
              <rect x="56" y="22" width="56" height="12" rx="6" fill="#c7d7f5" />
              <circle cx="164" cy="28" r="10" fill="#ff7a00" />
              <circle cx="100" cy="140" r="66" fill="#dbe6fb" />
              <circle cx="100" cy="140" r="52" fill="#4361ee" />
              <g className="hero-drum">
                <path d="M60 150c15-12 30 12 45 0s30 12 45 0v20a52 52 0 0 1-90 0z" fill="#4d94ff" />
                <circle cx="82" cy="118" r="6" fill="#fff" opacity=".7" />
                <circle cx="116" cy="128" r="4" fill="#fff" opacity=".6" />
                <circle cx="96" cy="104" r="3" fill="#fff" opacity=".6" />
              </g>
              <circle cx="100" cy="140" r="52" fill="none" stroke="#fff" strokeWidth="4" opacity=".5" />
            </svg>

            {/* Toolbox */}
            <svg className="hero-tools" viewBox="0 0 120 90">
              <rect x="8" y="26" width="104" height="58" rx="10" fill="#ff7a00" />
              <rect x="8" y="44" width="104" height="8" fill="#e56a00" />
              <path d="M42 26v-10a6 6 0 0 1 6-6h24a6 6 0 0 1 6 6v10" stroke="#ff7a00" strokeWidth="7" fill="none" />
              <rect x="52" y="40" width="16" height="16" rx="3" fill="#fff" />
            </svg>
          </div>

          <div className="hero-float hero-float-1">
            <span className="hero-float-icon green">
              <Icon name="check" size={18} />
            </span>
            <div>
              <strong>Technician on the way</strong>
              <small>Arriving in 25 mins</small>
            </div>
          </div>

          <div className="hero-float hero-float-2">
            <span className="hero-float-icon orange">
              <Icon name="star" size={18} />
            </span>
            <div>
              <strong>4.8 rating</strong>
              <small>2,300+ reviews</small>
            </div>
          </div>

          <div className="hero-float hero-float-3">
            <span className="hero-float-icon blue">
              <Icon name="shield" size={18} />
            </span>
            <div>
              <strong>30-day warranty</strong>
              <small>On every repair</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
