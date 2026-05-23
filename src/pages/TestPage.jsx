import { Link } from 'react-router-dom'
import './Page.css'

export function TestPage() {
  return (
    <div className="page">
      <h1 className="page__title">Página de prueba</h1>
      <p className="page__text">
        Ruta de prueba: <strong>/prueba</strong>
      </p>
      <Link to="/" className="page__link">
        Volver al inicio
      </Link>
    </div>
  )
}
