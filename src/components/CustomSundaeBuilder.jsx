import { useState } from 'react'
import { useCart } from '../context/CartContext'
import './CustomSundaeBuilder.css'

const BASE_FLAVORS = [
  { id: 'blueberry', name: 'Blueberry Lagoon', color: '#9B7DEA', price: 0 },
  { id: 'mango', name: 'Mango Sunset', color: '#FF9D5C', price: 0 },
  { id: 'strawberry', name: 'Strawberry Bliss', color: '#FF87B0', price: 0 },
  { id: 'pistachio', name: 'Pistachio Dream', color: '#8CB050', price: 0.5 },
  { id: 'choco', name: 'Choco Fudge', color: '#8A4E30', price: 0.5 },
  { id: 'coconut', name: 'Vegan Coconut Cloud', color: '#3D9970', price: 0.5 },
]

const VESSELS = [
  { id: 'waffle-cone', name: 'Crispy Waffle Cone', price: 1.0, icon: '🍦' },
  { id: 'choco-cone', name: 'Choco-Dipped Cone', price: 1.5, icon: '🍫' },
  { id: 'artisan-cup', name: 'Eco Artisan Cup', price: 0, icon: '🍨' },
  { id: 'brioche-bun', name: 'Warm Brioche Bun', price: 2.0, icon: '🥐' },
]

const DRIZZLES = [
  { id: 'hot-fudge', name: 'Belgian Hot Fudge', price: 0.75 },
  { id: 'salted-caramel', name: 'Salted Caramel Drizzle', price: 0.75 },
  { id: 'berry-coulis', name: 'Wild Berry Coulis', price: 0.75 },
  { id: 'white-choco', name: 'White Chocolate Glaze', price: 0.75 },
  { id: 'none', name: 'No Drizzle', price: 0 },
]

const TOPPINGS = [
  { id: 'pistachios', name: 'Roasted Pistachios', price: 1.0 },
  { id: 'choco-chunks', name: 'Chocolate Flakes', price: 0.75 },
  { id: 'rainbow-sprinkles', name: 'Rainbow Sprinkles', price: 0.5 },
  { id: 'marshmallows', name: 'Toasted Marshmallows', price: 0.75 },
  { id: 'berries', name: 'Fresh Berries', price: 1.0 },
]

