import { useState } from 'react'
import Icon from './Icon'
import { business } from '../data/siteData'

function OfferBanner() {
  const [visible, setVisible] = useState(true)
  if (!visible) return null

  return (
    <div className="offer-banner">
      <div className="container offer-inner">
        <p>
          <strong>🔥 Offer:</strong> {business.offer}{' '}
          <a href="#book">Book now →</a>
        </p>
        <button className="offer-close" aria-label="Close offer" onClick={() => setVisible(false)}>
          <Icon name="close" size={18} />
        </button>
      </div>
    </div>
  )
}

export default OfferBanner
