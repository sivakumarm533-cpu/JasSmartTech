import { useState } from 'react'
import Icon from './Icon'
import { faqs, business, whatsappLink } from '../data/siteData'

function FAQ() {
  const [open, setOpen] = useState(0)

  return (
    <section className="section faq" id="faq">
      <div className="container faq-inner">
        <div className="faq-intro">
          <span className="section-tag">FAQ</span>
          <h2>Frequently asked questions</h2>
          <p>Quick answers to what customers ask us most. Can't find yours?</p>

          <div className="faq-help">
            <h3>Still have a question?</h3>
            <p>Talk to our support team — we reply within 10 minutes.</p>
            <div className="faq-help-actions">
              <a href={business.phoneHref} className="btn">
                <Icon name="phone" size={18} /> Call
              </a>
              <a href={whatsappLink('Hi, I have a question.')} target="_blank" rel="noreferrer" className="btn btn-whatsapp">
                <Icon name="whatsapp" size={18} /> WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="faq-list">
          {faqs.map((f, i) => {
            const isOpen = open === i
            return (
              <div className={`faq-item ${isOpen ? 'open' : ''}`} key={f.q}>
                <button
                  className="faq-q"
                  aria-expanded={isOpen}
                  aria-controls={`faq-a-${i}`}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                >
                  {f.q}
                  <Icon name="chevron" size={20} />
                </button>
                <div className="faq-a" id={`faq-a-${i}`} role="region">
                  <div>
                    <p>{f.a}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FAQ
