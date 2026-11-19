import { useState } from 'react'
import { useCart } from '../context/CartContext'
import {
  ScoopBlueberry,
  ScoopMango,
  ScoopStrawberry,
  ScoopPistachio,
  ScoopChoco,
  ScoopCoconut,
  IconWaffleCone,
  IconChocoCone,
  IconEcoCup,
  IconBriocheBun,
  IconHotFudge,
  IconSundaeBowl,
} from './CreameryIcons'
import './CustomSundaeModal.css'

const SCOOPS = [
  { id: 'blueberry', name: 'Blueberry Lagoon', price: 0, Icon: ScoopBlueberry, extra: 'Free' },
  { id: 'mango', name: 'Mango Sunset', price: 0, Icon: ScoopMango, extra: 'Free' },
  { id: 'strawberry', name: 'Strawberry Bliss', price: 0, Icon: ScoopStrawberry, extra: 'Free' },
  { id: 'pistachio', name: 'Pistachio Dream', price: 40, Icon: ScoopPistachio, extra: '+ ₹40' },
  { id: 'choco', name: 'Choco Fudge', price: 40, Icon: ScoopChoco, extra: '+ ₹40' },
  { id: 'coconut', name: 'Vegan Coconut Cloud', price: 40, Icon: ScoopCoconut, extra: '+ ₹40' },
]

const VESSELS = [
  { id: 'waffle-cone', name: 'Crispy Waffle Cone', price: 50, Icon: IconWaffleCone, extra: '+ ₹50' },
  { id: 'choco-cone', name: 'Choco-Dipped Cone', price: 70, Icon: IconChocoCone, extra: '+ ₹70' },
  { id: 'artisan-cup', name: 'Eco Artisan Cup', price: 0, Icon: IconEcoCup, extra: 'Free' },
  { id: 'brioche-bun', name: 'Warm Brioche Bun', price: 90, Icon: IconBriocheBun, extra: '+ ₹90' },
]

const FUDGE_PRICE = 40 // Belgian Hot Fudge included
const BASE_PRICE = 260 // Base price

export default function CustomSundaeModal() {
  const { isCustomizerOpen, setIsCustomizerOpen, addToCart, formatPrice } = useCart()

  const [selectedScoops, setSelectedScoops] = useState(['blueberry'])
  const [selectedVessel, setSelectedVessel] = useState(VESSELS[0])

  if (!isCustomizerOpen) return null

  const toggleScoop = (sid) => {
    if (selectedScoops.includes(sid)) {
      if (selectedScoops.length > 1) {
        setSelectedScoops(selectedScoops.filter((id) => id !== sid))
      }
    } else {
      if (selectedScoops.length < 2) {
        setSelectedScoops([...selectedScoops, sid])
      } else {
        // Replace second scoop
        setSelectedScoops([selectedScoops[0], sid])
      }
    }
  }

  const scoopsCost = selectedScoops.reduce((acc, sid) => {
    const s = SCOOPS.find((sc) => sc.id === sid)
    return acc + (s ? s.price : 0)
  }, 0)

  const vesselCost = selectedVessel.price
  const totalPrice = BASE_PRICE + scoopsCost + vesselCost + FUDGE_PRICE

  const handleAddCustomSundae = () => {
    const scoopNames = selectedScoops
      .map((sid) => SCOOPS.find((s) => s.id === sid)?.name)
      .join(' + ')

    const customProduct = {
      id: `custom-sundae-${Date.now()}`,
      name: `Custom Sundae (${selectedVessel.name})`,
      price: totalPrice,
      image: '/images/Transparent Images/ChatGPT Image Jul 13, 2026, 11_52_05 AM.png',
      accent: '#8B5CF6',
    }

    const customNotes = `${selectedVessel.name} | Scoops: ${scoopNames} | Belgian Hot Fudge`

    addToCart(customProduct, { label: 'Custom Artisan Sundae', price: totalPrice }, 1, customNotes)
    setIsCustomizerOpen(false)
  }

  const VesselIcon = selectedVessel.Icon

  return (
    <div
      className="sundae-modal-overlay"
      onClick={() => setIsCustomizerOpen(false)}
    >
      <div
        className="sundae-dark-modal"
        onClick={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sundae-dark-header">
          <div>
            <span className="sundae-dark-pill">INTERACTIVE CREAMERY</span>
            <h2 className="sundae-dark-title">Design Your Custom Scoop</h2>
          </div>
          <button
            className="sundae-dark-close"
            onClick={() => setIsCustomizerOpen(false)}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        {/* Scrollable Content Body with Custom Dark Scrollbar */}
        <div className="sundae-dark-body custom-dark-scrollbar">
          {/* Top Summary Cream Pill Bar */}
          <div className="sundae-summary-cream-pill">
            <div className="summary-left-group">
              <VesselIcon className="summary-vessel-thumb" />
              <span className="summary-vessel-name">{selectedVessel.name}</span>

              {selectedScoops.map((sid) => {
                const scoop = SCOOPS.find((s) => s.id === sid)
                if (!scoop) return null
                const SIcon = scoop.Icon
                return (
                  <span key={sid} className="summary-scoop-item" title={scoop.name}>
                    <SIcon className="summary-scoop-thumb" />
                  </span>
                )
              })}

              <IconHotFudge className="summary-fudge-thumb" />
              <span className="summary-fudge-name">Belgian Hot Fudge</span>
            </div>

            <div className="summary-price-tag">
              {formatPrice(totalPrice)}
            </div>
          </div>

          {/* Section 1: Choose Scoops */}
          <div className="sundae-section-block">
            <h4 className="sundae-section-heading">1. CHOOSE SCOOPS (PICK 1 OR 2):</h4>
            <div className="sundae-cards-grid">
              {SCOOPS.map((scoop) => {
                const isSelected = selectedScoops.includes(scoop.id)
                const SIcon = scoop.Icon
                return (
                  <button
                    key={scoop.id}
                    type="button"
                    className={`sundae-option-card ${isSelected ? 'is-selected' : ''}`}
                    onClick={() => toggleScoop(scoop.id)}
                  >
                    <SIcon className="option-card-thumb" />
                    <div className="option-card-text">
                      <span className="option-card-name">{scoop.name}</span>
                    </div>
                    {scoop.price > 0 && (
                      <span className="option-card-price">{scoop.extra}</span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Section 2: Select Vessel */}
          <div className="sundae-section-block">
            <h4 className="sundae-section-heading">2. SELECT VESSEL:</h4>
            <div className="sundae-cards-grid">
              {VESSELS.map((vessel) => {
                const isSelected = selectedVessel.id === vessel.id
                const VIcon = vessel.Icon
                return (
                  <button
                    key={vessel.id}
                    type="button"
                    className={`sundae-option-card ${isSelected ? 'is-selected' : ''}`}
                    onClick={() => setSelectedVessel(vessel)}
                  >
                    <VIcon className="option-card-thumb" />
                    <div className="option-card-text">
                      <span className="option-card-name">{vessel.name}</span>
                    </div>
                    <span className="option-card-price">{vessel.extra}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Sticky Dark Footer */}
        <div className="sundae-dark-footer">
          <div className="footer-price-info">
            <span className="footer-price-label">TOTAL CUSTOM CREATION:</span>
            <span className="footer-price-amount">{formatPrice(totalPrice)}</span>
          </div>

          <button
            type="button"
            className="sundae-cta-btn"
            onClick={handleAddCustomSundae}
          >
            <span>Add Custom Sundae to Bag</span>
            <IconSundaeBowl className="cta-sundae-icon" />
          </button>
        </div>
      </div>
    </div>
  )
}
