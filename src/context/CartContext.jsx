import { createContext, useState, useEffect } from 'react'
import { CURRENCIES } from '../data/currencies'

const CartContext = createContext(null)

const CART_STORAGE_KEY = 'scoopy_cart_v1'
const WISHLIST_STORAGE_KEY = 'scoopy_wishlist_v1'

export const CartProvider = ({ children }) => {
  // Cart state persisted to localStorage
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  // Wishlist state persisted to localStorage
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  // Currency configuration (INR - Indian Rupee default)
  const [currency, setCurrency] = useState(() => {
    try {
      return localStorage.getItem('scoopy_currency') || 'INR'
    } catch {
      return 'INR'
    }
  })

  const currentCurrency = CURRENCIES[currency] || CURRENCIES.INR
  const currencySymbol = currentCurrency.symbol

  const changeCurrency = (newCode) => {
    if (CURRENCIES[newCode]) {
      setCurrency(newCode)
      try {
        localStorage.setItem('scoopy_currency', newCode)
      } catch {
        // ignore
      }
    }
  }

  const formatPrice = (amountInINR) => {
    const rate = currentCurrency.rate || 1
    const converted = amountInINR * rate
    if (currency === 'INR') {
      return `${currencySymbol}${Math.round(converted)}`
    }
    return `${currencySymbol}${converted.toFixed(2)}`
  }

  // UI state
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [isReviewsOpen, setIsReviewsOpen] = useState(false)
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false)
  const [activeFlavor, setActiveFlavor] = useState(null)
  const [quickViewProduct, setQuickViewProduct] = useState(null)
  const [toasts, setToasts] = useState([])

  // Promo code & discounts
  const [appliedCoupon, setAppliedCoupon] = useState(null)
  const [couponError, setCouponError] = useState('')
  const [tipRate, setTipRate] = useState(0.10) // 10% default tip

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
    } catch (e) {
      console.error('Failed to save cart to localStorage', e)
    }
  }, [cart])

  // Save wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist))
    } catch (e) {
      console.error('Failed to save wishlist to localStorage', e)
    }
  }, [wishlist])

  // Toast Notification System
  const addToast = (message, type = 'success') => {
    const id = Date.now() + Math.random().toString(36).substring(2, 6)
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3200)
  }

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  // Cart operations
  const addToCart = (product, sizeVariant = null, quantity = 1, customNotes = '') => {
    const variantLabel = sizeVariant?.label || 'Single Scoop'
    const variantPrice = sizeVariant ? sizeVariant.price : product.price
    const itemKey = `${product.id}-${variantLabel}-${customNotes}`

    setCart((prev) => {
      const existing = prev.find((item) => item.key === itemKey)
      if (existing) {
        return prev.map((item) =>
          item.key === itemKey ? { ...item, quantity: item.quantity + quantity } : item
        )
      }
      return [
        ...prev,
        {
          key: itemKey,
          id: product.id,
          name: product.name,
          image: product.image,
          accent: product.accent || '#7C55D6',
          price: variantPrice,
          variant: variantLabel,
          customNotes,
          quantity,
        },
      ]
    })

    addToast(`Added ${quantity}x "${product.name}" (${variantLabel}) to bag!`, 'success')
  }

  const updateQuantity = (key, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.key === key) {
            const newQty = item.quantity + delta
            return newQty > 0 ? { ...item, quantity: newQty } : null
          }
          return item
        })
        .filter(Boolean)
    )
  }

  const removeFromCart = (key) => {
    const item = cart.find((i) => i.key === key)
    setCart((prev) => prev.filter((i) => i.key !== key))
    if (item) {
      addToast(`Removed "${item.name}" from bag`, 'info')
    }
  }

  const clearCart = () => {
    setCart([])
  }

  // Wishlist toggle
  const toggleWishlist = (productId) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId)
      if (exists) {
        addToast('Removed from favorites', 'info')
        return prev.filter((id) => id !== productId)
      } else {
        addToast('Saved to your favorites! ❤️', 'success')
        return [...prev, productId]
      }
    })
  }

  // Promo code validation in INR
  const applyCoupon = (code) => {
    setCouponError('')
    const clean = code.trim().toUpperCase()
    if (clean === 'SCOOPY20') {
      setAppliedCoupon({ code: clean, type: 'percent', value: 0.20, label: '20% OFF' })
      addToast('🎉 Coupon SCOOPY20 applied! 20% discount added.', 'success')
      return true
    } else if (clean === 'SWEET50' || clean === 'SWEET5') {
      setAppliedCoupon({ code: clean, type: 'flat', value: 50, label: '₹50 OFF' })
      addToast('🎉 Coupon applied! ₹50 discount added.', 'success')
      return true
    } else if (clean === 'FREESHIP') {
      setAppliedCoupon({ code: clean, type: 'shipping', value: 1.0, label: 'FREE SHIPPING' })
      addToast('🚚 Coupon FREESHIP applied! Free cold shipping unlocked.', 'success')
      return true
    } else {
      setCouponError('Invalid promo code. Try SCOOPY20 or SWEET50')
      addToast('Invalid promo code. Try SCOOPY20 or SWEET50', 'error')
      return false
    }
  }

  const removeCoupon = () => {
    setAppliedCoupon(null)
    setCouponError('')
    addToast('Promo code removed', 'info')
  }

  // Calculated totals in INR
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const discountAmount = appliedCoupon
    ? appliedCoupon.type === 'percent'
      ? cartSubtotal * appliedCoupon.value
      : appliedCoupon.type === 'flat'
      ? Math.min(cartSubtotal, appliedCoupon.value)
      : 0
    : 0

  const subtotalAfterDiscount = Math.max(0, cartSubtotal - discountAmount)
  const FREE_SHIPPING_THRESHOLD = 499 // Free cold delivery above ₹499
  const isFreeShipping =
    subtotalAfterDiscount >= FREE_SHIPPING_THRESHOLD ||
    appliedCoupon?.type === 'shipping' ||
    cartCount === 0

  const shippingCost = isFreeShipping ? 0 : 49 // ₹49 standard shipping
  const tipAmount = subtotalAfterDiscount * tipRate
  const taxAmount = subtotalAfterDiscount * 0.05 // 5% GST for ice cream
  const orderTotal = cartCount > 0 ? subtotalAfterDiscount + shippingCost + tipAmount + taxAmount : 0

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
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
        wishlist,
        toggleWishlist,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isReviewsOpen,
        setIsReviewsOpen,
        isCustomizerOpen,
        setIsCustomizerOpen,
        activeFlavor,
        setActiveFlavor,
        quickViewProduct,
        setQuickViewProduct,
        toasts,
        addToast,
        removeToast,
        currency,
        currencySymbol,
        currentCurrency,
        changeCurrency,
        currencies: CURRENCIES,
        formatPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export { useCart } from './useCart'
export { CartContext }
export default CartProvider
