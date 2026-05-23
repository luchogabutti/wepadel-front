import { Outlet } from 'react-router-dom'
import { Header } from '../components/Header'
import { colors, typography } from '../styles/theme'

export function MainLayout() {
  return (
    <div
      style={{
        minHeight: '100svh',
        width: '100%',
        boxSizing: 'border-box',
        backgroundColor: colors.background,
        color: colors.textPrimary,
        fontFamily: typography.fontFamily,
      }}
    >
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  )
}
