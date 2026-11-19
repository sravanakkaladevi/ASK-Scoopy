import { useState } from 'react'
import './App.css'
import useLenis from './lib/useLenis'
import { CartProvider } from './context/CartContext'
import Preloader from './components/Preloader'
import IceCreamHero from './components/IceCreamHero'
import CartDrawer from './components/CartDrawer'
import CheckoutModal from './components/CheckoutModal'
import CustomSundaeModal from './components/CustomSundaeModal'
import DynamicReviewsDrawer from './components/DynamicReviewsDrawer'
import ToastContainer from './components/ToastContainer'

function App() {
  useLenis()
  const [loading, setLoading] = useState(true)

  return (
    <CartProvider>
      {loading && <Preloader onDone={() => setLoading(false)} />}
      <IceCreamHero />
      <CartDrawer />
      <CheckoutModal />
      <CustomSundaeModal />
      <DynamicReviewsDrawer />
      <ToastContainer />
    </CartProvider>
  )
}

export default App
