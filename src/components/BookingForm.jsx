import { useState } from 'react'
import Icon from './Icon'
import BookingScene from './BookingScene'
import { business, services, timeSlots, whatsappLink } from '../data/siteData'

const appliances = [
  { value: 'AC', icon: 'ac', label: 'AC' },
  { value: 'Washing Machine', icon: 'washer', label: 'Washing Machine' },
]

const serviceOptions = {
  AC: services.ac.map((s) => s.title),
  'Washing Machine': services.washing.map((s) => s.title),
}

// service title -> { price, icon } for showing prices in the form
const priceInfo = Object.fromEntries([...services.ac, ...services.washing].map((s) => [s.title, s]))

const steps = ['Service', 'Time', 'Details']

const empty = { appliance: '', service: '', day: '', time: '', name: '', phone: '', pincode: '', note: '' }

// "9 AM – 11 AM" -> 9, "1 PM – 3 PM" -> 13
const startHour = (slot) => {
  const [, h, ap] = slot.match(/(\d+)\s*(AM|PM)/i)
  return (Number(h) % 12) + (ap.toUpperCase() === 'PM' ? 12 : 0)
}

// Today (only if a slot is still open), tomorrow and the day after.
function buildDays() {
  const now = new Date()
  const days = []
  for (let i = 0; i < 3; i++) {
    const d = new Date(now)
    d.setDate(now.getDate() + i)
    const openSlots = i === 0 ? timeSlots.filter((s) => startHour(s) > now.getHours() + 1) : timeSlots
    if (!openSlots.length) continue
    days.push({
      value: d.toISOString().split('T')[0],
      label: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-IN', { weekday: 'short' }),
      sub: d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
      slots: openSlots,
    })
  }
  return days
}

function validateDetails(f) {
  const e = {}
  if (f.name.trim().length < 2) e.name = 'Please enter your name'
  const digits = f.phone.replace(/\D/g, '').replace(/^(91|0)(?=\d{10}$)/, '')
  if (!/^[6-9]\d{9}$/.test(digits)) e.phone = 'Enter a valid 10-digit mobile number'
  if (!/^\d{6}$/.test(f.pincode)) e.pincode = 'Enter a 6-digit pincode'
  return e
}

function buildMessage(b) {
  return [
    'New Service Booking',
    `Booking ID: ${b.id}`,
    `Name: ${b.name}`,
    `Phone: ${b.phone}`,
    `Pincode: ${b.pincode}`,
    `Appliance: ${b.appliance}`,
    `Service: ${b.service}`,
    `Slot: ${b.dayLabel}, ${b.time}`,
    b.note && `Note: ${b.note}`,
  ]
    .filter(Boolean)
    .join('\n')
}

const perks = [
  { icon: 'rupee', title: 'No advance payment', text: 'Pay only after the job is done' },
  { icon: 'clock', title: 'Free rescheduling', text: 'Change your slot any time' },
  { icon: 'shield', title: 'Upfront quote', text: 'Approve the price before work starts' },
]

