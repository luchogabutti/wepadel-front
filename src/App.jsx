import { Routes, Route, Navigate } from 'react-router-dom'
import { MainLayout } from './layouts/MainLayout'
import { ProfileAreaLayout } from './layouts/ProfileAreaLayout'
import { AdminAreaLayout } from './layouts/AdminAreaLayout'
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
import { AdminCatalogPage } from './pages/admin/AdminCatalogPage'
import { AdminStockPage } from './pages/admin/AdminStockPage'
import { AdminDiscountsPage } from './pages/admin/AdminDiscountsPage'
import { AdminProfilePage } from './pages/admin/AdminProfilePage'
import { AdminOrdersPage } from './pages/admin/AdminOrdersPage'
import { AdminEditProductPage } from './pages/admin/AdminEditProductPage'

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

        <Route element={<ProfileAreaLayout />}>
          <Route path="perfil" element={<ProfilePage />} />
          <Route path="perfil/ordenes" element={<OrdersPage />} />
        </Route>

        <Route path="admin" element={<AdminAreaLayout />}>
          <Route index element={<Navigate to="catalogo" replace />} />
          <Route path="catalogo" element={<AdminCatalogPage />} />
          <Route path="catalogo/editar/:productId" element={<AdminEditProductPage />} />
          <Route path="stock" element={<AdminStockPage />} />
          <Route path="descuentos" element={<AdminDiscountsPage />} />
          <Route path="pedidos" element={<AdminOrdersPage />} />
          <Route path="perfil" element={<AdminProfilePage />} />
        </Route>

      </Route>
    </Routes>
  )
}

export default App
