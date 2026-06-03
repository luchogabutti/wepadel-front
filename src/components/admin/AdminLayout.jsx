import { useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined'
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined'
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import { useNavigate } from 'react-router-dom'
import { ConfirmationDialog } from '../general/ConfirmationDialog/ConfirmationDialog'
import './styles.scss'

const adminSections = [
  {
    id: 'profile',
    label: 'Perfil',
    icon: <PersonOutlineOutlinedIcon />,
  },
  {
    id: 'catalog',
    label: 'Catálogo',
    icon: <CategoryOutlinedIcon />,
  },
  {
    id: 'stock',
    label: 'Stock',
    icon: <Inventory2OutlinedIcon />,
  },
  {
    id: 'discounts',
    label: 'Descuentos',
    icon: <LocalOfferOutlinedIcon />,
  },
]

export const AdminLayout = ({
  activeSection,
  onSectionChange,
  children,
}) => {
  const navigate = useNavigate()
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false)

  return (
    <Box className="admin-layout">
      <aside className="admin-sidebar">
        <Box className="admin-user-box">
          <Box className="admin-avatar">
            <span>JP</span>
          </Box>

          <Typography className="admin-user-name">Juan Pérez</Typography>

          <Typography className="admin-user-email">
            juan.perez@padelpro.com
          </Typography>
        </Box>

        <nav className="admin-nav">
          {adminSections.map((section) => (
            <Button
              key={section.id}
              fullWidth
              startIcon={section.icon}
              className={`admin-nav-button ${
                activeSection === section.id ? 'active' : ''
              }`}
              onClick={() => onSectionChange(section.id)}
            >
              {section.label}
            </Button>
          ))}
        </nav>

        <Button
          className="admin-logout-button"
          startIcon={<LogoutOutlinedIcon />}
          onClick={() => setLogoutDialogOpen(true)}
        >
          Cerrar sesión
        </Button>
      </aside>

      <section className="admin-panel">
        <main className="admin-main">
          <Box className="admin-main-inner">{children}</Box>
        </main>
      </section>

      <ConfirmationDialog
        open={logoutDialogOpen}
        onClose={() => setLogoutDialogOpen(false)}
        onConfirm={() => navigate('/login')}
        title="¿Cerrar sesión?"
        subtitle="Vas a salir de tu cuenta en WePadel."
        confirmLabel="Cerrar sesión"
        confirmColor="primary"
      />
    </Box>
  )
}