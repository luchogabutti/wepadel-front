import { Box, Button, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined'
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined'
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
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
  searchTerm,
  onSearchChange,
  children,
}) => {
  return (
    <Box className="admin-layout">
      <aside className="admin-sidebar">
        <Box className="admin-logo-row">
          <Typography className="admin-logo">WePadel</Typography>
          <span className="admin-badge">ADMIN</span>
        </Box>

        <Box className="admin-user-box">
          <Box className="admin-avatar">
            <span>AU</span>
          </Box>

          <Typography className="admin-user-name">Admin User</Typography>

          <Typography className="admin-user-email">
            admin@padelpro.com
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
        >
          Cerrar sesión
        </Button>
      </aside>

      <section className="admin-panel">
        <header className="admin-topbar">
          <div className="admin-search">
            <SearchIcon />
            <input
              type="text"
              placeholder="Buscar producto..."
              value={searchTerm}
              onChange={(event) => onSearchChange(event.target.value)}
            />
          </div>

          <button className="admin-user-icon" type="button">
            <AccountCircleOutlinedIcon />
          </button>
        </header>

        <main className="admin-main">
          <div className="admin-main-inner">{children}</div>
        </main>
      </section>
    </Box>
  )
}