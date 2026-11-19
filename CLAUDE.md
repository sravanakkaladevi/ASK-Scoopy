# Scoopy E-Commerce Development Guide

## Commands
- Dev Server: `npm run dev`
- Production Build: `npm run build`
- Preview Build: `npm run preview`
- Lint: `npm run lint`

## Architecture Highlights
- **State Management:** `CartContext` (`src/context/CartContext.jsx`) stores `cart`, `wishlist`, `toasts`, `appliedCoupon`, and dialog visibility in `localStorage`.
- **Hero Slider:** `IceCreamHero.jsx` handles 3D flavor sliding with Framer Motion, while allowing unhindered page scrolling into the catalog.
- **Custom Sundae:** `CustomSundaeBuilder.jsx` supports dynamic scoop mixing, vessels, drizzles, toppings, and live price tallying.
- **Dynamic Customer Reviews:** `DynamicReviews.jsx` supports live rating calculation, 5-star interactive input, taste tags, persistent comments in `localStorage`, Anime.js micro-animations, and nested comment replies.
- **Cart & Checkout:** `CartDrawer.jsx` and `CheckoutModal.jsx` support promo codes (`SCOOPY20`, `SWEET5`), cold-chain delivery slots, and `canvas-confetti` celebrations.
