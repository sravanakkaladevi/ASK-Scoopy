# Scoopy Creamery — Design System & Architecture Rules

This document specifies the design tokens, component architecture, styling conventions, and engineering standards for the Scoopy Ice Cream platform, designed for seamless Figma-to-code mapping via the Model Context Protocol (MCP).

---

## 1. Token Definitions

### Colors & Gradients
Design tokens are centralized in [src/index.css](file:///c:/Users/srava/Downloads/Ice-Cream-/src/index.css) and product metadata [src/data/products.js](file:///c:/Users/srava/Downloads/Ice-Cream-/src/data/products.js).

| Token Name | Value | Purpose |
| :--- | :--- | :--- |
| `--surface` | `#fffaf3` | Global warm vanilla background |
| `--text-dark` | `#1c1c1c` | High-contrast body typography |
| `blueberry-gradient` | `linear-gradient(160deg, #9B7DEA 0%, #8163DE 100%)` | Blueberry Lagoon theme |
| `mango-gradient` | `linear-gradient(160deg, #FF9D5C 0%, #EA6B22 100%)` | Mango Sunset theme |
| `strawberry-gradient` | `linear-gradient(160deg, #FF87B0 0%, #E0447A 100%)` | Strawberry Bliss theme |
| `pistachio-gradient` | `linear-gradient(160deg, #BEDD86 0%, #8CB050 100%)` | Pistachio Dream theme |
| `choco-gradient` | `linear-gradient(160deg, #C58058 0%, #8A4E30 100%)` | Choco Fudge theme |
| `vegan-mint-gradient` | `linear-gradient(160deg, #A8E6CF 0%, #3D9970 100%)` | Plant-based coconut cloud |

### Typography
- **Headings & Accents (`--font-display`):** `'Poppins', 'DM Sans', sans-serif` (Weights: `600`, `700`, `800`, `900`)
- **Brand Serif (`--font-serif`):** `'Playfair Display', 'Georgia', serif` (Weights: `500`, `700`, italic)
- **Body (`--font-body`):** `'Poppins', sans-serif` (Weights: `400`, `500`, `600`)

### Elevation & Shadows
- `--shadow-sm`: `0 6px 16px rgba(0, 0, 0, 0.14)`
- `--shadow-md`: `0 14px 30px rgba(0, 0, 0, 0.2)`
- `--shadow-lift`: `0 20px 45px rgba(0, 0, 0, 0.28)`

---

## 2. Component Library

Components reside in [src/components/](file:///c:/Users/srava/Downloads/Ice-Cream-/src/components/):

1. **`Navbar`**: Glassmorphic sticky navigation with live cart count, location badge, and mobile drawer.
2. **`IceCreamHero`**: Interactive 3D slide showcase with Framer Motion, serving size selector, and direct Add-to-Cart.
3. **`ShopCatalog`**: Product grid with dynamic category tabs, multi-dietary filtering, live text search, and size selection.
4. **`CustomSundaeBuilder`**: Interactive sundae design studio (scoop base, vessels, warm drizzles, gourmet toppings, dynamic price counter).
5. **`DynamicReviews`**: Dynamic UI reviews and customer comments featuring average rating calculation, 5-star interactive rating, taste tag selectors, localStorage persistence, Anime.js micro-interactions, and nested comment replies.
6. **`CartDrawer`**: Slide-out cart drawer with item steppers, free shipping meter ($35 goal), promo code engine (`SCOOPY20`, `SWEET5`), and gratuity selector.
7. **`CheckoutModal`**: Multi-step checkout with simulated cold-chain delivery address, delivery slot selection, payment options, and `canvas-confetti` celebration.
8. **`QuickViewModal`**: Modal highlighting nutrition facts (Calories, Fat, Carbs, Protein) and allergen warnings.
9. **`ToastContainer`**: Floating animated notification toasts for instant customer feedback.

---

## 3. Frameworks & Libraries

- **Runtime & View:** React 19 (`react`, `react-dom`)
- **Bundler & Tooling:** Vite 7 with `@vitejs/plugin-react`
- **Animation Suite:**
  - `framer-motion`: Page transitions, layout animations, flying particles.
  - `animejs`: Interactive micro-animations (star rating bursts, button bounce, helpful toggles).
  - `canvas-confetti`: Celebratory order confirmation particle bursts.
  - `gsap` + `lenis`: Smooth inertial viewport scrolling.

---

## 4. Asset Management

Assets are stored under [public/images/](file:///c:/Users/srava/Downloads/Ice-Cream-/public/images/):
- **`public/images/Transparent Images/`**: High-resolution transparent PNG cutouts of ice cream scoops, sundaes, and waffle cones.
- **`public/images/tiny particles/`**: Floating ingredient particles (bilberries, chocolate chunks, pistachio flakes, citrus slices).
- Referenced via absolute paths (`/images/Transparent Images/...`) ensuring flawless resolution across Vite development and production builds.

---

## 5. Icon System

- Inline SVG components with `currentColor` stroke/fill for crisp rendering and dynamic theme adaptation.
- Social icons packaged in [src/components/SocialIcons.jsx](file:///c:/Users/srava/Downloads/Ice-Cream-/src/components/SocialIcons.jsx) supporting dark and glass variants.

---

## 6. Styling Approach

- Pure CSS paired with CSS Custom Properties.
- Scoped component stylesheets matching component filenames (`IceCreamHero.css`, `DynamicReviews.css`, `CartDrawer.css`).
- Fully responsive across desktop (1280px+), tablet (768px-1024px), and mobile screens (<600px).

---

## 7. Project Structure

```
Ice-Cream-/
├── public/
│   └── images/
│       ├── tiny particles/
│       ├── Transparent Images/
│       └── UI Images/
├── ralph/
│   └── prd.json                 # Ralph autonomous agent spec
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── CartDrawer.jsx (.css)
│   │   ├── CheckoutModal.jsx (.css)
│   │   ├── CustomSundaeBuilder.jsx (.css)
│   │   ├── DynamicReviews.jsx (.css)
│   │   ├── FaqAccordion.jsx (.css)
│   │   ├── Footer.jsx (.css)
│   │   ├── IceCreamHero.jsx (.css)
│   │   ├── Navbar.jsx (.css)
│   │   ├── Preloader.jsx (.css)
│   │   ├── QuickViewModal.jsx (.css)
│   │   ├── ShopCatalog.jsx (.css)
│   │   ├── SocialIcons.jsx
│   │   ├── StoryAndFeatures.jsx (.css)
│   │   └── ToastContainer.jsx (.css)
│   ├── context/
│   │   └── CartContext.jsx      # Global e-commerce state & localStorage
│   ├── data/
│   │   ├── flavors.js           # Core hero slider definitions
│   │   ├── initialReviews.js    # Community reviews & replies
│   │   └── products.js          # Catalog products & pricing
│   ├── lib/
│   │   ├── useLenis.js
│   │   ├── useReveal.js
│   │   └── useTilt.js
│   ├── App.jsx (.css)
│   ├── index.css
│   └── main.jsx
├── DESIGN_SYSTEM_RULES.md
├── package.json
└── vite.config.js
```
