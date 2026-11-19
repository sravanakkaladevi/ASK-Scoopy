import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { flavors } from '../data/flavors'
import { products } from '../data/products'
import { useCart } from '../context/CartContext'
import SocialIcons from './SocialIcons'
import UiverseCurrencyOption from './UiverseCurrencyOption'
import './IceCreamHero.css'

const PORTION_OPTIONS = [
  { id: 'single', label: 'Single Scoop', multiplier: 1 },
  { id: 'double', label: 'Double Scoop', multiplier: 1.55 },
  { id: 'pint', label: 'Artisan Pint', multiplier: 2.7 },
]

const BG_TRANSITION = { duration: 0.7, ease: 'easeInOut' }
const WHEEL_COOLDOWN = 800
const WHEEL_THRESHOLD = 12

const NAME_VARIANTS = {
  initial: { y: 50, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
  exit: { y: -50, opacity: 0, transition: { duration: 0.4, ease: 'easeIn' } },
}

const TEXT_VARIANTS = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 0.5, delay: 0.1, ease: 'easeOut' } },
  exit: { y: -20, opacity: 0, transition: { duration: 0.3, ease: 'easeIn' } },
}

const FLY_VARIANTS = {
  initial: { y: 80, scale: 0.88, opacity: 0 },
  animate: { y: 0, scale: 1, opacity: 1, transition: { duration: 0.85, ease: 'easeOut' } },
  exit: { y: -70, scale: 0.9, opacity: 0, transition: { duration: 0.45, ease: 'easeIn' } },
}

const PARTICLE_VARIANTS = {
  initial: { y: -30, opacity: 0, scale: 0.85 },
  animate: { y: 0, opacity: 1, scale: 1, transition: { duration: 0.7, delay: 0.15, ease: 'easeOut' } },
  exit: { y: 24, opacity: 0, scale: 0.85, transition: { duration: 0.35, ease: 'easeIn' } },
}

const STACK_VARIANTS = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.3, ease: 'easeIn' } },
}

