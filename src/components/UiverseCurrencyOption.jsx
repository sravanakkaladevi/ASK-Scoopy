import { useCart } from '../context/useCart'
import './UiverseCurrencyOption.css'

export const UiverseCurrencyOption = ({ compact = false }) => {
  const { currency, changeCurrency, currencies } = useCart()

  return (
    <div className={`uiverse-currency-wrapper ${compact ? 'is-compact' : ''}`}>
      <div className="uiverse-currency-container">
        {Object.values(currencies).map((curr) => {
          const isSelected = currency === curr.code
          return (
            <label
              key={curr.code}
              className={`uiverse-currency-item ${isSelected ? 'is-active' : ''}`}
              title={`Switch currency to ${curr.label}`}
            >
              <input
                type="radio"
                name="uiverse-currency-radio"
                value={curr.code}
                checked={isSelected}
                onChange={() => changeCurrency(curr.code)}
                className="uiverse-currency-input"
              />
              <span className="uiverse-currency-btn">
                <span className="uiverse-flag">{curr.flag}</span>
                <span className="uiverse-symbol">{curr.symbol}</span>
                {!compact && <span className="uiverse-code">{curr.code}</span>}
              </span>
            </label>
          )
        })}
      </div>
    </div>
  )
}

export default UiverseCurrencyOption
