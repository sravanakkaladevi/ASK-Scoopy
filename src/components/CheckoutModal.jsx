import { useState } from 'react'
import confetti from 'canvas-confetti'
import { useCart } from '../context/CartContext'
import './CheckoutModal.css'

export default function CheckoutModal() {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    clearCart,
    orderTotal,
    addToast,
  } = useCart()

  const [step, setStep] = useState(1) // 1: Shipping, 2: Slot & Payment, 3: Success

  // Form states
  const [formData, setFormData] = useState({
    fullName: 'Sravan A.',
    email: 'sravan@example.com',
    phone: '+91 98765 43210',
    address: 'Flat 402, Lotus Residency, Jubilee Hills',
    city: 'Hyderabad',
    zip: '500033',
    instructions: 'Ring bell and hand over cold box',
    deliverySlot: 'express', // express | evening
    paymentMethod: 'upi', // upi | card | cod
    upiId: 'sravan@okhdfcbank',
    cardNumber: '•••• •••• •••• 4242',
    cardExp: '12/28',
    cardCvc: '888',
  })

  const [confirmedOrderId, setConfirmedOrderId] = useState('')

  if (!isCheckoutOpen) return null

  const handleInputChange = (field, val) => {
    setFormData((prev) => ({ ...prev, [field]: val }))
  }

  const handleStep1Submit = (e) => {
    e.preventDefault()
    if (!formData.fullName || !formData.address || !formData.city) {
      addToast('Please complete delivery details', 'error')
      return
    }
    setStep(2)
  }

  const handlePlaceOrder = (e) => {
    e.preventDefault()
    const orderNum = `SC-IN-${Math.floor(100000 + Math.random() * 900000)}`
    setConfirmedOrderId(orderNum)
    setStep(3)
    clearCart()
    addToast('🎉 Order placed successfully! Ice cream is packed in dry ice!', 'success')

    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.55 },
        colors: ['#7C55D6', '#FF87B0', '#FF9D5C', '#BEDD86', '#C58058', '#FFD166'],
      })
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
        })
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
        })
      }, 300)
    } catch {
      // ignore
    }
  }

  const handleClose = () => {
    setIsCheckoutOpen(false)
    setStep(1)
  }

  return (
    <div className="checkout-overlay" onClick={handleClose}>
      <div className="checkout-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Modal Close Button */}
        <button className="modal-close-icon" onClick={handleClose} aria-label="Close checkout">
          ×
        </button>

        {step < 3 && (
          <div className="checkout-steps-bar">
            <div className={`step-indicator ${step >= 1 ? 'is-active' : ''}`}>
              <span className="step-num">1</span>
              <span className="step-txt">Cold Delivery</span>
            </div>
            <div className="step-connector" />
            <div className={`step-indicator ${step >= 2 ? 'is-active' : ''}`}>
              <span className="step-num">2</span>
              <span className="step-txt">Slot & Payment</span>
            </div>
          </div>
        )}

        {/* Step 1: Cold Delivery Address */}
        {step === 1 && (
          <form onSubmit={handleStep1Submit} className="checkout-form">
            <div className="modal-header">
              <h3 className="modal-title">Sub-Zero Cold Chain Delivery</h3>
              <p className="modal-subtitle">
                Guaranteed frozen solid upon arrival using zero-waste dry-ice packaging.
              </p>
            </div>

            <div className="form-fields-grid">
              <div className="input-group">
                <label className="field-label">Full Name *</label>
                <input
                  type="text"
                  required
                  className="modal-input"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                />
              </div>

              <div className="input-group">
                <label className="field-label">Mobile Number *</label>
                <input
                  type="text"
                  required
                  className="modal-input"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
              </div>

              <div className="input-group full-width">
                <label className="field-label">Delivery Address *</label>
                <input
                  type="text"
                  required
                  className="modal-input"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                />
              </div>

              <div className="input-group">
                <label className="field-label">City *</label>
                <input
                  type="text"
                  required
                  className="modal-input"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                />
              </div>

              <div className="input-group">
                <label className="field-label">Pincode *</label>
                <input
                  type="text"
                  required
                  className="modal-input"
                  value={formData.zip}
                  onChange={(e) => handleInputChange('zip', e.target.value)}
                />
              </div>

              <div className="input-group full-width">
                <label className="field-label">Delivery Instructions (Optional)</label>
                <input
                  type="text"
                  className="modal-input"
                  placeholder="e.g. Ring bell or leave with security"
                  value={formData.instructions}
                  onChange={(e) => handleInputChange('instructions', e.target.value)}
                />
              </div>
            </div>

            <div className="checkout-summary-strip">
              <span>Total to Pay:</span>
              <span className="strip-price">₹{Math.round(orderTotal)}</span>
            </div>

            <button type="submit" className="modal-primary-btn">
              <span>Continue to Slot & Payment</span>
              <span>→</span>
            </button>
          </form>
        )}

        {/* Step 2: Time Slot & Payment */}
        {step === 2 && (
          <form onSubmit={handlePlaceOrder} className="checkout-form">
            <div className="modal-header">
              <h3 className="modal-title">Select Delivery & Payment</h3>
              <p className="modal-subtitle">Fast, temperature-controlled delivery to your door.</p>
            </div>

            {/* Time slot radio options */}
            <div className="delivery-slots-box">
              <label className="field-label">Select Delivery Window:</label>
              <div className="slot-options-list">
                <label
                  className={`slot-option ${formData.deliverySlot === 'express' ? 'is-selected' : ''}`}
                >
                  <input
                    type="radio"
                    name="slot"
                    checked={formData.deliverySlot === 'express'}
                    onChange={() => handleInputChange('deliverySlot', 'express')}
                  />
                  <div>
                    <span className="slot-title">⚡ Express Cold Courier (Within 45 Mins)</span>
                    <span className="slot-desc">Packed fresh from our nearest creamery hub</span>
                  </div>
                </label>

                <label
                  className={`slot-option ${formData.deliverySlot === 'evening' ? 'is-selected' : ''}`}
                >
                  <input
                    type="radio"
                    name="slot"
                    checked={formData.deliverySlot === 'evening'}
                    onChange={() => handleInputChange('deliverySlot', 'evening')}
                  />
                  <div>
                    <span className="slot-title">🌅 Evening Sweet Tooth (7:00 PM – 9:00 PM)</span>
                    <span className="slot-desc">Perfect after-dinner dessert arrival</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Payment methods */}
            <div className="payment-method-box">
              <label className="field-label">Payment Method (INR):</label>
              <div className="payment-tabs-row">
                <button
                  type="button"
                  className={`payment-tab ${formData.paymentMethod === 'upi' ? 'is-active' : ''}`}
                  onClick={() => handleInputChange('paymentMethod', 'upi')}
                >
                  📱 UPI / GPay
                </button>
                <button
                  type="button"
                  className={`payment-tab ${formData.paymentMethod === 'card' ? 'is-active' : ''}`}
                  onClick={() => handleInputChange('paymentMethod', 'card')}
                >
                  💳 Card / RuPay
                </button>
                <button
                  type="button"
                  className={`payment-tab ${formData.paymentMethod === 'cod' ? 'is-active' : ''}`}
                  onClick={() => handleInputChange('paymentMethod', 'cod')}
                >
                  💵 Cash on Delivery
                </button>
              </div>

              {formData.paymentMethod === 'upi' && (
                <div className="mock-card-fields">
                  <div className="input-group">
                    <label className="field-label">UPI ID / VPA</label>
                    <input
                      type="text"
                      className="modal-input"
                      value={formData.upiId}
                      onChange={(e) => handleInputChange('upiId', e.target.value)}
                    />
                  </div>
                  <span style={{ fontSize: '0.74rem', color: '#27ae60', fontWeight: 600 }}>
                    ✓ Verified UPI Gateway (Google Pay, PhonePe, Paytm, BHIM)
                  </span>
                </div>
              )}

              {formData.paymentMethod === 'card' && (
                <div className="mock-card-fields">
                  <div className="input-group">
                    <label className="field-label">Card Number (Visa, RuPay, Mastercard)</label>
                    <input
                      type="text"
                      className="modal-input"
                      value={formData.cardNumber}
                      onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                    />
                  </div>
                  <div className="form-grid-2">
                    <div className="input-group">
                      <label className="field-label">Exp Date</label>
                      <input
                        type="text"
                        className="modal-input"
                        value={formData.cardExp}
                        onChange={(e) => handleInputChange('cardExp', e.target.value)}
                      />
                    </div>
                    <div className="input-group">
                      <label className="field-label">CVV</label>
                      <input
                        type="text"
                        className="modal-input"
                        value={formData.cardCvc}
                        onChange={(e) => handleInputChange('cardCvc', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="checkout-summary-strip">
              <span>Grand Total:</span>
              <span className="strip-price">₹{Math.round(orderTotal)}</span>
            </div>

            <div className="step-actions-row">
              <button
                type="button"
                className="modal-back-btn"
                onClick={() => setStep(1)}
              >
                ← Back
              </button>
              <button type="submit" className="modal-primary-btn">
                <span>Place Order (₹{Math.round(orderTotal)})</span>
                <span>🍨</span>
              </button>
            </div>
          </form>
        )}

        {/* Step 3: Success Confirmation */}
        {step === 3 && (
          <div className="checkout-success-view">
            <div className="celebration-confetti">🎉 🍨 ✨ 🚚 ❄️</div>
            <h3 className="success-title">Order Confirmed!</h3>
            <p className="success-subtitle">
              Thank you, <strong>{formData.fullName}</strong>! Your artisanal frozen treats are being
              scooped and packed into an insulated dry-ice box right now.
            </p>

            <div className="order-ticket-card">
              <div className="ticket-header">
                <div>
                  <span className="ticket-label">Order Reference</span>
                  <span className="ticket-id">{confirmedOrderId}</span>
                </div>
                <span className="ticket-status-pill">❄️ Churning & Packing</span>
              </div>

              <div className="ticket-delivery-info">
                <p>
                  <strong>Deliver To:</strong> {formData.address}, {formData.city} - {formData.zip}
                </p>
                <p>
                  <strong>Window:</strong>{' '}
                  {formData.deliverySlot === 'express' ? 'Within 45 Minutes' : 'Today Evening'}
                </p>
                <p>
                  <strong>Packaging:</strong> Sealed Cold-Chain Box with Eco Dry Ice (-20°C)
                </p>
              </div>

              {/* Progress tracker */}
              <div className="order-live-tracker">
                <div className="tracker-step is-complete">
                  <span className="tracker-dot">✓</span>
                  <span className="tracker-label">Order Placed</span>
                </div>
                <div className="tracker-step is-current">
                  <span className="tracker-dot">●</span>
                  <span className="tracker-label">Dry-Ice Packed</span>
                </div>
                <div className="tracker-step">
                  <span className="tracker-dot">○</span>
                  <span className="tracker-label">Out for Delivery</span>
                </div>
                <div className="tracker-step">
                  <span className="tracker-dot">○</span>
                  <span className="tracker-label">Melt-Free Delivered</span>
                </div>
              </div>
            </div>

            <button className="modal-primary-btn" onClick={handleClose}>
              Back to Scoopy Creamery
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
