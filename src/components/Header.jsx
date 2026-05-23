import { Link } from 'react-router-dom'
import { theme, colors, typography } from '../styles/theme'

const { borderRadius, spacing } = theme

function SearchIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke={colors.textSecondary}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20L16 16" />
    </svg>
  )
}

function CartIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M6 6h15l-1.5 9H7.5L6 6z" />
      <path d="M6 6L5 3H2" />
      <circle cx="9" cy="20" r="1.5" />
      <circle cx="18" cy="20" r="1.5" />
    </svg>
  )
}

function UserIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="10" r="3" />
      <path d="M7 18c1.5-2.5 3.5-3.5 5-3.5s3.5 1 5 3.5" />
    </svg>
  )
}

const iconButtonStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: spacing[10],
  height: spacing[10],
  padding: 0,
  border: 'none',
  borderRadius: borderRadius.md,
  background: 'transparent',
  color: colors.textPrimary,
  cursor: 'pointer',
}

export function Header() {
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
        width: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        gap: spacing[4],
        padding: `${spacing[3]}px ${spacing[4]}px`,
        backgroundColor: colors.background,
        boxShadow: theme.shadows.sm,
      }}
    >
      <Link
        to="/"
        style={{
          flexShrink: 0,
          fontFamily: typography.fontFamily,
          fontSize: '22px',
          fontWeight: 700,
          color: colors.textPrimary,
          textDecoration: 'none',
          letterSpacing: '-0.02em',
        }}
      >
        WePadel
      </Link>

      <form
        role="search"
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          maxWidth: '480px',
          margin: '0 auto',
        }}
        onSubmit={(e) => e.preventDefault()}
      >
        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: spacing[2],
            width: '100%',
            padding: `${spacing[2]}px ${spacing[4]}px`,
            backgroundColor: colors.secondary,
            borderRadius: borderRadius.full,
            cursor: 'text',
          }}
        >
          <SearchIcon />
          <input
            type="search"
            name="q"
            className="header-search-input"
            placeholder="Buscar"
            aria-label="Buscar"
            style={{
              flex: 1,
              minWidth: 0,
              border: 'none',
              outline: 'none',
              background: 'transparent',
              fontFamily: typography.fontFamily,
              fontSize: '15px',
              fontWeight: 400,
              color: colors.textPrimary,
            }}
          />
        </label>
      </form>

      <div
        style={{
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          gap: spacing[2],
        }}
      >
        <Link to="/carrito" aria-label="Carrito" style={iconButtonStyle}>
          <CartIcon />
        </Link>
        <Link to="/login" aria-label="Perfil" style={iconButtonStyle}>
          <UserIcon />
        </Link>
      </div>
    </header>
  )
}
