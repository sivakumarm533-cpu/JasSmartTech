import Icon from './Icon'
import { business } from '../data/siteData'

function TopBar() {
  return (
    <div className="topbar">
      <div className="container topbar-inner">
        <div className="topbar-info">
          <a href={business.mapLink} target="_blank" rel="noreferrer" className="topbar-item">
            <Icon name="pin" size={15} />
            <span>{business.location}</span>
          </a>
          <span className="topbar-item">
            <Icon name="clock" size={15} />
            <span>{business.hours}</span>
          </span>
        </div>
        <div className="topbar-contact">
          <a href={`mailto:${business.email}`} className="topbar-item topbar-email">
            <Icon name="mail" size={15} />
            <span>{business.email}</span>
          </a>
          <a href={business.phoneHref} className="topbar-item">
            <Icon name="phone" size={15} />
            <span>{business.phone}</span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default TopBar
