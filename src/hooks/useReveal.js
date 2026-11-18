import { useEffect } from 'react'

// Elements that fade/slide in as they scroll into view.
const SELECTOR = [
  '.section-head',
  '.services-head',
  '.why-panel',
  '.why-content',
  '.step',
  '.rate-card',
  '.amc-card',
  '.testimonial',
  '.areas-inner > *',
  '.faq-intro',
  '.faq-item',
  '.contact-cta',
  '.contact-card',
].join(',')

function useReveal() {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )

    document.querySelectorAll(SELECTOR).forEach((el) => {
      // stagger siblings of the same kind (cards in a row, steps, etc.)
      const index = Array.from(el.parentElement?.children ?? []).indexOf(el)
      el.style.setProperty('--reveal-delay', `${Math.min(index, 5) * 80}ms`)
      el.classList.add('reveal')
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])
}

export default useReveal
