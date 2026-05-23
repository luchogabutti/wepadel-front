import { Link } from 'react-router-dom'
import { colors } from '../styles/theme'

export function TestPage() {
  return (
    <div style={{ padding: 24, textAlign: 'left' }}>
      <h1
        style={{
          fontSize: '38px',
          fontWeight: 700,
          margin: '0 0 16px',
          color: colors.textPrimary,
        }}
      >
        Página de prueba
      </h1>
      <p
        style={{
          fontSize: '15px',
          fontWeight: 400,
          color: colors.textSecondary,
          margin: '0 0 16px',
        }}
      >
        Ruta de prueba: <strong>/prueba</strong>
      </p>
      <Link
        to="/"
        style={{
          fontSize: '12px',
          fontWeight: 500,
          color: colors.primary,
        }}
      >
        Volver al inicio
      </Link>
    </div>
  )
}
