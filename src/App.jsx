import { useCallback, useState } from 'react'
import './App.css'
import './assets/css/component.css'
import './assets/css/responsive.css' // must stay last: media queries override base styles
import OfferBanner from './components/OfferBanner'
import TopBar from './components/TopBar'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Brands from './components/Brands'
import WhyUs from './components/WhyUs'
import HowItWorks from './components/HowItWorks'
import Pricing from './components/Pricing'
import BookingForm from './components/BookingForm'
import Testimonials from './components/Testimonials'
import ServiceAreas from './components/ServiceAreas'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Footer from './components/Footer'
import FloatingButtons from './components/FloatingButtons'
import Toast from './components/Toast'

function App() {
  const [preset, setPreset] = useState(null)
  const [toast, setToast] = useState('')

  // Prefill the booking form from any "Book" button and scroll to it.
  const handleBook = (appliance, service, extra = {}) => {
    setPreset({ appliance, service, ...extra })
    document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' })
  }

  const closeToast = useCallback(() => setToast(''), [])

  return (
    <>
      <OfferBanner />
      <TopBar />
      <Navbar />
      <main>
        <Hero onBook={handleBook} />
        <Services onBook={handleBook} />
        <Brands />
        <WhyUs />
        <HowItWorks />
        <Pricing onBook={handleBook} />
        <BookingForm preset={preset} onSuccess={setToast} />
        <Testimonials />
        <ServiceAreas />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <FloatingButtons />
      <Toast message={toast} onClose={closeToast} />
    </>
  )
}

export default App
