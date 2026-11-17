import Icon from './Icon'
import { services, amcPlans } from '../data/siteData'

const rateCard = [
  ...services.ac.map((s) => ({ ...s, appliance: 'AC' })),
  ...services.washing.map((s) => ({ ...s, appliance: 'Washing Machine' })),
]

function Pricing({ onBook }) {
  return (
    <section className="section pricing" id="pricing">
      <div className="container">
        <div className="section-head">
          <span className="section-tag">Pricing</span>
          <h2>Simple, transparent pricing</h2>
          <p>Starting prices below. Spare parts are charged extra at MRP, only with your approval.</p>
        </div>

        <div className="rate-card">
          {rateCard.map((s) => (
            <div className="rate-row" key={s.appliance + s.title}>
              <span className="rate-name">
                <small>{s.appliance}</small>
                {s.title}
              </span>
              <span className="rate-price">₹{s.price}</span>
            </div>
          ))}
        </div>
        <p className="rate-note">Visiting charge ₹199 — waived if you proceed with the service.</p>

        <h3 className="amc-title">Annual Maintenance Contract (AMC) Plans</h3>
        <div className="amc-grid">
          {amcPlans.map((p) => (
            <div className={`amc-card ${p.popular ? 'popular' : ''}`} key={p.name}>
              {p.popular && <span className="amc-ribbon">Most Popular</span>}
              <h4>{p.name}</h4>
              <p className="amc-desc">{p.desc}</p>
              <p className="amc-price">
                ₹{p.price.toLocaleString('en-IN')}
                <span>{p.period}</span>
              </p>
              <ul>
                {p.features.map((f) => (
                  <li key={f}>
                    <Icon name="check" size={18} /> {f}
                  </li>
                ))}
              </ul>
              <button
                className={`btn ${p.popular ? '' : 'btn-outline'}`}
                onClick={() => onBook('AC', `AMC – ${p.name} Plan`)}
              >
                Choose {p.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Pricing
