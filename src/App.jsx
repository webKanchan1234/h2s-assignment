import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Dashboard from './pages/Dashboard'
import CartProvider from './components/cart/CartProvider'
import CartSidebar from './components/cart/CardSidebar'

function App() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <CartProvider>
        <Dashboard setOpen={()=>setOpen(true)}/>
        <CartSidebar open={open} onClose={() => setOpen(false)} />
      </CartProvider>

    </>
  )
}

export default App
