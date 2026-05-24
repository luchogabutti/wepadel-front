import { Link } from 'react-router-dom'
import './Page.css'

export function HomePage() {
  return (
    <div className="page">
      <h1 className="page__title">Inicio</h1>
      <p className="page__text">
        Ruta de prueba: <strong>/</strong>
      </p>
      <Link to="/prueba" className="page__link">
        Ir a /prueba
      </Link>
    </div>
  )
}
