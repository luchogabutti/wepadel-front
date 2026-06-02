import { Box, Button, Typography } from '@mui/material'
import './styles.scss'

const adminSections = [
  { id: 'profile', label: 'Perfil' },
  { id: 'catalog', label: 'Catálogo' },
  { id: 'stock', label: 'Stock' },
  { id: 'discounts', label: 'Descuentos' },
]

export const AdminLayout = ({ activeSection, onSectionChange, children }) => {
  return (
    <Box className="admin-layout">
      <aside className="admin-sidebar">
        <Box className="admin-logo-row">
          <Typography className="admin-logo">WePadel</Typography>
          <span className="admin-badge">ADMIN</span>
        </Box>

        <Box className="admin-user-box">
          <Box className="admin-avatar" />
          <Typography className="admin-user-name">Admin User</Typography>
          <Typography className="admin-user-email">admin@padelpro.com</Typography>
        </Box>

        <nav className="admin-nav">
          {adminSections.map((section) => (
            <Button
              key={section.id}
              fullWidth
              className={`admin-nav-button ${activeSection === section.id ? 'active' : ''}`}
              onClick={() => onSectionChange(section.id)}
            >
              {section.label}
            </Button>
          ))}
        </nav>

        <Button className="admin-logout-button">
          Cerrar sesión
        </Button>
      </aside>

      <main className="admin-main">
        {children}
      </main>
    </Box>
  )
}