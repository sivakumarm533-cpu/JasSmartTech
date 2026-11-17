import { useState } from 'react'
import Icon from './Icon'
import { services } from '../data/siteData'

const tabs = [
  { key: 'ac', label: 'AC Services', icon: 'ac', appliance: 'AC' },
  { key: 'washing', label: 'Washing Machine', icon: 'washer', appliance: 'Washing Machine' },
]

function Services({ onBook }) {
  const [active, setActive] = useState('ac')
  const tab = tabs.find((t) => t.key === active)

  return (
    <section className="section services" id="services">
      <div className="container">
        <div className="services-head">
          <div>
            <span className="section-tag">Our Services</span>
            <h2>Everything your AC & washing machine needs</h2>
            <p>From installation to complex PCB repairs — one call does it all.</p>
          </div>

          <div className="tabs" role="tablist">
            {tabs.map((t) => (
              <button
                key={t.key}
                role="tab"
                aria-selected={active === t.key}
                className={`tab ${active === t.key ? 'active' : ''}`}
                onClick={() => setActive(t.key)}
              >
                <Icon name={t.icon} size={20} /> {t.label}
                <span className="tab-count">{services[t.key].length}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="card-grid" key={active}>
          {services[active].map((s, i) => (
            <article
              className="service-card"
              key={s.title}
              style={{ '--i': i }}
              onClick={() => onBook(tab.appliance, s.title)}
            >
              <span className="service-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="icon-box">
                <Icon name={s.icon} size={26} />
              </span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <span className="service-card-foot">
                <span className="price">
                  Starts at <strong>₹{s.price}</strong>
                </span>
                <button type="button" className="service-arrow" aria-label={`Book ${s.title}`}>
                  <Icon name="chevron" size={20} />
                </button>
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
