import { Routes, Route, Navigate } from 'react-router-dom'
import { MainLayout } from './layouts/MainLayout'
import { ProfileAreaLayout } from './layouts/ProfileAreaLayout'
import { AdminAreaLayout } from './layouts/AdminAreaLayout'
import { HomeView } from './views/HomeView'
import { CartView } from './views/CartView'
import { CheckoutView } from './views/CheckoutView'
import { CheckoutSuccessView } from './views/CheckoutSuccessView'
import { PlaceholderView } from './views/PlaceholderView'
import { CatalogView } from './views/CatalogView'
import { ProductDetailView } from './views/ProductDetailView'
import { ForgotPasswordView } from './views/ForgotPasswordView'
import { AuthView } from './views/AuthView'
import { ProfileView } from './views/ProfileView'
import { OrdersView } from './views/OrdersView'
import { AdminCatalogView } from './views/admin/AdminCatalogView'
import { AdminStockView } from './views/admin/AdminStockView'
import { AdminDiscountsView } from './views/admin/AdminDiscountsView'
import { AdminProfileView } from './views/admin/AdminProfileView'
import { AdminOrdersView } from './views/admin/AdminOrdersView'
import { AdminEditProductView } from './views/admin/AdminEditProductView'
import { AboutUsView } from './views/AboutUsView'
import { PrivacyPolicyView } from './views/PrivacyPolicyView'
import { TermsOfServiceView } from './views/TermsOfServiceView'
import { ProtectedRoute } from './components/general/ProtectedRoute/ProtectedRoute'

const App = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomeView />} />
        <Route path="carrito" element={<CartView />} />
        <Route path="checkout" element={<CheckoutView />} />
        <Route path="checkout/confirmacion/:orderId" element={<CheckoutSuccessView />} />
        <Route path="catalogo" element={<CatalogView />} />
        <Route path="catalogo/:categoria" element={<CatalogView />} />
        <Route path="producto/:id" element={<ProductDetailView />} />
        <Route path="login" element={<AuthView />} />
        <Route path="registro" element={<AuthView />} />
        <Route path="recuperar-contrasena" element={<ForgotPasswordView />} />
        <Route path="mis-pedidos" element={<PlaceholderView title="Mis pedidos" />} />
        <Route path="sobre-nosotros" element={<AboutUsView />} />
        <Route path="politica-de-privacidad" element={<PrivacyPolicyView />} />
        <Route path="terminos-de-servicio" element={<TermsOfServiceView />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<ProfileAreaLayout />}>
            <Route path="perfil" element={<ProfileView />} />
            <Route path="perfil/ordenes" element={<OrdersView />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute requireAdmin />}>
          <Route path="admin" element={<AdminAreaLayout />}>
            <Route index element={<Navigate to="catalogo" replace />} />
            <Route path="catalogo" element={<AdminCatalogView />} />
            <Route path="catalogo/editar/:productId" element={<AdminEditProductView />} />
            <Route path="stock" element={<AdminStockView />} />
            <Route path="descuentos" element={<AdminDiscountsView />} />
            <Route path="pedidos" element={<AdminOrdersView />} />
            <Route path="perfil" element={<AdminProfileView />} />
          </Route>
        </Route>

      </Route>
    </Routes>
  )
}

export default App
