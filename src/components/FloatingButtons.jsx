import Icon from './Icon'
import { business, whatsappLink } from '../data/siteData'

function FloatingButtons() {
  return (
    <div className="floating-buttons">
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
