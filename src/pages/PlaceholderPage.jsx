import './Page.css'

export function PlaceholderPage({ title = 'Página' }) {
  return (
    <div className="page">
      <h1 className="page__title page__title--muted">
        {title} (próximamente)
      </h1>
    </div>
  )
}
