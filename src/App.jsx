import { Routes, Route } from 'react-router-dom'
import { MainLayout } from './layouts/MainLayout'
import { HomePage } from './pages/HomePage'
import { CartPage } from './pages/CartPage'
import { CheckoutPage } from './pages/CheckoutPage'
import { CheckoutSuccessPage } from './pages/CheckoutSuccessPage'
import { PlaceholderPage } from './pages/PlaceholderPage'
import { CatalogPage } from './pages/CatalogPage'
import { ProductDetailPage } from './pages/ProductDetailPage'
import { AuthPage } from './pages/AuthPage'
import { ProfilePage } from './pages/ProfilePage'
import { OrdersPage } from './pages/OrdersPage'

const App = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="carrito" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="checkout/confirmacion/:orderId" element={<CheckoutSuccessPage />} />
        <Route path="catalogo" element={<CatalogPage />} />
        <Route path="catalogo/:categoria" element={<CatalogPage />} />
        <Route path="producto/:id" element={<ProductDetailPage />} />
        <Route path="login" element={<AuthPage />} />
        <Route path="registro" element={<AuthPage />} />
        <Route path="mis-pedidos" element={<PlaceholderPage title="Mis pedidos" />} />
        <Route path="perfil" element={<ProfilePage />} />
        <Route path="perfil/ordenes" element={<OrdersPage />} />
      </Route>
    </Routes>
  )
}

export default App
