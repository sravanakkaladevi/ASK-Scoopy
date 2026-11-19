import { useState } from 'react'
import { useCart } from '../context/CartContext'
import SocialIcons from './SocialIcons'
import './Footer.css'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const { addToast } = useCart()

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!email.trim() || !email.includes('@')) {
      addToast('Please enter a valid email address', 'error')
      return
    }
    setSubscribed(true)
    addToast('🎉 Welcome to the Scoopy Club! Check your inbox for a free scoop coupon.', 'success')
  }

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="site-footer">
      <div className="footer-container">
        {/* Newsletter Banner */}
        <div className="footer-newsletter-card">
          <div className="newsletter-text-block">
            <span className="newsletter-tag">Scoop Club VIP</span>
            <h3 className="newsletter-title">Get a Free Pint on Your Birthday 🎂</h3>
            <p className="newsletter-desc">
              Subscribe to unlock secret micro-batch releases, exclusive seasonal drops, and 15% off your next order.
            </p>
          </div>

          <div className="newsletter-form-block">
            {subscribed ? (
              <div className="subscribed-success-message">
                <span>🎉 You are in! Secret promo code <strong>SCOOPY20</strong> is ready to use!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="footer-subscribe-form">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  className="footer-email-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" className="footer-subscribe-btn">
                  Claim 15% Off
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Links Grid */}
        <div className="footer-grid">
          {/* Brand Col */}
          <div className="footer-col brand-col">
            <div className="footer-logo">
              <span className="footer-logo-emoji">🍨</span>
              <span className="footer-logo-name">Scoopy</span>
            </div>
            <p className="footer-tagline-text">
              Artisanal small-batch ice cream churned with pasture-raised cream and whole fresh fruits.
              Delivered frozen solid in eco-friendly dry-ice boxes.
            </p>
            <SocialIcons className="footer-socials social-icons--dark" />
          </div>

          {/* Quick Menu Col */}
          <div className="footer-col">
            <h4 className="footer-heading">Menu & Shop</h4>
            <ul className="footer-links">
              <li>
                <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                  Featured Flavor Hero
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('shop-section')}>Small-Batch Catalog</button>
              </li>
              <li>
                <button onClick={() => scrollTo('custom-builder')}>Build Your Own Sundae</button>
              </li>
              <li>
                <button onClick={() => scrollTo('shop-section')}>Party Cooler Bundles</button>
              </li>
              <li>
                <button onClick={() => scrollTo('shop-section')}>Vegan & Dairy-Free</button>
              </li>
            </ul>
          </div>

          {/* Community Col */}
          <div className="footer-col">
            <h4 className="footer-heading">Customer Hub</h4>
            <ul className="footer-links">
              <li>
                <button onClick={() => scrollTo('reviews-section')}>Customer Reviews & Comments</button>
              </li>
              <li>
                <button onClick={() => scrollTo('story-section')}>Melt-Free Dry Ice Guarantee</button>
              </li>
              <li>
                <button onClick={() => scrollTo('story-section')}>Organic Pasture Cream</button>
              </li>
              <li>
                <a href="#faq">Frequently Asked Questions</a>
              </li>
              <li>
                <a href="#contact">Events & Wedding Catering</a>
              </li>
            </ul>
          </div>

          {/* Creamery Hubs Col */}
          <div className="footer-col">
            <h4 className="footer-heading">Creamery Hubs</h4>
            <ul className="footer-contact-list">
              <li>📍 <strong>Downtown Los Angeles:</strong> 424 S Spring St</li>
              <li>📍 <strong>New York Cold Lab:</strong> 88 Franklin St, Tribeca</li>
              <li>⏰ <strong>Express Delivery:</strong> 11:00 AM – 11:30 PM Daily</li>
              <li>❄️ <strong>Cold-Chain Support:</strong> hello@scoopycreamery.com</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom-bar">
          <p className="copyright-text">
            © {new Date().getFullYear()} Scoopy Creamery Co. All rights reserved. Made with 100% love,
            cream, and berries.
          </p>
          <div className="payment-badges-row">
            <span className="payment-badge">💳 Apple Pay</span>
            <span className="payment-badge">💳 Google Pay</span>
            <span className="payment-badge">💳 Visa & Mastercard</span>
            <span className="payment-badge">❄️ Dry-Ice Certified</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
