import Icon from './Icon'
import { serviceAreas, business, whatsappLink } from '../data/siteData'

function ServiceAreas() {
  return (
    <section className="section service-areas section-dark">
      <div className="container areas-inner">
        <div>
          <span className="section-tag">Service Areas</span>
          <h2>We come to you</h2>
          <p>Doorstep service across these areas. Don't see yours? Message us — we may still cover it.</p>
          <a className="btn btn-light" href={whatsappLink('Hi, do you service my area? My pincode is: ')} target="_blank" rel="noreferrer">
            <Icon name="whatsapp" size={20} /> Check my area
          </a>
        </div>
        <ul className="areas-list">
          {serviceAreas.map((a) => (
            <li key={a}>
              <Icon name="pin" size={16} /> {a}
            </li>
          ))}
        </ul>
      </div>
      <span className="sr-only">Contact {business.phone} for service availability.</span>
    </section>
  )
}

export default ServiceAreas