const IceCreamHero = () => {
  const [index, setIndex] = useState(0)
  const len = flavors.length
  const current = flavors[index]
  const currentProduct = products.find((p) => p.id === current.id) || products[0]

  const {
    addToCart,
    cartCount,
    setIsCartOpen,
    setIsReviewsOpen,
    setIsCustomizerOpen,
    setActiveFlavor,
    formatPrice,
  } = useCart()

  const [selectedPortion, setSelectedPortion] = useState('single')

  const [line1, line2] = current.name.split('\n')
  const cooling = useRef(false)

  const next = () => setIndex((i) => (i + 1) % len)
  const prev = () => setIndex((i) => (i - 1 + len) % len)

  // Sync active flavor for reviews
  useEffect(() => {
    setActiveFlavor(current)
  }, [current, setActiveFlavor])

  // Smooth wheel listener
  useEffect(() => {
    const onWheel = (e) => {
      if (cooling.current || Math.abs(e.deltaY) < WHEEL_THRESHOLD) return
      cooling.current = true
      if (e.deltaY > 0) next()
      else prev()
      setTimeout(() => {
        cooling.current = false
      }, WHEEL_COOLDOWN)
    }
    window.addEventListener('wheel', onWheel, { passive: true })
    return () => window.removeEventListener('wheel', onWheel)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Keyboard navigation
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next()
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prev()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const upcoming = [
    flavors[(index + 1) % len],
    flavors[(index + 2) % len],
    flavors[(index + 3) % len],
  ]

  const activePortion = PORTION_OPTIONS.find((p) => p.id === selectedPortion) || PORTION_OPTIONS[0]
  const portionPrice = Math.round(currentProduct.price * activePortion.multiplier)

  const handleOrder = () => {
    addToCart(currentProduct, { label: activePortion.label, price: portionPrice }, 1)
  }

  return (
    <motion.section
      className="icecream-hero"
      animate={{ background: current.gradient }}
      transition={BG_TRANSITION}
    >
      {/* Top Header */}
      <div className="icecream-top">
        <div className="icecream-logo">Scoopy</div>

        {/* Sleek Frosted Glass E-Commerce Controls */}
        <div className="icecream-top-nav">
          <UiverseCurrencyOption />

          <button
            className="top-nav-pill"
            onClick={() => setIsCustomizerOpen(true)}
            title="Design a customized sundae with toppings"
          >
            <span>🍦 Ask Ice Cream / Custom</span>
          </button>

          <button
            className="top-nav-pill"
            onClick={() => setIsReviewsOpen(true)}
            title="Read customer reviews and dynamic comments"
          >
            <span>💬 Reviews ★ 4.9</span>
          </button>

          <button
            className="top-nav-pill top-nav-pill--cart"
            onClick={() => setIsCartOpen(true)}
            title="View shopping bag"
          >
            <span className="cart-svg-icon">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
            </span>
            <span>Bag</span>
            {cartCount > 0 && <span className="top-cart-badge">{cartCount}</span>}
          </button>
        </div>
      </div>

      {/* Upcoming stacked ice cream previews on right */}
      <div className="icecream-stack-stage" aria-hidden="true">
        <AnimatePresence mode="popLayout">
          <motion.img
            key={upcoming[2].id}
            src={upcoming[2].image}
            alt=""
            className="icecream-stack icecream-stack--tiny"
            variants={STACK_VARIANTS}
            initial="initial"
            animate="animate"
            exit="exit"
          />
        </AnimatePresence>
        <AnimatePresence mode="popLayout">
          <motion.img
            key={upcoming[1].id}
            src={upcoming[1].image}
            alt=""
            className="icecream-stack icecream-stack--far"
            variants={STACK_VARIANTS}
            initial="initial"
            animate="animate"
            exit="exit"
          />
        </AnimatePresence>
        <AnimatePresence mode="popLayout">
          <motion.img
            key={upcoming[0].id}
            src={upcoming[0].image}
            alt=""
            className="icecream-stack icecream-stack--near"
            variants={STACK_VARIANTS}
            initial="initial"
            animate="animate"
            exit="exit"
          />
        </AnimatePresence>
      </div>

      {/* Center 3D Floating Ice Cream Visual Stage */}
      <div className="icecream-visual-stage">
        <AnimatePresence mode="popLayout">
          <motion.img
            key={current.id}
            src={current.particle}
            alt=""
            aria-hidden="true"
            className="icecream-particles"
            variants={PARTICLE_VARIANTS}
            initial="initial"
            animate="animate"
            exit="exit"
          />
        </AnimatePresence>
        <AnimatePresence mode="popLayout">
          <motion.img
            key={current.id}
            src={current.image}
            alt={current.name.replace('\n', ' ')}
            className="icecream-fly"
            variants={FLY_VARIANTS}
            initial="initial"
            animate="animate"
            exit="exit"
          />
        </AnimatePresence>
      </div>

      {/* Left Content Area */}
      <div className="icecream-content">
        {/* Rating Pill */}
        <button
          className="hero-rating-badge"
          onClick={() => setIsReviewsOpen(true)}
          title="Click to view customer comments"
        >
          <span className="star-icon">★</span>
          <span className="rating-val">4.9</span>
          <span className="rating-dot">•</span>
          <span className="rating-caption">Community Reviews</span>
        </button>

        <h1 className="icecream-title" aria-live="polite">
          <AnimatePresence mode="popLayout">
            <motion.span
              key={current.id}
              className="icecream-title-inner"
              variants={NAME_VARIANTS}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <span>{line1}</span>
              <span>{line2}</span>
            </motion.span>
          </AnimatePresence>
        </h1>

        <div className="icecream-desc">
          <AnimatePresence mode="popLayout">
            <motion.p
              key={current.id}
              variants={TEXT_VARIANTS}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {current.description}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Uiverse Portion Options Selector */}
        <div className="uiverse-portion-wrapper">
          <span className="uiverse-portion-heading">Select Portion:</span>
          <div className="uiverse-portion-group">
            {PORTION_OPTIONS.map((opt) => {
              const isSel = selectedPortion === opt.id
              const optPrice = Math.round(currentProduct.price * opt.multiplier)
              return (
                <label key={opt.id} className={`uiverse-portion-option ${isSel ? 'is-selected' : ''}`}>
                  <input
                    type="radio"
                    name="hero-portion-radio"
                    value={opt.id}
                    checked={isSel}
                    onChange={() => setSelectedPortion(opt.id)}
                    className="uiverse-portion-input"
                  />
                  <span className="uiverse-portion-card">
                    <span className="portion-name">{opt.label}</span>
                    <span className="portion-cost">{formatPrice(optPrice)}</span>
                  </span>
                </label>
              )
            })}
          </div>
        </div>

        <div className="icecream-order-row">
          <button
            className="icecream-order-btn"
            onClick={handleOrder}
          >
            <span>Order {activePortion.label} • {formatPrice(portionPrice)}</span>
          </button>

          <button
            className="icecream-ask-btn"
            onClick={() => setIsCustomizerOpen(true)}
            title="Ask ice cream with toppings, waffle cone, warm drizzle"
          >
            <span>Custom Creation ✦</span>
          </button>
        </div>
      </div>

      {/* Floating Arrows */}
      <button className="slider-arrow slider-arrow--prev" onClick={prev} aria-label="Previous flavor">
        ‹
      </button>
      <button className="slider-arrow slider-arrow--next" onClick={next} aria-label="Next flavor">
        ›
      </button>

      {/* Dots */}
      <div className="icecream-dots">
        {flavors.map((flavor, i) => (
          <button
            key={flavor.id}
            className={`icecream-dot${i === index ? ' is-active' : ''}`}
            aria-label={`Show ${flavor.name.replace('\n', ' ')}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>

      <SocialIcons className="icecream-socials social-icons--plain" />
    </motion.section>
  )
}

export default IceCreamHero
