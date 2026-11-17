import { useState } from 'react'
import Icon from './Icon'
import { business } from '../data/siteData'

const links = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <a href="#home" className="navbar-logo">
          Jas<span>SmartTech</span>
        </a>

        <button
          className={`navbar-toggle ${open ? 'active' : ''}`}
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`navbar-menu ${open ? 'open' : ''}`}>
          <ul className="navbar-links">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={() => setOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a href={business.phoneHref} className="navbar-phone">
            <Icon name="phone" size={18} />
            {business.phone}
          </a>
          <a href="#book" className="btn navbar-btn" onClick={() => setOpen(false)}>
            Book Now
          </a>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
