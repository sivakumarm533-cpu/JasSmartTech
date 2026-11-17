import { steps } from '../data/siteData'

function HowItWorks() {
  return (
    <section className="section how-it-works">
      <div className="container">
        <div className="section-head">
          <span className="section-tag">How It Works</span>
          <h2>Get your appliance fixed in 4 easy steps</h2>
        </div>

        <ol className="steps">
          {steps.map((s, i) => (
            <li className="step" key={s.title}>
              <span className="step-num">{i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default HowItWorks
