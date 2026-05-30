import { Routes, Route } from 'react-router-dom'
import { MainLayout } from './layouts/MainLayout'
import { HomePage } from './pages/HomePage'
import { TestPage } from './pages/TestPage'
import { PlaceholderPage } from './pages/PlaceholderPage'

const App = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="prueba" element={<TestPage />} />
        <Route path="carrito" element={<PlaceholderPage title="Carrito" />} />
        <Route path="login" element={<PlaceholderPage title="Iniciar sesión" />} />
      </Route>
    </Routes>
  )
}

export default App
