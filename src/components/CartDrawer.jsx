import { useState } from 'react'
import { useCart } from '../context/CartContext'
import './CartDrawer.css'

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartCount,
    cartSubtotal,
    discountAmount,
    subtotalAfterDiscount,
    FREE_SHIPPING_THRESHOLD,
    isFreeShipping,
    shippingCost,
    tipRate,
    setTipRate,
    tipAmount,
    taxAmount,
    orderTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    couponError,
    setIsCheckoutOpen,
  } = useCart()

  const [couponInput, setCouponInput] = useState('')

  if (!isCartOpen) return null

  const handleApplyCoupon = (e) => {
    e.preventDefault()
    if (!couponInput.trim()) return
    const success = applyCoupon(couponInput)
    if (success) setCouponInput('')
  }

  const handleProceedToCheckout = () => {
    setIsCartOpen(false)
    setIsCheckoutOpen(true)
  }

  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotalAfterDiscount)
  const freeShippingProgress = Math.min(
    100,
    (subtotalAfterDiscount / FREE_SHIPPING_THRESHOLD) * 100
  )

  return (
    <div className="cart-drawer-overlay" onClick={() => setIsCartOpen(false)}>
      <aside className="cart-drawer-panel" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="cart-drawer-header">
          <div className="header-title-row">
            <h3 className="drawer-title">Your Sweet Bag</h3>
            <span className="drawer-count-badge">{cartCount} items</span>
          </div>
          <button
            className="drawer-close-btn"
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart"
          >
            ×
          </button>
        </div>

        {/* Free Delivery Meter */}
        <div className="free-shipping-meter">
          {isFreeShipping ? (
            <p className="shipping-meter-text is-unlocked">
              🎉 <strong>Awesome!</strong> You've unlocked <strong>FREE Cold-Chain Delivery</strong>!
            </p>
          ) : (
            <p className="shipping-meter-text">
              Add <strong>₹{Math.round(amountNeededForFreeShipping)}</strong> more to get{' '}
              <strong>FREE Cold Shipping</strong>!
            </p>
          )}
          <div className="shipping-progress-track">
            <div
              className="shipping-progress-bar"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        {cart.length > 0 ? (
          <>
            <div className="cart-items-scroll">
              {cart.map((item) => (
                <div key={item.key} className="cart-item-card">
                  <div
                    className="cart-item-thumb-wrapper"
                    style={{ background: item.accent ? `${item.accent}22` : '#f0ebfc' }}
                  >
                    <img src={item.image} alt={item.name} className="cart-item-thumb" />
                  </div>

                  <div className="cart-item-details">
                    <div className="item-title-row">
                      <h4 className="item-name">{item.name}</h4>
                      <button
                        className="cart-delete-button"
                        onClick={() => removeFromCart(item.key)}
                        aria-label="Delete item"
                        title="Remove item"
                      >
                        <svg viewBox="0 0 448 512" className="cart-delete-svg">
                          <path
                            d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
                            fill="currentColor"
                          />
                        </svg>
                      </button>
                    </div>

                    <span className="item-variant-label">{item.variant}</span>

                    {item.customNotes && (
                      <p className="item-custom-notes" title={item.customNotes}>
                        {item.customNotes}
                      </p>
                    )}

                    <div className="item-bottom-row">
                      <div className="item-stepper">
                        <button
                          className="stepper-btn"
                          onClick={() => updateQuantity(item.key, -1)}
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="stepper-val">{item.quantity}</span>
                        <button
                          className="stepper-btn"
                          onClick={() => updateQuantity(item.key, 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <div className="item-pricing">
                        <span className="item-total-price">
                          ₹{Math.round(item.price * item.quantity)}
                        </span>
                        {item.quantity > 1 && (
                          <span className="item-unit-price">₹{Math.round(item.price)} ea</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Coupon Code Section */}
            <div className="cart-coupon-section">
              {appliedCoupon ? (
                <div className="applied-coupon-pill">
                  <div className="applied-coupon-info">
                    <span className="coupon-tag-icon">🎟️</span>
                    <div>
                      <strong>{appliedCoupon.code}</strong>
                      <span className="coupon-desc"> ({appliedCoupon.label})</span>
                    </div>
                  </div>
                  <button
                    className="remove-coupon-btn"
                    onClick={removeCoupon}
                    title="Remove coupon"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="coupon-input-form">
                  <input
                    type="text"
                    placeholder="Promo code (try SCOOPY20 or SWEET50)"
                    className="coupon-input"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                  />
                  <button type="submit" className="apply-coupon-btn">
                    Apply
                  </button>
                </form>
              )}
              {couponError && <p className="coupon-error-text">{couponError}</p>}
            </div>

            {/* Gratuity / Tip Selection */}
            <div className="cart-tip-section">
              <span className="tip-title">Tip the Ice Cream Churners:</span>
              <div className="tip-pills-row">
                {[
                  { label: 'None', val: 0 },
                  { label: '₹20', val: 0.05 },
                  { label: '₹50', val: 0.1 },
                  { label: '₹100', val: 0.15 },
                ].map((t) => (
                  <button
                    key={t.label}
                    type="button"
                    className={`tip-pill-btn ${tipRate === t.val ? 'is-selected' : ''}`}
                    onClick={() => setTipRate(t.val)}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Breakdown Footer */}
            <div className="cart-drawer-footer">
              <div className="cost-breakdown">
                <div className="cost-line">
                  <span>Subtotal</span>
                  <span>₹{Math.round(cartSubtotal)}</span>
                </div>

                {appliedCoupon && (
                  <div className="cost-line discount-line">
                    <span>Discount ({appliedCoupon.code})</span>
                    <span>-₹{Math.round(discountAmount)}</span>
                  </div>
                )}

                <div className="cost-line">
                  <span>Cold-Chain Dry Ice Shipping</span>
                  <span>{isFreeShipping ? 'FREE' : `₹${shippingCost}`}</span>
                </div>

                {tipAmount > 0 && (
                  <div className="cost-line">
                    <span>Crew Gratuity</span>
                    <span>₹{Math.round(tipAmount)}</span>
                  </div>
                )}

                <div className="cost-line">
                  <span>GST (5%)</span>
                  <span>₹{Math.round(taxAmount)}</span>
                </div>

                <div className="cost-divider" />

                <div className="cost-line total-line">
                  <span>Total Amount</span>
                  <span className="final-total-tag">₹{Math.round(orderTotal)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button className="proceed-checkout-btn" onClick={handleProceedToCheckout}>
                <span>Proceed to Checkout (₹{Math.round(orderTotal)})</span>
                <span>→</span>
              </button>

              <button className="clear-cart-text-btn" onClick={clearCart}>
                Clear entire bag
              </button>
            </div>
          </>
        ) : (
          <div className="cart-empty-state">
            <span className="empty-cart-emoji">🍨</span>
            <h4>Your ice cream bag is empty!</h4>
            <p>Our scoops are melting away without you. Choose a flavor or build a custom sundae!</p>
          </div>
        )}
      </aside>
    </div>
  )
}