export default function CustomSundaeBuilder() {
  const { addToCart } = useCart()

  const [selectedFlavors, setSelectedFlavors] = useState(['blueberry'])
  const [selectedVessel, setSelectedVessel] = useState(VESSELS[0])
  const [selectedDrizzle, setSelectedDrizzle] = useState(DRIZZLES[0])
  const [selectedToppings, setSelectedToppings] = useState(['choco-chunks'])
  const [creationName, setCreationName] = useState("My Sweet Masterpiece")

  const BASE_PRICE = 5.50

  const toggleFlavor = (flavorId) => {
    if (selectedFlavors.includes(flavorId)) {
      if (selectedFlavors.length > 1) {
        setSelectedFlavors(selectedFlavors.filter((id) => id !== flavorId))
      }
    } else {
      if (selectedFlavors.length < 2) {
        setSelectedFlavors([...selectedFlavors, flavorId])
      } else {
        // Replace oldest
        setSelectedFlavors([selectedFlavors[1], flavorId])
      }
    }
  }

  const toggleTopping = (toppingId) => {
    if (selectedToppings.includes(toppingId)) {
      setSelectedToppings(selectedToppings.filter((id) => id !== toppingId))
    } else {
      setSelectedToppings([...selectedToppings, toppingId])
    }
  }

  // Calculate dynamic price
  const flavorsCost = selectedFlavors.reduce((acc, fid) => {
    const f = BASE_FLAVORS.find((bf) => bf.id === fid)
    return acc + (f ? f.price : 0)
  }, 0)

  const vesselCost = selectedVessel.price
  const drizzleCost = selectedDrizzle.price
  const toppingsCost = selectedToppings.reduce((acc, tid) => {
    const t = TOPPINGS.find((bt) => bt.id === tid)
    return acc + (t ? t.price : 0)
  }, 0)

  const totalPrice = BASE_PRICE + flavorsCost + vesselCost + drizzleCost + toppingsCost

  const handleAddCustomSundae = () => {
    const flavorNames = selectedFlavors
      .map((fid) => BASE_FLAVORS.find((f) => f.id === fid)?.name)
      .join(' + ')

    const toppingNames =
      selectedToppings.length > 0
        ? selectedToppings.map((tid) => TOPPINGS.find((t) => t.id === tid)?.name).join(', ')
        : 'None'

    const customProduct = {
      id: `custom-sundae-${Date.now()}`,
      name: creationName.trim() || 'Custom Artisan Sundae',
      price: totalPrice,
      image: '/images/Transparent Images/ChatGPT Image Jul 13, 2026, 11_52_05 AM.png',
      accent: '#9B7DEA',
    }

    const customNotes = `Vessel: ${selectedVessel.name} | Flavors: ${flavorNames} | Drizzle: ${selectedDrizzle.name} | Toppings: ${toppingNames}`

    addToCart(customProduct, { label: 'Custom Artisan Bowl', price: totalPrice }, 1, customNotes)
  }

  return (
    <section id="custom-builder" className="sundae-builder-section">
      <div className="builder-container">
        <div className="section-head text-center">
          <span className="section-tagline">Interactive Creamery Bar</span>
          <h2 className="section-title">Design Your Dream Sundae</h2>
          <p className="section-subtitle">
            Mix and match freshly churned scoops, crispy warm vessels, artisan drizzles, and hand-cut
            toppings. Handcrafted just for you!
          </p>
        </div>

        <div className="builder-layout">
          {/* Left: Customization steps */}
          <div className="builder-controls">
            {/* Step 1: Base Flavors */}
            <div className="builder-step-card">
              <div className="step-header">
                <span className="step-number">1</span>
                <div>
                  <h3 className="step-title">Choose Scoop Flavors (Pick 1 or 2)</h3>
                  <p className="step-hint">Selected: {selectedFlavors.length}/2 scoops</p>
                </div>
              </div>

              <div className="flavors-selection-grid">
                {BASE_FLAVORS.map((flavor) => {
                  const isSelected = selectedFlavors.includes(flavor.id)
                  return (
                    <button
                      key={flavor.id}
                      type="button"
                      className={`builder-flavor-btn ${isSelected ? 'is-selected' : ''}`}
                      onClick={() => toggleFlavor(flavor.id)}
                    >
                      <span
                        className="flavor-swatch"
                        style={{ backgroundColor: flavor.color }}
                      />
                      <span className="flavor-btn-name">{flavor.name}</span>
                      {flavor.price > 0 && (
                        <span className="flavor-extra-badge">+${flavor.price.toFixed(2)}</span>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Step 2: Vessels */}
            <div className="builder-step-card">
              <div className="step-header">
                <span className="step-number">2</span>
                <div>
                  <h3 className="step-title">Select Serving Vessel</h3>
                  <p className="step-hint">Freshly pressed daily</p>
                </div>
              </div>

              <div className="options-selection-grid">
                {VESSELS.map((vessel) => {
                  const isSelected = selectedVessel.id === vessel.id
                  return (
                    <button
                      key={vessel.id}
                      type="button"
                      className={`builder-option-btn ${isSelected ? 'is-selected' : ''}`}
                      onClick={() => setSelectedVessel(vessel)}
                    >
                      <span className="option-icon">{vessel.icon}</span>
                      <span className="option-name">{vessel.name}</span>
                      <span className="option-price">
                        {vessel.price === 0 ? 'Free' : `+$${vessel.price.toFixed(2)}`}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Step 3: Drizzle */}
            <div className="builder-step-card">
              <div className="step-header">
                <span className="step-number">3</span>
                <div>
                  <h3 className="step-title">Artisan Warm Drizzle</h3>
                  <p className="step-hint">Silky ribbons poured over your scoop</p>
                </div>
              </div>

              <div className="options-selection-grid">
                {DRIZZLES.map((drizzle) => {
                  const isSelected = selectedDrizzle.id === drizzle.id
                  return (
                    <button
                      key={drizzle.id}
                      type="button"
                      className={`builder-option-btn ${isSelected ? 'is-selected' : ''}`}
                      onClick={() => setSelectedDrizzle(drizzle)}
                    >
                      <span className="option-name">{drizzle.name}</span>
                      <span className="option-price">
                        {drizzle.price === 0 ? 'Free' : `+$${drizzle.price.toFixed(2)}`}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Step 4: Toppings */}
            <div className="builder-step-card">
              <div className="step-header">
                <span className="step-number">4</span>
                <div>
                  <h3 className="step-title">Crunch & Gourmet Toppings</h3>
                  <p className="step-hint">Select as many as your sweet tooth craves</p>
                </div>
              </div>

              <div className="options-selection-grid">
                {TOPPINGS.map((topping) => {
                  const isSelected = selectedToppings.includes(topping.id)
                  return (
                    <button
                      key={topping.id}
                      type="button"
                      className={`builder-option-btn ${isSelected ? 'is-selected' : ''}`}
                      onClick={() => toggleTopping(topping.id)}
                    >
                      <span className="topping-checkbox">{isSelected ? '✓' : '+'}</span>
                      <span className="option-name">{topping.name}</span>
                      <span className="option-price">+${topping.price.toFixed(2)}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right: Live Sundae Summary Card */}
          <div className="builder-live-summary">
            <div className="summary-sticky-card">
              <div className="summary-badge">Live Customizer</div>

              <div className="summary-visual-preview">
                <div className="preview-dish-wrapper">
                  <span className="preview-vessel-emoji">{selectedVessel.icon}</span>
                  <div className="preview-scoops-stack">
                    {selectedFlavors.map((fid) => {
                      const f = BASE_FLAVORS.find((bf) => bf.id === fid)
                      return (
                        <div
                          key={fid}
                          className="preview-scoop-orb"
                          style={{ backgroundColor: f?.color || '#9B7DEA' }}
                          title={f?.name}
                        />
                      )
                    })}
                  </div>
                  {selectedDrizzle.id !== 'none' && (
                    <div className="preview-drizzle-effect">🍯 {selectedDrizzle.name}</div>
                  )}
                </div>
              </div>

              {/* Name input */}
              <div className="custom-name-field">
                <label className="name-field-label">Name your creation:</label>
                <input
                  type="text"
                  className="creation-name-input"
                  value={creationName}
                  onChange={(e) => setCreationName(e.target.value)}
                  placeholder="e.g. Midnight Berry Bliss"
                />
              </div>

              {/* Ingredients breakdown */}
              <div className="summary-breakdown">
                <div className="breakdown-line">
                  <span>Base Scoop(s)</span>
                  <span>${(BASE_PRICE + flavorsCost).toFixed(2)}</span>
                </div>
                <div className="breakdown-line">
                  <span>Vessel ({selectedVessel.name})</span>
                  <span>${vesselCost.toFixed(2)}</span>
                </div>
                <div className="breakdown-line">
                  <span>Drizzle ({selectedDrizzle.name})</span>
                  <span>${drizzleCost.toFixed(2)}</span>
                </div>
                <div className="breakdown-line">
                  <span>Toppings ({selectedToppings.length} items)</span>
                  <span>${toppingsCost.toFixed(2)}</span>
                </div>

                <div className="breakdown-divider" />

                <div className="breakdown-total">
                  <span>Total Creation Price</span>
                  <span className="breakdown-price-tag">${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              {/* Add Custom Sundae to Cart button */}
              <button className="add-custom-btn" onClick={handleAddCustomSundae}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 5v14M5 12h14" />
                </svg>
                <span>Add Custom Bowl to Cart</span>
              </button>

              <p className="summary-guarantee-note">
                ❄️ Packed with dry ice. Guaranteed frozen solid upon doorstep delivery!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
