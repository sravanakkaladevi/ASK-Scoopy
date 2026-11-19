import { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'
import './Navbar.css'

export default function Navbar() {
  const { cartCount, wishlist, setIsCartOpen } = useCart()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [promoDismissed, setPromoDismissed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id) => {
    setMobileMenuOpen(false)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className={`site-header ${isScrolled ? 'is-scrolled' : ''}`}>
      {!promoDismissed && (
        <div className="top-banner">
          <div className="top-banner-content">
            <span className="top-banner-pill">SUMMER SPECIAL</span>
            <span>
              🚚 100% Melt-Free Cold-Chain Delivery • Use code <strong>SCOOPY20</strong> for 20% off
              orders over $25!
            </span>
          </div>
          <button
            className="top-banner-close"
            onClick={() => setPromoDismissed(true)}
            aria-label="Dismiss banner"
          >
            ×
          </button>
        </div>
      )}

      <div className="navbar-container">
        {/* Brand */}
        <a href="#" className="navbar-brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <span className="brand-icon">🍨</span>
          <span className="brand-text">Scoopy</span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="navbar-nav">
          <button className="nav-link" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Hero Flavors
          </button>
          <button className="nav-link" onClick={() => scrollTo('shop-section')}>
            Shop Catalog
          </button>
          <button className="nav-link" onClick={() => scrollTo('custom-builder')}>
            Build a Sundae ✨
          </button>
          <button className="nav-link" onClick={() => scrollTo('reviews-section')}>
            Reviews & Comments
          </button>
          <button className="nav-link" onClick={() => scrollTo('story-section')}>
            Our Quality
          </button>
        </nav>

        {/* Right Actions */}
        <div className="navbar-actions">
          {/* Location status pill */}
          <div className="location-pill" title="Melt-safe express local fulfillment">
            <span className="location-dot" />
            <span className="location-text">Express 45-Min Hub</span>
          </div>

          {/* Wishlist indicator */}
          <button
            className="action-icon-btn"
            onClick={() => scrollTo('shop-section')}
            aria-label="Wishlist"
            title={`${wishlist.length} items favorited`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill={wishlist.length > 0 ? '#ff4d6d' : 'none'} stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            {wishlist.length > 0 && <span className="action-badge action-badge--wish">{wishlist.length}</span>}
          </button>

          {/* Cart Drawer Trigger */}
          <button
            className="cart-trigger-btn"
            onClick={() => setIsCartOpen(true)}
            aria-label={`Open shopping cart with ${cartCount} items`}
          >
            <span className="cart-icon-wrapper">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </span>
            <span className="cart-label">Cart</span>
          </button>

          {/* Mobile hamburger button */}
          <button
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`hamburger-bar ${mobileMenuOpen ? 'open' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu-drawer">
          <button className="mobile-nav-link" onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setMobileMenuOpen(false) }}>
            Hero Flavors
          </button>
          <button className="mobile-nav-link" onClick={() => scrollTo('shop-section')}>
            Shop Catalog
          </button>
          <button className="mobile-nav-link" onClick={() => scrollTo('custom-builder')}>
            Build a Sundae ✨
          </button>
          <button className="mobile-nav-link" onClick={() => scrollTo('reviews-section')}>
            Reviews & Customer Comments
          </button>
          <button className="mobile-nav-link" onClick={() => scrollTo('story-section')}>
            Our Story & Quality Guarantee
          </button>
          <button
            className="mobile-cart-cta"
            onClick={() => {
              setMobileMenuOpen(false)
              setIsCartOpen(true)
            }}
          >
            View Cart ({cartCount} items)
          </button>
        </div>
      )}
    </header>
  )
}
