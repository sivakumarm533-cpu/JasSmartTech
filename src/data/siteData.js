// =====================================================================
// Business details — edit these values; every component reads from here.
// =====================================================================
export const business = {
  name: 'JasSmartTech',
  phone: '+91 98765 43210', // TODO: replace with real number
  phoneHref: 'tel:+919876543210',
  whatsapp: '919876543210', // country code + number, digits only
  email: 'support@jassmarttech.com', // TODO: replace with real email
  address: '12, Main Road, Your City – 600001', // TODO: replace with real address
  location: 'Your City, Tamil Nadu', // TODO: short location shown in the top bar
  mapLink: 'https://maps.google.com/?q=Your+City', // TODO: your Google Maps link
  hours: 'Mon – Sun: 8:00 AM – 9:00 PM',
  offer: '₹299 AC General Service — Summer Offer! Limited slots.',
}

export const whatsappLink = (text = 'Hi, I would like to book a service.') =>
  `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(text)}`

export const services = {
  ac: [
    { icon: 'install', title: 'AC Installation', desc: 'Split & window AC installation with proper copper piping and stand fitting.', price: 1499 },
    { icon: 'uninstall', title: 'AC Uninstallation', desc: 'Safe removal with gas pump-down so you can reinstall without loss.', price: 699 },
    { icon: 'service', title: 'General Service', desc: 'Filter, coil and drain cleaning with jet pump for better cooling.', price: 499 },
    { icon: 'gas', title: 'Gas Refill', desc: 'Leak check and complete refrigerant top-up (R22 / R32 / R410A).', price: 2499 },
    { icon: 'repair', title: 'AC Repair', desc: 'Not cooling, noise, water leakage, PCB or compressor issues fixed.', price: 399 },
    { icon: 'clean', title: 'Deep Cleaning', desc: 'Foam + jet wash of indoor and outdoor units for like-new airflow.', price: 899 },
  ],
  washing: [
    { icon: 'repair', title: 'Washing Machine Repair', desc: 'Not spinning, not draining, error codes, door lock issues and more.', price: 349 },
    { icon: 'install', title: 'Installation', desc: 'Inlet, outlet and leveling setup for new or relocated machines.', price: 499 },
    { icon: 'clean', title: 'Drum Cleaning', desc: 'Descaling and anti-bacterial drum clean to remove odour and residue.', price: 599 },
    { icon: 'chip', title: 'Motor / PCB Repair', desc: 'Diagnosis and repair or replacement of motor and control boards.', price: 899 },
    { icon: 'topload', title: 'Top-Load Service', desc: 'Complete service for fully and semi-automatic top loaders.', price: 449 },
    { icon: 'frontload', title: 'Front-Load Service', desc: 'Gasket, filter, drum and drain service for front loaders.', price: 549 },
  ],
}

// Brand logos live in src/assets/images/brands/<slug>.svg|png|webp|jpg
// (slug = name in lowercase, no spaces: "Blue Star" -> bluestar.png).
// Drop a file there and it shows up automatically; brands without a file show as a text wordmark.
// `color` tints the wordmark fallback; `symbol: true` means the logo is an icon only, so the name is shown beside it.
export const brands = [
  { name: 'LG', color: '#A50034' },
  { name: 'Samsung', color: '#1428A0' },
  { name: 'Whirlpool', color: '#000000' },
  { name: 'IFB', color: '#E31E24' },
  { name: 'Voltas', color: '#0A3D8F' },
  { name: 'Daikin', color: '#0097E0' },
  { name: 'Bosch', color: '#EA0016', symbol: true },
  { name: 'Blue Star', color: '#0055A5' },
  { name: 'Godrej', color: '#6A1B9A' },
  { name: 'Panasonic', color: '#0049AB' },
  { name: 'Hitachi', color: '#E60027' },
  { name: 'Carrier', color: '#0033A0' },
]

