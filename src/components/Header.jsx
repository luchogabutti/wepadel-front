import { Link } from 'react-router-dom'
import './Header.css'

function SearchIcon() {
  return (
    <svg
      className="header__search-icon"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
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

export function Header() {
  return (
    <header className="header">
      <Link to="/" className="header__logo">
        WePadel
      </Link>

      <form
        className="header__search-form"
        role="search"
        onSubmit={(e) => e.preventDefault()}
      >
        <label className="header__search">
          <SearchIcon />
          <input
            type="search"
            name="q"
            className="header__search-input"
            placeholder="Buscar"
            aria-label="Buscar"
          />
        </label>
      </form>

      <div className="header__actions">
        <Link to="/carrito" className="header__icon-btn" aria-label="Carrito">
          <CartIcon />
        </Link>
        <Link to="/login" className="header__icon-btn" aria-label="Perfil">
          <UserIcon />
        </Link>
      </div>
    </header>
  )
}
