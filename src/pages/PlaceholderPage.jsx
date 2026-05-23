import { colors } from '../styles/theme'

export function PlaceholderPage({ title = 'Página' }) {
  return (
    <div style={{ padding: 24, textAlign: 'left' }}>
      <h1
        style={{
          fontSize: '21px',
          fontWeight: 600,
          margin: 0,
          color: colors.textSecondary,
        }}
      >
        {title} (próximamente)
      </h1>
    </div>
  )
}
