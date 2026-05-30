import { Routes, Route } from 'react-router-dom'
import { MainLayout } from './layouts/MainLayout'
import { HomePage } from './pages/HomePage'
import { CartPage } from './pages/CartPage'
import { CheckoutPage } from './pages/CheckoutPage'
import { CheckoutSuccessPage } from './pages/CheckoutSuccessPage'
import { PlaceholderPage } from './pages/PlaceholderPage'

const App = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="carrito" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="checkout/confirmacion/:orderId" element={<CheckoutSuccessPage />} />
        <Route path="login" element={<PlaceholderPage title="Iniciar sesión" />} />
        <Route path="mis-pedidos" element={<PlaceholderPage title="Mis pedidos" />} />
      </Route>
    </Routes>
  )
}

export default App
