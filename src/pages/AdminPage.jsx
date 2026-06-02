import { useState } from 'react'
import { Box, Typography, Button } from '@mui/material'
import { AdminLayout } from '../components/admin/AdminLayout'
import { AdminCatalogSection } from '../components/admin/AdminCatalogSection/AdminCatalogSection'
import { AdminProductModal } from '../components/admin/AdminProductModal/AdminProductModal'

const sectionContent = {
  profile: {
    eyebrow: 'ADMIN › PERFIL',
    title: 'Perfil',
    description: 'Información del usuario administrador.',
  },
  catalog: {
    eyebrow: 'ADMIN › CATALOGO',
    title: 'Catálogo',
    description: 'Gestión de productos publicados en la tienda.',
  },
  stock: {
    eyebrow: 'ADMIN › STOCK',
    title: 'Stock',
    description: 'Control de stock disponible por producto.',
  },
  discounts: {
    eyebrow: 'ADMIN › DESCUENTOS',
    title: 'Descuentos',
    description: 'Administración de promociones y cupones.',
  },
}

export const AdminPage = () => {
  const [activeSection, setActiveSection] = useState('catalog')
  const [searchTerm, setSearchTerm] = useState('')
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const currentSection = sectionContent[activeSection]

  return (
  <>
    <AdminLayout
      activeSection={activeSection}
      onSectionChange={setActiveSection}
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
    >
      <Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 4,
          }}
        >
          <Box>
            <Typography
              sx={{
                color: '#c6c8d6',
                fontSize: '13px',
                fontWeight: 700,
                letterSpacing: '1.5px',
                mb: 1,
              }}
            >
              {currentSection.eyebrow}
            </Typography>

            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '36px', md: '48px' },
                fontWeight: 900,
                color: '#f4f4fb',
              }}
            >
              {currentSection.title}
            </Typography>
          </Box>

          {activeSection === 'catalog' && (
            <Button
              variant="contained"
              onClick={() => setIsCreateModalOpen(true)}
              sx={{
                background: '#0d6efd',
                borderRadius: '7px',
                px: 3,
                py: 1.3,
                fontWeight: 700,
                textTransform: 'none',
              }}
            >
              + Nuevo producto
            </Button>
          )}
        </Box>

        {activeSection === 'catalog' ? (
          <AdminCatalogSection searchTerm={searchTerm} />
        ) : (
          <Box
            sx={{
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '10px',
              background: '#111720',
              p: 3,
            }}
          >
            <Typography sx={{ color: '#c6c8d6' }}>
              {currentSection.description}
            </Typography>

            <Typography sx={{ color: '#7f8496', mt: 1 }}>
              Esta sección todavía está mockeada.
            </Typography>
          </Box>
        )}
      </Box>
    </AdminLayout>

    <AdminProductModal
      open={isCreateModalOpen}
      onClose={() => setIsCreateModalOpen(false)}
    />
  </>
)
}