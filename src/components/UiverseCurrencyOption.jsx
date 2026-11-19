import { useState, useRef, useEffect } from 'react'
import { useCart } from '../context/useCart'
import './UiverseCurrencyOption.css'

export const UiverseCurrencyOption = () => {
  const { currency, changeCurrency, currencies, currentCurrency } = useCart()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (code) => {
    changeCurrency(code)
    setIsOpen(false)
  }

  const active = currentCurrency || currencies[currency] || currencies.INR

  return (
    <div className="uiverse-currency-dropdown" ref={menuRef}>
      <button
        type="button"
        className={`uiverse-currency-trigger ${isOpen ? 'is-open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        title="Change currency"
      >
        <span className="uiverse-curr-flag">{active.flag}</span>
        <span className="uiverse-curr-symbol">{active.symbol}</span>
        <span className="uiverse-curr-code">{active.code}</span>
        <span className="uiverse-curr-chevron">{isOpen ? '▴' : '▾'}</span>
      </button>

      {isOpen && (
        <div className="uiverse-currency-menu" role="listbox">
          {Object.values(currencies).map((curr) => {
            const isSelected = currency === curr.code
            return (
              <button
                key={curr.code}
                type="button"
                className={`uiverse-currency-menu-item ${isSelected ? 'is-selected' : ''}`}
                onClick={() => handleSelect(curr.code)}
                role="option"
                aria-selected={isSelected}
              >
                <span className="uiverse-curr-flag">{curr.flag}</span>
                <span className="uiverse-curr-symbol">{curr.symbol}</span>
                <span className="uiverse-curr-name">{curr.label}</span>
                {isSelected && <span className="uiverse-curr-check">✓</span>}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default UiverseCurrencyOption
