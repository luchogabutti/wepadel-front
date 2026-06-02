import { useState } from 'react'
import { Box, Typography, Button } from '@mui/material'
import { AdminLayout } from '../components/admin/AdminLayout'
import { AdminCatalogSection } from '../components/admin/AdminCatalogSection/AdminCatalogSection'

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

  const currentSection = sectionContent[activeSection]

  return (
    <AdminLayout
      activeSection={activeSection}
      onSectionChange={setActiveSection}
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
          <AdminCatalogSection />
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
  )
}