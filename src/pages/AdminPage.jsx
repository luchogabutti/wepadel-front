import { useState } from 'react'
import { Box, Typography, Button } from '@mui/material'
import { AdminLayout } from '../components/admin/AdminLayout'
import { AdminCatalogSection } from '../components/admin/AdminCatalogSection/AdminCatalogSection'
import { AdminEditProductSection } from '../components/admin/AdminEditProductSection/AdminEditProductSection'
import { AdminProductModal } from '../components/admin/AdminProductModal/AdminProductModal'
import { AdminDeleteProductModal } from '../components/admin/AdminDeleteProductModal/AdminDeleteProductModal'
import { adminProducts } from '../data/adminProductsData'

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
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)
  const [products, setProducts] = useState(adminProducts)
  const [productToDelete, setProductToDelete] = useState(null)
  const [productToEdit, setProductToEdit] = useState(null)

  const currentSection = sectionContent[activeSection]

  const handleSectionChange = (sectionId) => {
    setProductToEdit(null)
    setActiveSection(sectionId)
  }

  const handleOpenCreateProduct = () => {
    setProductToEdit(null)
    setIsProductModalOpen(true)
  }

  const handleCloseProductModal = () => {
    setIsProductModalOpen(false)
  }

  const handleSaveProduct = (savedProduct) => {
    setProducts((currentProducts) => [savedProduct, ...currentProducts])
    setIsProductModalOpen(false)
  }

  const handleSaveEditedProduct = (updatedProduct) => {
    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    )

    setProductToEdit(null)
    setActiveSection('catalog')
  }

  const handleCancelEditProduct = () => {
    setProductToEdit(null)
    setActiveSection('catalog')
  }

  const handleToggleProductEnabled = (productId) => {
    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === productId
          ? { ...product, enabled: !product.enabled }
          : product
      )
    )
  }

  const handleRequestEditProduct = (product) => {
    setActiveSection('catalog')
    setProductToEdit(product)
  }

  const handleRequestDeleteProduct = (product) => {
    setProductToDelete(product)
  }

  const handleCloseDeleteModal = () => {
    setProductToDelete(null)
  }

  const handleConfirmDeleteProduct = () => {
    if (!productToDelete) {
      return
    }

    setProducts((currentProducts) =>
      currentProducts.filter((product) => product.id !== productToDelete.id)
    )

    setProductToDelete(null)
  }

  const renderActiveSection = () => {
    if (productToEdit) {
      return (
        <AdminEditProductSection
          product={productToEdit}
          onCancel={handleCancelEditProduct}
          onSave={handleSaveEditedProduct}
        />
      )
    }

    if (activeSection === 'catalog') {
      return (
        <>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 4,
              gap: 2,
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

            <Button
              variant="contained"
              onClick={handleOpenCreateProduct}
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
          </Box>

          <AdminCatalogSection
            searchTerm={searchTerm}
            products={products}
            onRequestEdit={handleRequestEditProduct}
            onRequestDelete={handleRequestDeleteProduct}
            onToggleEnabled={handleToggleProductEnabled}
          />
        </>
      )
    }

    return (
      <>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 4,
            gap: 2,
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
        </Box>

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
      </>
    )
  }

  return (
    <>
      <AdminLayout
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      >
        {renderActiveSection()}
      </AdminLayout>

      <AdminProductModal
        open={isProductModalOpen}
        productToEdit={null}
        onClose={handleCloseProductModal}
        onSave={handleSaveProduct}
      />

      <AdminDeleteProductModal
        open={Boolean(productToDelete)}
        product={productToDelete}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDeleteProduct}
      />
    </>
  )
}