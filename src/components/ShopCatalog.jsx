import { useState, useMemo } from 'react'
import { products, categories } from '../data/products'
import { useCart } from '../context/CartContext'
import './ShopCatalog.css'

export default function ShopCatalog() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDietary, setSelectedDietary] = useState([])
  const [sortBy, setSortBy] = useState('featured')
  const [cardSizes, setCardSizes] = useState({}) // { [productId]: sizeIndex }
  const [quantities, setQuantities] = useState({}) // { [productId]: qty }

  const { addToCart, wishlist, toggleWishlist, setQuickViewProduct } = useCart()

  const allDietaryOptions = ['Gluten-Free', '100% Organic', 'Vegetarian', 'Vegan']

  const toggleDietaryFilter = (diet) => {
    setSelectedDietary((prev) =>
      prev.includes(diet) ? prev.filter((d) => d !== diet) : [...prev, diet]
    )
  }

  // Filter & sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (selectedCategory !== 'All' && p.category !== selectedCategory) return false

        // Search filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase()
          const matchesName = p.name.toLowerCase().includes(q)
          const matchesDesc = p.description.toLowerCase().includes(q)
          const matchesCategory = p.category.toLowerCase().includes(q)
          if (!matchesName && !matchesDesc && !matchesCategory) return false
        }

        // Dietary filters
        if (selectedDietary.length > 0) {
          const hasAllDietary = selectedDietary.every((d) =>
            p.dietary.some((pDiet) => pDiet.toLowerCase().includes(d.toLowerCase()))
          )
          if (!hasAllDietary) return false
        }

        return true
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price
        if (sortBy === 'price-desc') return b.price - a.price
        if (sortBy === 'rating') return b.rating - a.rating
        if (sortBy === 'reviews') return b.reviewsCount - a.reviewsCount
        return 0 // featured default
      })
  }, [selectedCategory, searchQuery, selectedDietary, sortBy])

  const handleSizeChange = (productId, sizeIndex) => {
    setCardSizes((prev) => ({ ...prev, [productId]: sizeIndex }))
  }

  const handleQtyChange = (productId, delta) => {
    setQuantities((prev) => {
      const cur = prev[productId] || 1
      const updated = Math.max(1, cur + delta)
      return { ...prev, [productId]: updated }
    })
  }

  const handleAddCardToCart = (product) => {
    const sizeIdx = cardSizes[product.id] || 0
    const chosenSize = product.sizes[sizeIdx] || product.sizes[0]
    const qty = quantities[product.id] || 1
    addToCart(product, chosenSize, qty)
  }

  return (
    <section id="shop-section" className="shop-section">
      <div className="shop-container">
        {/* Section Header */}
        <div className="section-head text-center">
          <span className="section-tagline">Scoopy Micro-Creamery</span>
          <h2 className="section-title">Fresh Small-Batch Ice Creams</h2>
          <p className="section-subtitle">
            Hand-churned weekly with 100% pasture-raised organic milk and pure whole fruits. Shipped
            melt-free in reusable cold-chain dry ice insulation.
          </p>
        </div>

        {/* Filter & Search Bar Controls */}
        <div className="shop-controls-bar">
          {/* Categories Bar */}
          <div className="category-pills">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`category-pill-btn ${selectedCategory === cat ? 'is-active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="search-box-wrapper">
            <svg
              className="search-icon"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search flavor, ingredient..."
              className="shop-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                className="clear-search-btn"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Secondary Bar: Dietary tags & Sorting */}
        <div className="shop-sub-controls">
          <div className="dietary-filter-group">
            <span className="filter-label">Dietary:</span>
            {allDietaryOptions.map((diet) => {
              const active = selectedDietary.includes(diet)
              return (
                <button
                  key={diet}
                  className={`dietary-filter-chip ${active ? 'is-active' : ''}`}
                  onClick={() => toggleDietaryFilter(diet)}
                >
                  {active && '✓ '}
                  {diet}
                </button>
              )
            })}
          </div>

          <div className="sort-by-wrapper">
            <span className="filter-label">Sort by:</span>
            <select
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="featured">Featured & Curated</option>
              <option value="rating">Highest Rated (★)</option>
              <option value="reviews">Most Popular</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="products-grid">
            {filteredProducts.map((product) => {
              const sizeIdx = cardSizes[product.id] || 0
              const currentSize = product.sizes[sizeIdx] || product.sizes[0]
              const qty = quantities[product.id] || 1
              const isWishlisted = wishlist.includes(product.id)

              return (
                <div key={product.id} className="product-card">
                  {/* Card Media Header */}
                  <div
                    className="product-card-media"
                    style={{ background: product.gradient }}
                  >
                    <span
                      className="product-card-badge"
                      style={{ backgroundColor: product.badgeColor || '#7c55d6' }}
                    >
                      {product.badge}
                    </span>

                    <button
                      className={`card-wish-btn ${isWishlisted ? 'is-active' : ''}`}
                      onClick={() => toggleWishlist(product.id)}
                      aria-label="Add to favorites"
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill={isWishlisted ? '#ff4d6d' : 'none'}
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                    </button>

                    <div className="product-card-img-container">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="product-card-img"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* Card Details Body */}
                  <div className="product-card-body">
                    <div className="card-rating-row">
                      <span className="card-stars">★ {product.rating}</span>
                      <span className="card-review-count">({product.reviewsCount} reviews)</span>
                      <span className="card-cat-pill">{product.category}</span>
                    </div>

                    <h3 className="card-title">{product.name}</h3>
                    <p className="card-tagline">{product.tagline}</p>

                    {/* Dietary Tags list */}
                    <div className="card-dietary-tags">
                      {product.dietary.slice(0, 2).map((d) => (
                        <span key={d} className="card-diet-tag">
                          {d}
                        </span>
                      ))}
                    </div>

                    {/* Size Selector Dropdown */}
                    <div className="card-size-selector">
                      <label className="card-size-label">Select Size:</label>
                      <select
                        className="card-size-select"
                        value={sizeIdx}
                        onChange={(e) => handleSizeChange(product.id, Number(e.target.value))}
                      >
                        {product.sizes.map((s, idx) => (
                          <option key={s.label} value={idx}>
                            {s.label} — ${s.price.toFixed(2)}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Price & Quantity & Add To Cart */}
                    <div className="card-purchase-row">
                      <div className="card-price-block">
                        <span className="card-currency">$</span>
                        <span className="card-price-num">
                          {(currentSize.price * qty).toFixed(2)}
                        </span>
                      </div>

                      <div className="card-qty-stepper">
                        <button
                          className="qty-btn"
                          onClick={() => handleQtyChange(product.id, -1)}
                          disabled={qty <= 1}
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="qty-num">{qty}</span>
                        <button
                          className="qty-btn"
                          onClick={() => handleQtyChange(product.id, 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Card Actions */}
                    <div className="card-actions-grid">
                      <button
                        className="card-add-cart-btn"
                        onClick={() => handleAddCardToCart(product)}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <path d="M12 5v14M5 12h14" />
                        </svg>
                        <span>Add to Cart</span>
                      </button>

                      <button
                        className="card-quick-view-btn"
                        onClick={() => setQuickViewProduct(product)}
                        title="Nutrition & allergen facts"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="no-products-found">
            <span className="no-products-emoji">🔍</span>
            <h3>No matching frozen treats found</h3>
            <p>Try clearing your search query or dietary filters.</p>
            <button
              className="reset-filters-btn"
              onClick={() => {
                setSelectedCategory('All')
                setSearchQuery('')
                setSelectedDietary([])
              }}
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