function BookingForm({ preset, onSuccess }) {
  const [form, setForm] = useState(empty)
  const [step, setStep] = useState(0)
  const [errors, setErrors] = useState({})
  const [showNote, setShowNote] = useState(false)
  const [submitted, setSubmitted] = useState(null)
  const [lastPreset, setLastPreset] = useState(null)
  const [days] = useState(buildDays)

  // A "Book" button elsewhere on the page prefills the form and skips ahead.
  if (preset && preset !== lastPreset) {
    setLastPreset(preset)
    setForm((f) => ({
      ...f,
      appliance: preset.appliance,
      service: preset.service || '',
      ...(preset.pincode ? { pincode: preset.pincode } : {}),
    }))
    setStep(preset.service ? 1 : 0)
    setSubmitted(null)
  }

  const set = (name, value) => {
    setForm((f) => ({
      ...f,
      [name]: value,
      ...(name === 'appliance' && value !== f.appliance ? { service: '' } : {}),
      ...(name === 'day' && value !== f.day ? { time: '' } : {}),
    }))
    setErrors((er) => ({ ...er, [name]: undefined }))
  }

  const selectedDay = days.find((d) => d.value === form.day)
  const base = serviceOptions[form.appliance] || []
  const serviceList = form.service && !base.includes(form.service) ? [...base, form.service] : base

  const pickService = (s) => {
    set('service', s)
    setStep(1) // auto-advance
  }

  const pickTime = (t) => {
    set('time', t)
    setStep(2) // auto-advance
  }

  const next = () => {
    if (step === 0 && !form.service) return setErrors({ service: 'Choose a service to continue' })
    if (step === 1 && (!form.day || !form.time)) return setErrors({ time: 'Pick a day and time slot' })
    setErrors({})
    setStep((s) => s + 1)
  }

  const submit = (e) => {
    e.preventDefault()
    if (step < 2) return next()
    const errs = validateDetails(form)
    setErrors(errs)
    if (Object.keys(errs).length) {
      document.getElementById(Object.keys(errs)[0])?.focus()
      return
    }

    // No backend yet: keep the booking locally and let the customer send it on WhatsApp.
    // Replace this block with an API call (fetch/axios) once a backend is ready.
    const booking = {
      ...form,
      dayLabel: `${selectedDay?.label} ${selectedDay?.sub}`,
      id: 'JST' + Date.now().toString().slice(-6),
      createdAt: new Date().toISOString(),
    }
    try {
      const saved = JSON.parse(localStorage.getItem('bookings') || '[]')
      localStorage.setItem('bookings', JSON.stringify([...saved, booking]))
    } catch {
      /* storage unavailable — ignore */
    }
    setSubmitted(booking)
    setForm(empty)
    setStep(0)
    setShowNote(false)
    onSuccess(`Booking ${booking.id} received! We'll call you shortly.`)
  }

  const field = (name) => ({
    id: name,
    name,
    value: form[name],
    onChange: (e) => set(name, e.target.value),
    'aria-invalid': !!errors[name],
    className: errors[name] ? 'has-error' : '',
  })

  return (
    <section className="section booking" id="book">
      <div className="container">
        <div className="booking-shell">
          <aside className="booking-aside">
            <span className="section-tag">Book a Service</span>
            <h2>Book in 3 quick taps</h2>
            <p>No long forms. We confirm every booking by phone within 15 minutes.</p>

            <BookingScene appliance={form.appliance} perks={perks} />

            <div className="booking-help">
              <small>Prefer to talk?</small>
              <a href={business.phoneHref}>
                <Icon name="phone" size={18} /> {business.phone}
              </a>
            </div>
          </aside>

          <div className="booking-main">
            {submitted ? (
              <div className="booking-success">
                <div className="success-icon">
                  <Icon name="check" size={36} />
                </div>
                <h3>Booking received!</h3>
                <p>
                  Booking ID <strong>{submitted.id}</strong> — {submitted.service}, {submitted.dayLabel} ({submitted.time}).
                  We'll call you on {submitted.phone} to confirm.
                </p>
                <a className="btn btn-whatsapp" href={whatsappLink(buildMessage(submitted))} target="_blank" rel="noreferrer">
                  <Icon name="whatsapp" size={20} /> Send details on WhatsApp
                </a>
                <button className="link-btn" onClick={() => setSubmitted(null)}>
                  Book another service
                </button>
              </div>
            ) : (
              <form className="wizard" onSubmit={submit} noValidate>
                {/* Progress */}
                <ol className="wizard-progress">
                  {steps.map((label, i) => (
                    <li key={label} className={i < step ? 'done' : i === step ? 'current' : ''}>
                      <button type="button" disabled={i > step} onClick={() => setStep(i)}>
                        <span className="wizard-dot">{i < step ? <Icon name="check" size={14} /> : i + 1}</span>
                        {label}
                      </button>
                    </li>
                  ))}
                </ol>

                <div className="wizard-body" key={step}>
                  {step === 0 && (
                    <>
                      <h3 className="wizard-title">What needs fixing?</h3>
                      <div className="appliance-tiles" role="radiogroup" aria-label="Appliance">
                        {appliances.map((a) => (
                          <button
                            type="button"
                            key={a.value}
                            role="radio"
                            aria-checked={form.appliance === a.value}
                            className={`appliance-tile ${form.appliance === a.value ? 'active' : ''}`}
                            onClick={() => set('appliance', a.value)}
                          >
                            <Icon name={a.icon} size={28} />
                            {a.label}
                            <span className="tile-check">
                              <Icon name="check" size={14} />
                            </span>
                          </button>
                        ))}
                      </div>

                      {form.appliance ? (
                        <div className="service-options" role="radiogroup" aria-label="Service">
                          {serviceList.map((s) => (
                            <button
                              type="button"
                              key={s}
                              role="radio"
                              aria-checked={form.service === s}
                              className={`service-option ${form.service === s ? 'active' : ''}`}
                              onClick={() => pickService(s)}
                            >
                              <span className="service-option-icon">
                                <Icon name={priceInfo[s]?.icon || 'service'} size={18} />
                              </span>
                              <span className="service-option-text">
                                <strong>{s}</strong>
                                {priceInfo[s] && <small>from ₹{priceInfo[s].price}</small>}
                              </span>
                            </button>
                          ))}
                        </div>
                      ) : (
                        <p className="wizard-hint">Choose an appliance to see services.</p>
                      )}
                      {errors.service && <small className="error">{errors.service}</small>}
                    </>
                  )}

                  {step === 1 && (
                    <>
                      <h3 className="wizard-title">When should we come?</h3>
                      <div className="day-chips" role="radiogroup" aria-label="Day">
                        {days.map((d) => (
                          <button
                            type="button"
                            key={d.value}
                            role="radio"
                            aria-checked={form.day === d.value}
                            className={`day-chip ${form.day === d.value ? 'active' : ''}`}
                            onClick={() => set('day', d.value)}
                          >
                            <strong>{d.label}</strong>
                            <small>{d.sub}</small>
                          </button>
                        ))}
                      </div>

                      {selectedDay ? (
                        <div className="chip-group" role="radiogroup" aria-label="Time slot">
                          {selectedDay.slots.map((t) => (
                            <button
                              type="button"
                              key={t}
                              role="radio"
                              aria-checked={form.time === t}
                              className={`chip ${form.time === t ? 'active' : ''}`}
                              onClick={() => pickTime(t)}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <p className="wizard-hint">Pick a day to see open slots.</p>
                      )}
                      {errors.time && <small className="error">{errors.time}</small>}
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <h3 className="wizard-title">Where can we reach you?</h3>
                      <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" placeholder="Your name" autoComplete="name" autoFocus {...field('name')} />
                        {errors.name && <small className="error">{errors.name}</small>}
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="phone">Mobile number</label>
                          <input type="tel" placeholder="10-digit mobile" autoComplete="tel" {...field('phone')} />
                          {errors.phone && <small className="error">{errors.phone}</small>}
                        </div>
                        <div className="form-group">
                          <label htmlFor="pincode">Pincode</label>
                          <input type="text" inputMode="numeric" maxLength={6} placeholder="600001" autoComplete="postal-code" {...field('pincode')} />
                          {errors.pincode && <small className="error">{errors.pincode}</small>}
                        </div>
                      </div>

                      {showNote ? (
                        <div className="form-group">
                          <label htmlFor="note">Note for technician (optional)</label>
                          <textarea rows={2} placeholder="e.g. AC not cooling, water leaking" {...field('note')} />
                        </div>
                      ) : (
                        <button type="button" className="link-btn add-note" onClick={() => setShowNote(true)}>
                          + Add a note about the problem
                        </button>
                      )}
                    </>
                  )}
                </div>

                {/* Live summary — fills in as the customer moves through the steps */}
                <div className="booking-summary">
                  <div className="booking-summary-head">
                    <span>Your booking</span>
                    <span className="summary-badge">Pay after service</span>
                  </div>
                  <ul>
                    <li className={form.service ? 'filled' : ''}>
                      <span className="summary-icon">
                        <Icon name={form.appliance === 'Washing Machine' ? 'washer' : 'ac'} size={18} />
                      </span>
                      <span className="summary-label">Service</span>
                      <span className="summary-value">{form.service || 'Not selected'}</span>
                    </li>
                    <li className={form.time ? 'filled' : ''}>
                      <span className="summary-icon">
                        <Icon name="clock" size={18} />
                      </span>
                      <span className="summary-label">Slot</span>
                      <span className="summary-value">
                        {form.time && selectedDay ? `${selectedDay.label}, ${form.time}` : 'Not selected'}
                      </span>
                    </li>
                    <li className={form.service ? 'filled' : ''}>
                      <span className="summary-icon">
                        <Icon name="rupee" size={18} />
                      </span>
                      <span className="summary-label">Starts at</span>
                      <span className="summary-value">
                        {priceInfo[form.service] ? <strong>₹{priceInfo[form.service].price}</strong> : form.service ? 'Quote on call' : '—'}
                      </span>
                    </li>
                  </ul>
                  <p className="summary-note">₹199 visit charge is waived if you go ahead with the repair.</p>
                </div>

                <div className="wizard-actions">
                  {step > 0 && (
                    <button type="button" className="btn btn-outline" onClick={() => setStep(step - 1)}>
                      Back
                    </button>
                  )}
                  <button type="submit" className="btn btn-lg">
                    {step < 2 ? 'Continue' : 'Confirm Booking'}
                    <Icon name={step < 2 ? 'chevron' : 'check'} size={20} className={step < 2 ? 'icon-right' : ''} />
                  </button>
                </div>
                {step === 2 && <p className="form-note">No payment now — we'll call to confirm your address.</p>}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default BookingForm
