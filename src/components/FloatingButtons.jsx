import { useEffect, useState } from 'react'
import Icon from './Icon'
import { business, whatsappLink } from '../data/siteData'

function FloatingButtons() {
  // Back-to-top only appears once the visitor has scrolled down a bit.
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="floating-buttons">
      <a
        className={`float-btn float-top${showTop ? ' visible' : ''}`}
        href="#home"
        aria-label="Back to top"
        tabIndex={showTop ? 0 : -1}
        aria-hidden={!showTop}
      >
        <Icon name="chevron" size={22} />
      </a>
      <a className="float-btn float-call" href={business.phoneHref} aria-label="Call us">
        <Icon name="phone" size={24} />
      </a>
      <a className="float-btn float-whatsapp" href={whatsappLink()} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp">
        <Icon name="whatsapp" size={28} />
      </a>
    </div>
  )
}

export default FloatingButtons
