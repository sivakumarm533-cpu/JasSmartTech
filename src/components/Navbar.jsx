import { useEffect, useState } from 'react'
import Icon from './Icon'
import LogoMark from './LogoMark'
import { business, whatsappLink } from '../data/siteData'

const links = [
  { label: 'Home', href: '#home', icon: 'home' },
  { label: 'Services', href: '#services', icon: 'grid' },
  { label: 'About', href: '#about', icon: 'info' },
  { label: 'Pricing', href: '#pricing', icon: 'tag' },
  { label: 'FAQ', href: '#faq', icon: 'help' },
  { label: 'Contact', href: '#contact', icon: 'phone' },
]

function Logo() {
  return (
    <a href="#home" className="navbar-logo" aria-label={`${business.name} home`}>
      <LogoMark size={42} />
      <span className="logo-text">
        <span className="logo-name">
          Jas<span>SmartTech</span>
        </span>
        <small>AC & Washer Experts</small>
      </span>
    </a>
  )
}

function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('#home')

  // Shrink + glass effect once the page scrolls.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Highlight the link of the section currently in the middle of the screen.
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive('#' + e.target.id))
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    links.forEach((l) => {
      const el = document.querySelector(l.href)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  // Mobile drawer: lock page scroll and close on Escape.
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-inner">
        <Logo />

        <nav className="navbar-nav" aria-label="Main">
          <ul className="navbar-links">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={active === link.href ? 'active' : ''}
                  aria-current={active === link.href ? 'true' : undefined}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="navbar-actions">
          <a href={business.phoneHref} className="navbar-call">
            <span className="navbar-call-icon">
              <Icon name="phone" size={18} />
            </span>
            <span className="navbar-call-text">
              <small>Call us now</small>
              <strong>{business.phone}</strong>
            </span>
          </a>
          <a href="#book" className="btn navbar-btn">
            <Icon name="calendar" size={18} />
            <span>Book Now</span>
          </a>
          <button
            className={`navbar-toggle ${open ? 'active' : ''}`}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-drawer"
            onClick={() => setOpen(!open)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div className={`drawer-overlay ${open ? 'open' : ''}`} onClick={close} aria-hidden="true" />
      <aside id="mobile-drawer" className={`drawer ${open ? 'open' : ''}`} aria-hidden={!open} inert={!open}>
        <div className="drawer-head">
          <Logo />
          <button className="drawer-close" aria-label="Close menu" onClick={close}>
            <Icon name="close" size={22} />
          </button>
        </div>

        <ul className="drawer-links">
          {links.map((link, i) => (
            <li key={link.href} style={{ '--i': i }}>
              <a href={link.href} onClick={close} className={active === link.href ? 'active' : ''}>
                <span className="drawer-link-icon">
                  <Icon name={link.icon} size={20} />
                </span>
                {link.label}
                <Icon name="chevron" size={18} className="drawer-link-arrow" />
              </a>
            </li>
          ))}
        </ul>

        <div className="drawer-foot">
          <p className="drawer-hours">
            <Icon name="clock" size={16} /> {business.hours}
          </p>
          <div className="drawer-quick">
            <a href={business.phoneHref} className="btn btn-outline">
              <Icon name="phone" size={18} /> Call
            </a>
            <a href={whatsappLink()} target="_blank" rel="noreferrer" className="btn btn-whatsapp">
              <Icon name="whatsapp" size={18} /> WhatsApp
            </a>
          </div>
          <a href="#book" className="btn btn-block" onClick={close}>
            <Icon name="calendar" size={18} /> Book a Service
          </a>
        </div>
      </aside>
    </header>
  )
}

export default Navbar
