import Icon from './Icon'
import { testimonials } from '../data/siteData'

function Testimonials() {
  return (
    <section className="section testimonials">
      <div className="container">
        <div className="section-head">
          <span className="section-tag">Testimonials</span>
          <h2>What our customers say</h2>
        </div>

        <div className="testimonial-grid">
          {testimonials.map((t) => (
            <figure className="testimonial" key={t.name}>
              <div className="stars" aria-label={`${t.rating} out of 5 stars`}>
                {Array.from({ length: 5 }, (_, i) => (
                  <Icon key={i} name="star" size={18} className={i < t.rating ? 'on' : 'off'} />
                ))}
              </div>
              <blockquote>“{t.text}”</blockquote>
              <figcaption>
                <span className="avatar">{t.name.charAt(0)}</span>
                <span>
                  <strong>{t.name}</strong>
                  <small>{t.area}</small>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
