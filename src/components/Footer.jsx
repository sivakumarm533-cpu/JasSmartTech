import Icon from './Icon'
import { business, services, serviceAreas, whatsappLink } from '../data/siteData'

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'About Us', href: '#about' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Book Service', href: '#book' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

// TODO: replace '#' with your real social profile URLs.
const socials = [
  { icon: 'facebook', label: 'Facebook', href: '#' },
  { icon: 'instagram', label: 'Instagram', href: '#' },
  { icon: 'youtube', label: 'YouTube', href: '#' },
  { icon: 'whatsapp', label: 'WhatsApp', href: whatsappLink() },
]

function Footer() {
  const contacts = [
    { icon: 'phone', label: 'Call us 7 days', value: business.phone, href: business.phoneHref },
    { icon: 'mail', label: 'Email us', value: business.email, href: `mailto:${business.email}` },
    { icon: 'clock', label: 'Working hours', value: business.hours },
  ]

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-contact">
          {contacts.map((c) => {
            const Tag = c.href ? 'a' : 'div'
            return (
              <Tag key={c.label} className="footer-contact-item" {...(c.href ? { href: c.href } : {})}>
                <span className="footer-contact-icon">
                  <Icon name={c.icon} size={20} />
                </span>
                <span>
                  <small>{c.label}</small>
                  <strong>{c.value}</strong>
                </span>
              </Tag>
            )
          })}
        </div>

        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#home" className="navbar-logo">
              Jas<span>SmartTech</span>
            </a>
            <p>Doorstep AC and washing machine service with certified technicians, genuine parts and a 30-day warranty.</p>
            <div className="socials">
              {socials.map((s) => (
                <a key={s.label} href={s.href} aria-label={s.label} target="_blank" rel="noreferrer">
                  <Icon name={s.icon} size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4>Quick Links</h4>
            <ul>
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>AC Services</h4>
            <ul>
              {services.ac.map((s) => (
                <li key={s.title}>
                  <a href="#services">{s.title}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Washing Machine</h4>
            <ul>
              {services.washing.map((s) => (
                <li key={s.title}>
                  <a href="#services">{s.title}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Service Areas</h4>
            <ul className="footer-areas">
              {serviceAreas.slice(0, 8).map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-wordmark" aria-hidden="true">
        JasSmartTech
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>© {new Date().getFullYear()} {business.name}. All rights reserved.</p>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#home" className="back-to-top" aria-label="Back to top">
              <Icon name="chevron" size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
