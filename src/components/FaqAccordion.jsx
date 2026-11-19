import { useState } from 'react'
import './FaqAccordion.css'

const FAQS = [
  {
    q: 'How does the ice cream stay frozen during shipping?',
    a: 'We pack every order inside a custom insulated, biodegradable cooler with food-grade dry ice blocks kept at -78.5°C (-109.3°F). This keeps the interior of the package colder than a commercial deep freezer for up to 48 hours.',
  },
  {
    q: 'What is your Melt-Free Guarantee policy?',
    a: 'If your scoops or pints arrive soft or melted in any way due to transit delays or severe weather, simply snap a quick photo and our team will either reship fresh pints via overnight priority or issue a 100% refund immediately.',
  },
  {
    q: 'Are your flavors gluten-free or suitable for nut allergies?',
    a: 'All our core single flavors (Blueberry Lagoon, Mango Sunset, Strawberry Bliss, Choco Fudge) are naturally Gluten-Free! Pistachio Dream contains roasted tree nuts and is churned on dedicated equipment to prevent cross-contamination.',
  },
  {
    q: 'Can I customize orders for parties, weddings, or corporate events?',
    a: 'Yes! Use our "Build a Sundae" creator or select our Party Cooler and Tasting Flights. For bulk catering (50+ scoops) with custom personalized labels, reach out via our contact form for wholesale pricing.',
  },
  {
    q: 'How long can I store Scoopy ice cream in my home freezer?',
    a: 'Because our pints have low overrun and zero artificial stabilizers, we recommend enjoying them within 3 to 4 months of delivery. Keep your home freezer set to -18°C (0°F) or colder.',
  },
]

export default function FaqAccordion() {
  const [openIdx, setOpenIdx] = useState(0)

  const toggle = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx)
  }

  return (
    <section className="faq-section">
      <div className="faq-container">
        <div className="section-head text-center">
          <span className="section-tagline">Got Questions?</span>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">
            Everything you need to know about our cold-chain shipping, ingredients, and sweet guarantee.
          </p>
        </div>

        <div className="faq-accordion-list">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx
            return (
              <div key={faq.q} className={`faq-item ${isOpen ? 'is-open' : ''}`}>
                <button
                  className="faq-question-btn"
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                >
                  <span className="faq-question-text">{faq.q}</span>
                  <span className="faq-icon-indicator">{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen && (
                  <div className="faq-answer-pane">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
