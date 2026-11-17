import { brands } from '../data/siteData'

// Pick up every logo file in assets/images/brands at build time.
const logoFiles = import.meta.glob('../assets/images/brands/*.{svg,png,webp,jpg,jpeg}', {
  eager: true,
  query: '?url',
  import: 'default',
})

const logos = Object.fromEntries(
  Object.entries(logoFiles).map(([path, url]) => [path.split('/').pop().replace(/\.\w+$/, '').toLowerCase(), url]),
)

const slug = (name) => name.toLowerCase().replace(/[^a-z0-9]/g, '')

function BrandLogo({ brand }) {
  const src = logos[slug(brand.name)]

  if (!src) {
    return (
      <span className="brand-wordmark" style={{ '--brand': brand.color }}>
        {brand.name}
      </span>
    )
  }

  return (
    <>
      <img src={src} alt={brand.name} className={`brand-logo ${brand.symbol ? 'is-symbol' : ''}`} loading="lazy" />
      {brand.symbol && (
        <span className="brand-wordmark brand-wordmark-sm" style={{ '--brand': brand.color }}>
          {brand.name}
        </span>
      )}
    </>
  )
}

function Brands() {
  // Duplicate the list so the marquee loops seamlessly.
  const loop = [...brands, ...brands]

  return (
    <section className="brands" aria-label="Brands we service">
      <div className="container">
        <p className="brands-title">We service all major brands</p>
      </div>
      <div className="brands-track-wrap">
        <ul className="brands-track">
          {loop.map((b, i) => (
            <li key={i} className="brand-chip" aria-hidden={i >= brands.length || undefined}>
              <BrandLogo brand={b} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Brands
