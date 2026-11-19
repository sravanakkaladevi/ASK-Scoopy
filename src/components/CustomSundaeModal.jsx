import { useState } from 'react'
import { useCart } from '../context/CartContext'
import './CustomSundaeModal.css'

const BASE_FLAVORS = [
  { id: 'blueberry', name: 'Blueberry Lagoon', color: '#9B7DEA', price: 0 },
  { id: 'mango', name: 'Mango Sunset', color: '#FF9D5C', price: 0 },
  { id: 'strawberry', name: 'Strawberry Bliss', color: '#FF87B0', price: 0 },
  { id: 'pistachio', name: 'Pistachio Dream', color: '#8CB050', price: 40 },
  { id: 'choco', name: 'Choco Fudge', color: '#8A4E30', price: 40 },
  { id: 'coconut', name: 'Vegan Coconut Cloud', color: '#3D9970', price: 40 },
]

const VESSELS = [
  { id: 'waffle-cone', name: 'Crispy Waffle Cone', price: 50, icon: '🍦' },
  { id: 'choco-cone', name: 'Choco-Dipped Cone', price: 70, icon: '🍫' },
  { id: 'artisan-cup', name: 'Eco Artisan Cup', price: 0, icon: '🍨' },
  { id: 'brioche-bun', name: 'Warm Brioche Bun', price: 90, icon: '🥐' },
]

const DRIZZLES = [
  { id: 'hot-fudge', name: 'Belgian Hot Fudge', price: 40 },
  { id: 'salted-caramel', name: 'Salted Caramel Drizzle', price: 40 },
  { id: 'berry-coulis', name: 'Wild Berry Coulis', price: 40 },
  { id: 'none', name: 'No Drizzle', price: 0 },
]

const TOPPINGS = [
  { id: 'pistachios', name: 'Roasted Pistachios', price: 40 },
  { id: 'choco-chunks', name: 'Chocolate Flakes', price: 40 },
  { id: 'rainbow-sprinkles', name: 'Rainbow Sprinkles', price: 30 },
  { id: 'berries', name: 'Fresh Berries', price: 50 },
]

