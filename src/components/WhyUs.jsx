import Icon from './Icon'
import { whyUs } from '../data/siteData'

const stats = [
  { value: '5,000+', label: 'Happy customers' },
  { value: '25+', label: 'Expert technicians' },
  { value: '4.8★', label: 'Average rating' },
  { value: '60 min', label: 'Avg. arrival time' },
]

function WhyUs() {
  return (
    <section className="section why-us" id="about">
      <div className="container why-inner">
        <div className="why-panel">
          <div className="why-panel-top">
            <span className="why-years">
              8<sup>+</sup>
            </span>
            <span className="why-years-label">
              Years of trusted
              <br />
              appliance service
            </span>
          </div>

          <div className="stats">
            {stats.map((s) => (
              <div className="stat" key={s.label}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>

          <div className="why-promise">
            <Icon name="shield" size={28} />
            <p>
              <strong>Our promise:</strong> if the same problem comes back within 30 days, we fix it free.
            </p>
          </div>
        </div>

        <div className="why-content">
          <span className="section-tag">Why Choose Us</span>
          <h2>Repairs done right, the first time</h2>
          <p className="why-lead">
            JasSmartTech is a local appliance service team focused on honest pricing and quality workmanship.
          </p>

          <ul className="why-list">
            {whyUs.map((w) => (
              <li key={w.title}>
                <span className="icon-box">
                  <Icon name={w.icon} />
                </span>
                <div>
                  <h3>{w.title}</h3>
                  <p>{w.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default WhyUs
