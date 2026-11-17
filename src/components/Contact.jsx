import Icon from './Icon'
import { business, whatsappLink } from '../data/siteData'

function Contact() {
  const items = [
    { icon: 'phone', label: 'Call us', value: business.phone, href: business.phoneHref },
    { icon: 'whatsapp', label: 'WhatsApp', value: business.phone, href: whatsappLink(), external: true },
    { icon: 'mail', label: 'Email', value: business.email, href: `mailto:${business.email}` },
    { icon: 'pin', label: 'Address', value: business.address, href: business.mapLink, external: true },
    { icon: 'clock', label: 'Working hours', value: business.hours },
  ]

  return (
    <section className="section contact" id="contact">
      <div className="container">
        <div className="contact-cta">
          <div>
            <span className="section-tag">Contact Us</span>
            <h2>Appliance broke down? We'll be there today.</h2>
            <p>Reach us any way you like — we usually respond within 10 minutes.</p>
          </div>
          <div className="contact-cta-actions">
            <a href={business.phoneHref} className="btn btn-light">
              <Icon name="phone" size={18} /> {business.phone}
            </a>
            <a href="#book" className="btn btn-ghost">Book Online</a>
          </div>
        </div>

        <div className="contact-grid">
          {items.map((c) => {
            const content = (
              <>
                <div className="icon-box">
                  <Icon name={c.icon} />
                </div>
                <div>
                  <small>{c.label}</small>
                  <strong>{c.value}</strong>
                </div>
              </>
            )
            return c.href ? (
              <a
                key={c.label}
                className="contact-card"
                href={c.href}
                {...(c.external ? { target: '_blank', rel: 'noreferrer' } : {})}
              >
                {content}
              </a>
            ) : (
              <div key={c.label} className="contact-card">
                {content}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Contact
