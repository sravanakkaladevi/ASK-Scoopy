import { useState } from 'react'
import { useCart } from '../context/CartContext'
import './QuickViewModal.css'

export default function QuickViewModal() {
  const { quickViewProduct, setQuickViewProduct, addToCart, wishlist, toggleWishlist } = useCart()
  const [selectedSizeIdx, setSelectedSizeIdx] = useState(0)
  const [qty, setQty] = useState(1)

  if (!quickViewProduct) return null

  const size = quickViewProduct.sizes?.[selectedSizeIdx] || quickViewProduct.sizes?.[0] || {
    label: 'Standard',
    price: quickViewProduct.price,
  }

  const isWishlisted = wishlist.includes(quickViewProduct.id)

  const handleAdd = () => {
    addToCart(quickViewProduct, size, qty)
    setQuickViewProduct(null)
  }

  return (
    <div className="quickview-overlay" onClick={() => setQuickViewProduct(null)}>
      <div className="quickview-modal" onClick={(e) => e.stopPropagation()}>
        <button
          className="quickview-close-btn"
          onClick={() => setQuickViewProduct(null)}
          aria-label="Close details"
        >
          ×
        </button>

        <div className="quickview-layout">
          {/* Image & Gradient Preview */}
          <div className="quickview-visual" style={{ background: quickViewProduct.gradient }}>
            <span
              className="quickview-badge"
              style={{ backgroundColor: quickViewProduct.badgeColor || '#7c55d6' }}
            >
              {quickViewProduct.badge}
            </span>
            <img
              src={quickViewProduct.image}
              alt={quickViewProduct.name}
              className="quickview-img"
            />
          </div>

          {/* Details */}
          <div className="quickview-info">
            <div className="quickview-head">
              <span className="quickview-cat">{quickViewProduct.category}</span>
              <h3 className="quickview-title">{quickViewProduct.name}</h3>
              <p className="quickview-tagline">{quickViewProduct.tagline}</p>
            </div>

            <p className="quickview-desc">{quickViewProduct.description}</p>

            {/* Nutrition Facts */}
            {quickViewProduct.nutrition && (
              <div className="nutrition-grid">
                <div className="nutrition-item">
                  <span className="nut-label">Calories</span>
                  <span className="nut-val">{quickViewProduct.nutrition.calories}</span>
                </div>
                <div className="nutrition-item">
                  <span className="nut-label">Fat</span>
                  <span className="nut-val">{quickViewProduct.nutrition.fat}</span>
                </div>
                <div className="nutrition-item">
                  <span className="nut-label">Carbs</span>
                  <span className="nut-val">{quickViewProduct.nutrition.carbs}</span>
                </div>
                <div className="nutrition-item">
                  <span className="nut-label">Protein</span>
                  <span className="nut-val">{quickViewProduct.nutrition.protein}</span>
                </div>
              </div>
            )}

            {/* Allergens warning */}
            {quickViewProduct.nutrition?.allergens && (
              <div className="allergen-box">
                <span className="allergen-title">Allergen Safety:</span>
                <span className="allergen-desc">{quickViewProduct.nutrition.allergens}</span>
              </div>
            )}

            {/* Sizes selector */}
            <div className="quickview-size-selector">
              <label className="size-label">Select Size:</label>
              <div className="size-buttons-row">
                {quickViewProduct.sizes?.map((s, idx) => (
                  <button
                    key={s.label}
                    className={`size-btn ${selectedSizeIdx === idx ? 'is-selected' : ''}`}
                    onClick={() => setSelectedSizeIdx(idx)}
                  >
                    <span>{s.label}</span>
                    <span className="s-price">${s.price.toFixed(2)}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Action Row */}
            <div className="quickview-actions-row">
              <div className="quickview-stepper">
                <button
                  className="q-step-btn"
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  disabled={qty <= 1}
                >
                  -
                </button>
                <span className="q-step-val">{qty}</span>
                <button className="q-step-btn" onClick={() => setQty(qty + 1)}>
                  +
                </button>
              </div>

              <button className="quickview-add-btn" onClick={handleAdd}>
                <span>Add to Cart (${(size.price * qty).toFixed(2)})</span>
              </button>

              <button
                className={`quickview-fav-btn ${isWishlisted ? 'is-fav' : ''}`}
                onClick={() => toggleWishlist(quickViewProduct.id)}
                title="Add to Wishlist"
              >
                ♥
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