export const whyUs = [
  { icon: 'badge', title: 'Certified Technicians', desc: 'Trained, background-verified experts with years of experience.' },
  { icon: 'clock', title: 'Same-Day Service', desc: 'Book before 2 PM and get a technician at your door the same day.' },
  { icon: 'part', title: 'Genuine Spare Parts', desc: 'Only original or OEM-grade parts with proper invoices.' },
  { icon: 'shield', title: '30-Day Warranty', desc: 'Every repair is covered. If the issue returns, we fix it free.' },
  { icon: 'rupee', title: 'Transparent Pricing', desc: 'Fixed rate card, quote before work starts — no hidden charges.' },
]

export const steps = [
  { title: 'Book Online', desc: 'Fill the form, call or WhatsApp us in under a minute.' },
  { title: 'Technician Visits', desc: 'A verified expert arrives at your chosen time slot.' },
  { title: 'Problem Fixed', desc: 'Diagnosis, upfront quote and repair on the spot.' },
  { title: 'Pay After Service', desc: 'Pay by cash or UPI only once you are satisfied.' },
]

export const amcPlans = [
  {
    name: 'Basic',
    price: 1499,
    period: '/year',
    desc: '1 AC or 1 washing machine',
    features: ['2 preventive services', 'Free visiting charges', '10% off on spare parts', 'Priority booking'],
  },
  {
    name: 'Standard',
    price: 2799,
    period: '/year',
    desc: 'Up to 2 appliances',
    features: ['3 preventive services each', 'Free visiting charges', '15% off on spare parts', 'Same-day priority support', '1 free gas top-up check'],
    popular: true,
  },
  {
    name: 'Premium',
    price: 4999,
    period: '/year',
    desc: 'Up to 4 appliances',
    features: ['4 preventive services each', 'Unlimited breakdown visits', '20% off on spare parts', 'Dedicated technician', 'Free deep cleaning once'],
  },
]

// SAMPLE reviews for layout only — replace with real customer reviews before going live.
export const testimonials = [
  { name: 'Priya R.', area: 'Anna Nagar', rating: 5, text: 'Technician came within 3 hours and fixed my LG washing machine drain issue. Very polite and the price was exactly as quoted.' },
  { name: 'Karthik S.', area: 'Velachery', rating: 5, text: 'Got deep cleaning done for 2 split ACs. Cooling is like new again. Booking on WhatsApp was super easy.' },
  { name: 'Meena V.', area: 'T. Nagar', rating: 4, text: 'PCB of my front-load machine was replaced with a genuine part and they gave warranty too. Recommended.' },
  { name: 'Arun K.', area: 'Tambaram', rating: 5, text: 'Took the AMC plan for home and office. Services are on time and they remind us before every visit.' },
]

// SAMPLE areas — replace with the areas you actually cover.
export const serviceAreas = ['Anna Nagar', 'T. Nagar', 'Velachery', 'Adyar', 'Tambaram', 'Porur', 'Guindy', 'Mylapore', 'Chromepet', 'Ambattur', 'OMR', 'ECR']

export const faqs = [
  { q: 'How long does an AC service take?', a: 'A general service takes about 45–60 minutes per unit. Deep cleaning or gas refill can take 1.5–2 hours.' },
  { q: 'Do you give a warranty?', a: 'Yes. All repairs come with a 30-day service warranty, and replaced spare parts carry the manufacturer warranty where applicable.' },
  { q: 'What are the visiting charges?', a: 'Visiting and inspection is ₹199. It is waived if you go ahead with the repair or service.' },
  { q: 'Which brands do you service?', a: 'We service all major brands including LG, Samsung, Whirlpool, IFB, Voltas, Daikin, Bosch, Blue Star and more.' },
  { q: 'How do I pay?', a: 'You pay only after the work is done — cash, UPI or card are all accepted. You get a digital invoice.' },
  { q: 'Can I reschedule my booking?', a: 'Yes, just call or WhatsApp us at least 2 hours before your slot and we will move it free of charge.' },
]

export const timeSlots = ['9 AM – 11 AM', '11 AM – 1 PM', '1 PM – 3 PM', '3 PM – 5 PM', '5 PM – 7 PM']