export default function CustomSundaeModal() {
  const { isCustomizerOpen, setIsCustomizerOpen, addToCart } = useCart()

  const [selectedFlavors, setSelectedFlavors] = useState(['blueberry'])
  const [selectedVessel, setSelectedVessel] = useState(VESSELS[0])
  const [selectedDrizzle, setSelectedDrizzle] = useState(DRIZZLES[0])
  const [selectedToppings, setSelectedToppings] = useState(['choco-chunks'])
  const creationName = 'Custom Artisan Sundae'

  if (!isCustomizerOpen) return null

  const BASE_PRICE = 220

  const toggleFlavor = (fid) => {
    if (selectedFlavors.includes(fid)) {
      if (selectedFlavors.length > 1) {
        setSelectedFlavors(selectedFlavors.filter((id) => id !== fid))
      }
    } else {
      if (selectedFlavors.length < 2) {
        setSelectedFlavors([...selectedFlavors, fid])
      } else {
        setSelectedFlavors([selectedFlavors[1], fid])
      }
    }
  }

  const toggleTopping = (tid) => {
    if (selectedToppings.includes(tid)) {
      setSelectedToppings(selectedToppings.filter((id) => id !== tid))
    } else {
      setSelectedToppings([...selectedToppings, tid])
    }
  }

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
      name: creationName,
      price: totalPrice,
      image: '/images/Transparent Images/ChatGPT Image Jul 13, 2026, 11_52_05 AM.png',
      accent: '#9B7DEA',
    }

    const customNotes = `${selectedVessel.name} | ${flavorNames} | ${selectedDrizzle.name} | ${toppingNames}`

    addToCart(customProduct, { label: 'Custom Artisan Bowl', price: totalPrice }, 1, customNotes)
    setIsCustomizerOpen(false)
  }

  return (
    <div className="sundae-modal-overlay" onClick={() => setIsCustomizerOpen(false)}>
      <div className="sundae-modal-panel" onClick={(e) => e.stopPropagation()}>
        <div className="sundae-modal-header">
          <div>
            <span className="sundae-mini-badge">Interactive Creamery</span>
            <h3 className="sundae-title">Design Your Custom Scoop</h3>
          </div>
          <button className="sundae-close-btn" onClick={() => setIsCustomizerOpen(false)}>
            ×
          </button>
        </div>

        <div className="sundae-modal-body">
          {/* Visual Preview */}
          <div className="sundae-preview-strip">
            <span className="vessel-badge">{selectedVessel.icon} {selectedVessel.name}</span>
            <div className="scoops-row">
              {selectedFlavors.map((fid) => {
                const f = BASE_FLAVORS.find((bf) => bf.id === fid)
                return (
                  <span
                    key={fid}
                    className="scoop-bubble"
                    style={{ backgroundColor: f?.color }}
                    title={f?.name}
                  />
                )
              })}
            </div>
            {selectedDrizzle.id !== 'none' && (
              <span className="drizzle-badge">🍯 {selectedDrizzle.name}</span>
            )}
            <span className="total-badge">₹{totalPrice}</span>
          </div>

          {/* Step 1: Base Flavors */}
          <div className="step-block">
            <span className="step-label">1. Choose Scoops (Pick 1 or 2):</span>
            <div className="chip-grid">
              {BASE_FLAVORS.map((f) => {
                const isSel = selectedFlavors.includes(f.id)
                return (
                  <button
                    key={f.id}
                    type="button"
                    className={`custom-chip ${isSel ? 'is-selected' : ''}`}
                    onClick={() => toggleFlavor(f.id)}
                  >
                    <span className="swatch" style={{ backgroundColor: f.color }} />
                    <span>{f.name}</span>
                    {f.price > 0 && <span className="chip-extra">+₹{f.price}</span>}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Step 2: Vessels */}
          <div className="step-block">
            <span className="step-label">2. Select Vessel:</span>
            <div className="chip-grid">
              {VESSELS.map((v) => {
                const isSel = selectedVessel.id === v.id
                return (
                  <button
                    key={v.id}
                    type="button"
                    className={`custom-chip ${isSel ? 'is-selected' : ''}`}
                    onClick={() => setSelectedVessel(v)}
                  >
                    <span>{v.icon}</span>
                    <span>{v.name}</span>
                    <span className="chip-extra">{v.price === 0 ? 'Free' : `+₹${v.price}`}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Step 3: Drizzle */}
          <div className="step-block">
            <span className="step-label">3. Warm Drizzle:</span>
            <div className="chip-grid">
              {DRIZZLES.map((d) => {
                const isSel = selectedDrizzle.id === d.id
                return (
                  <button
                    key={d.id}
                    type="button"
                    className={`custom-chip ${isSel ? 'is-selected' : ''}`}
                    onClick={() => setSelectedDrizzle(d)}
                  >
                    <span>{d.name}</span>
                    <span className="chip-extra">{d.price === 0 ? 'Free' : `+₹${d.price}`}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Step 4: Toppings */}
          <div className="step-block">
            <span className="step-label">4. Gourmet Toppings:</span>
            <div className="chip-grid">
              {TOPPINGS.map((t) => {
                const isSel = selectedToppings.includes(t.id)
                return (
                  <button
                    key={t.id}
                    type="button"
                    className={`custom-chip ${isSel ? 'is-selected' : ''}`}
                    onClick={() => toggleTopping(t.id)}
                  >
                    <span>{isSel ? '✓ ' : '+ '}</span>
                    <span>{t.name}</span>
                    <span className="chip-extra">+₹{t.price}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sundae-modal-footer">
          <div className="sundae-footer-pricing">
            <span className="footer-label">Total Custom Creation:</span>
            <span className="footer-price">₹{totalPrice}</span>
          </div>
          <button className="sundae-add-btn" onClick={handleAddCustomSundae}>
            Add Custom Sundae to Bag 🍨
          </button>
        </div>
      </div>
    </div>
  )
}
