const IMG_PATH = '/images/Transparent Images'
const PARTICLE_PATH = '/images/tiny particles'

export const products = [
  {
    id: 'blueberry-lagoon',
    name: 'Blueberry Lagoon',
    tagline: 'Wild Bilberries & Velvety Cream',
    category: 'Signature Flavors',
    badge: 'Chef Choice',
    badgeColor: '#7C55D6',
    price: 180,
    rating: 4.9,
    reviewsCount: 342,
    gradient: 'linear-gradient(160deg, #9B7DEA 0%, #8163DE 100%)',
    accent: '#7C55D6',
    image: `${IMG_PATH}/ChatGPT Image Jul 13, 2026, 11_52_05 AM.png`,
    particle: `${PARTICLE_PATH}/Download Fresh ripe bilberry and green leaf flying isolated on transparent background for free-Photoroom.png`,
    description:
      "Dive into a swirl of wild mountain bilberry creaminess. A refreshing, fruity escape that melts gently in every bite. Hand-picked berries swirled into grass-fed jersey cream.",
    nutrition: {
      calories: '210 kcal',
      fat: '11g',
      carbs: '24g',
      protein: '4g',
      allergens: 'Contains Dairy. Gluten-Free.'
    },
    dietary: ['Gluten-Free', '100% Organic', 'No Artificial Dyes'],
    sizes: [
      { label: 'Single Scoop', price: 180 },
      { label: 'Double Scoop', price: 320 },
      { label: 'Artisan Pint (473ml)', price: 490 },
      { label: 'Family Tub (1 Liter)', price: 850 },
    ],
  },
  {
    id: 'mango-sunset',
    name: 'Mango Sunset',
    tagline: 'Golden Alphonso Swirl & Tropical Breeze',
    category: 'Signature Flavors',
    badge: 'Popular',
    badgeColor: '#E2551B',
    price: 180,
    rating: 4.8,
    reviewsCount: 289,
    gradient: 'linear-gradient(160deg, #FF9D5C 0%, #EA6B22 100%)',
    accent: '#E2551B',
    image: `${IMG_PATH}/ChatGPT Image Jul 13, 2026, 11_51_51 AM.png`,
    particle: `${PARTICLE_PATH}/Home-Photoroom.png`,
    description:
      'A burst of sun-ripened Ratnagiri Alphonso mango sunshine in every scoop. Sweet, tangy, and deeply tropical — like the last warm hour of a summer evening, captured in a waffle cone.',
    nutrition: {
      calories: '195 kcal',
      fat: '9g',
      carbs: '27g',
      protein: '3g',
      allergens: 'Contains Dairy. Gluten-Free.'
    },
    dietary: ['Gluten-Free', 'Real Alphonso Pulp', 'Vegetarian'],
    sizes: [
      { label: 'Single Scoop', price: 180 },
      { label: 'Double Scoop', price: 320 },
      { label: 'Artisan Pint (473ml)', price: 490 },
      { label: 'Family Tub (1 Liter)', price: 850 },
    ],
  },
  {
    id: 'strawberry-bliss',
    name: 'Strawberry Bliss',
    tagline: 'Mahabaleshwar Ripe Strawberries in Silky Cream',
    category: 'Signature Flavors',
    badge: 'Best Seller',
    badgeColor: '#D62E68',
    price: 180,
    rating: 5.0,
    reviewsCount: 512,
    gradient: 'linear-gradient(160deg, #FF87B0 0%, #E0447A 100%)',
    accent: '#D62E68',
    image: `${IMG_PATH}/ChatGPT Image Jul 13, 2026, 11_51_35 AM.png`,
    particle: `${PARTICLE_PATH}/Kvíz_ minden gyümölcsöt felismersz_-Photoroom.png`,
    description:
      'Fresh Mahabaleshwar strawberries macerated in pure cane sugar and folded into silky sweet cream. Bright, bold, and delightfully nostalgic — the timeless classic elevated to perfection.',
    nutrition: {
      calories: '200 kcal',
      fat: '10g',
      carbs: '25g',
      protein: '4g',
      allergens: 'Contains Dairy. Gluten-Free.'
    },
    dietary: ['Gluten-Free', 'Non-GMO', 'No Artificial Flavors'],
    sizes: [
      { label: 'Single Scoop', price: 180 },
      { label: 'Double Scoop', price: 320 },
      { label: 'Artisan Pint (473ml)', price: 490 },
      { label: 'Family Tub (1 Liter)', price: 850 },
    ],
  },
  {
    id: 'pistachio-dream',
    name: 'Pistachio Dream',
    tagline: 'Slow-Roasted Pistachios & Kashmiri Saffron Notes',
    category: 'Signature Flavors',
    badge: 'Artisan Favorite',
    badgeColor: '#79A036',
    price: 220,
    rating: 4.9,
    reviewsCount: 420,
    gradient: 'linear-gradient(160deg, #BEDD86 0%, #8CB050 100%)',
    accent: '#79A036',
    image: `${IMG_PATH}/ChatGPT Image Jul 13, 2026, 11_51_25 AM.png`,
    particle: `${PARTICLE_PATH}/Télécharger flottant pistaches isolé sur une transparent Contexte gratuitement-Photoroom.png`,
    description:
      'Slow-roasted premium pistachios stone-ground into a silky, nutty butter and churned to luscious perfection. Subtle notes of rock sea salt highlight its rich, savory-sweet profile.',
    nutrition: {
      calories: '240 kcal',
      fat: '14g',
      carbs: '22g',
      protein: '6g',
      allergens: 'Contains Dairy, Tree Nuts (Pistachios). Gluten-Free.'
    },
    dietary: ['Gluten-Free', 'Tree Nut Protein', 'Real Roasted Nuts'],
    sizes: [
      { label: 'Single Scoop', price: 220 },
      { label: 'Double Scoop', price: 380 },
      { label: 'Artisan Pint (473ml)', price: 560 },
      { label: 'Family Tub (1 Liter)', price: 920 },
    ],
  },
  {
    id: 'choco-fudge',
    name: 'Choco Fudge',
    tagline: 'Dark Belgian Cocoa & Molten Truffle Swirl',
    category: 'Signature Flavors',
    badge: 'Decadent',
    badgeColor: '#7A3B26',
    price: 220,
    rating: 4.9,
    reviewsCount: 638,
    gradient: 'linear-gradient(160deg, #C58058 0%, #8A4E30 100%)',
    accent: '#7A3B26',
    image: `${IMG_PATH}/ChatGPT Image Jul 13, 2026, 11_50_56 AM.png`,
    particle: `${PARTICLE_PATH}/Chocolate Chunks Isolated Flying Chocolate Pieces, Caramel, Chocolate, Bar PNG Transparent Image and Clipart for Free Download-Photoroom.png`,
    description:
      'Deep, velvety single-origin Belgian cocoa swirled with ribbons of warm molten fudge and crunchy dark chocolate flakes. Rich, deeply comforting, and unapologetically decadent.',
    nutrition: {
      calories: '260 kcal',
      fat: '15g',
      carbs: '29g',
      protein: '5g',
      allergens: 'Contains Dairy, Soy. Gluten-Free.'
    },
    dietary: ['Gluten-Free', 'Fair-Trade Cocoa', 'Antioxidant Rich'],
    sizes: [
      { label: 'Single Scoop', price: 220 },
      { label: 'Double Scoop', price: 380 },
      { label: 'Artisan Pint (473ml)', price: 560 },
      { label: 'Family Tub (1 Liter)', price: 920 },
    ],
  },
  {
    id: 'flight-bundle',
    name: 'The Quintet Tasting Flight',
    tagline: 'Sample All 5 Core Flavors in One Box',
    category: 'Bundles & Gifts',
    badge: 'Best Value',
    badgeColor: '#9B7DEA',
    price: 699,
    rating: 5.0,
    reviewsCount: 184,
    gradient: 'linear-gradient(135deg, #FF87B0 0%, #9B7DEA 50%, #FF9D5C 100%)',
    accent: '#9B7DEA',
    image: `${IMG_PATH}/ChatGPT Image Jul 13, 2026, 11_52_05 AM.png`,
    particle: `${PARTICLE_PATH}/Download Fresh ripe bilberry and green leaf flying isolated on transparent background for free-Photoroom.png`,
    description:
      'Cannot decide? Experience the full Scoopy palette with five individual 120ml tasting cups: Blueberry Lagoon, Mango Sunset, Strawberry Bliss, Pistachio Dream, and Choco Fudge. Includes 5 compostable golden spoons.',
    nutrition: {
      calories: '5x ~110 kcal',
      fat: '28g total',
      carbs: '60g total',
      protein: '12g total',
      allergens: 'Contains Dairy, Tree Nuts (Pistachio). Gluten-Free.'
    },
    dietary: ['Sampler Box', 'Gift-Ready Dry Ice Packaging', 'Gluten-Free'],
    sizes: [
      { label: 'Flight of 5 Mini Cups (120ml each)', price: 699 },
      { label: 'Party Flight of 10 Mini Cups', price: 1299 }
    ],
  },
  {
    id: 'party-tub-bundle',
    name: 'Summer Celebration Party Cooler',
    tagline: '3 Pints of Your Choice + Waffle Cones & Toppings Pack',
    category: 'Bundles & Gifts',
    badge: 'Party Hit',
    badgeColor: '#E2551B',
    price: 1299,
    rating: 4.9,
    reviewsCount: 97,
    gradient: 'linear-gradient(135deg, #FF9D5C 0%, #C58058 100%)',
    accent: '#E2551B',
    image: `${IMG_PATH}/ChatGPT Image Jul 13, 2026, 11_51_51 AM.png`,
    particle: `${PARTICLE_PATH}/Home-Photoroom.png`,
    description:
      'Everything you need for an unforgettable dessert gathering. Includes 3 artisan pints, 6 fresh waffle cones, artisanal fudge drizzle jar, and roasted nut sprinkle box in an insulated cooler bag.',
    nutrition: {
      calories: 'Serves 6-8 people',
      fat: 'Varies by flavor',
      carbs: 'Varies by flavor',
      protein: 'Varies by flavor',
      allergens: 'Contains Dairy, Wheat (cones), Tree Nuts.'
    },
    dietary: ['Complete Party Kit', 'Keeps Frozen for 4 Hours', 'Great for Gifts'],
    sizes: [
      { label: 'Standard Party Cooler (3 Pints + Extras)', price: 1299 },
      { label: 'Deluxe Party Cooler (5 Pints + All Toppings)', price: 1999 }
    ],
  },
  {
    id: 'vegan-coconut-cloud',
    name: 'Coconut Cloud (Plant-Based)',
    tagline: 'Silky Coconut Milk & Madagascar Bourbon Vanilla',
    category: 'Vegan & Dairy-Free',
    badge: '100% Plant-Based',
    badgeColor: '#00A86B',
    price: 220,
    rating: 4.8,
    reviewsCount: 165,
    gradient: 'linear-gradient(160deg, #A8E6CF 0%, #3D9970 100%)',
    accent: '#3D9970',
    image: `${IMG_PATH}/ChatGPT Image Jul 13, 2026, 11_51_25 AM.png`,
    particle: `${PARTICLE_PATH}/Télécharger flottant pistaches isolé sur une transparent Contexte gratuitement-Photoroom.png`,
    description:
      'Lovingly crafted with organic coconut cream, cold-pressed raw coconut oil, and speckled with fragrant real Madagascar bourbon vanilla beans. Indulgently creamy without a drop of dairy.',
    nutrition: {
      calories: '185 kcal',
      fat: '12g',
      carbs: '18g',
      protein: '2g',
      allergens: 'Coconut (Drupe). Dairy-Free. Gluten-Free. Soy-Free.'
    },
    dietary: ['100% Vegan', 'Dairy-Free', 'Gluten-Free', 'Soy-Free'],
    sizes: [
      { label: 'Single Scoop', price: 220 },
      { label: 'Double Scoop', price: 380 },
      { label: 'Artisan Pint (473ml)', price: 560 }
    ],
  }
]

export const categories = [
  'All',
  'Signature Flavors',
  'Bundles & Gifts',
  'Vegan & Dairy-Free'
]
