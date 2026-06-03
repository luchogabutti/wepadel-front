import { useState } from 'react'
import { Box, Snackbar, Alert } from '@mui/material'
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined'
import { AdminLayout } from '../components/admin/AdminLayout'
import { AdminCatalogToolbar } from '../components/admin/AdminCatalogToolbar/AdminCatalogToolbar'
import { AdminCatalogSection } from '../components/admin/AdminCatalogSection/AdminCatalogSection'
import { AdminEditProductSection } from '../components/admin/AdminEditProductSection/AdminEditProductSection'
import { AdminProductModal } from '../components/admin/AdminProductModal/AdminProductModal'
import { AdminStockSection } from '../components/admin/AdminStockSection/AdminStockSection'
import { AdminDiscountsSection } from '../components/admin/AdminDiscountsSection/AdminDiscountsSection'
import { AdminProfileSection } from '../components/admin/AdminProfileSection/AdminProfileSection'
import { ConfirmationDialog } from '../components/general/ConfirmationDialog/ConfirmationDialog'
import { adminProducts } from '../data/adminProductsData'

const sectionContent = {
  catalog: {
    title: 'Catálogo',
    subtitle: 'Administra productos, precios y visibilidad en la tienda.',
  },
  stock: {
    title: 'Control de Inventario',
    subtitle: 'Gestiona de forma masiva los niveles de disponibilidad de la tienda.',
  },
  discounts: {
    title: 'Gestión de Descuentos',
    subtitle: 'Configura promociones temporales para tus productos de alto rendimiento.',
  },
  profile: {
    title: 'Perfil Administrador',
    subtitle: 'Datos de la cuenta con acceso al panel de administración.',
  },
}

const initialDiscounts = [
  {
    id: 1,
    productId: 1,
    productTitle: 'Pro Carbon Elite v2',
    productImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXKAgpP53VaYUIYhiPLYu0myrXae465GDTDUpNqtkVLF_ipW1Baj_Lv7BGfRPbI_uEIUcD5aHT4_U5n3TPpcua5PA164OHuVI0ZMOQa932eOUkrjL4iLHplXZezbWFs9iU39dIMa0WMjQE_aSvjUZIgKlXAnDpTp6hYmI5JryLvMVs7D5b6mK3JRRqCBLFeDd4GAoIb3VW0Ev5jkDV_zm1-kZa7TQf7hKNmpSZGj6cjeUENXBj8i0E4biiXhPFMeKNX9-6SHsMzfVR',
    productCategory: 'PALETAS',
    percentage: 15,
    startDate: '2026-06-01',
    endDate: '2026-06-30',
    status: 'Confirmada',
  },
  {
    id: 2,
    productId: 2,
    productTitle: 'Gold Series ball (3-pack)',
    productImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwhFL8X7mj_JWYy12l9tfBKQzs5PLliUkicLnkHqNf5_3skuYd9TXlqI9spd7vjxhPthvOnxwDawnbGR3vL0iEb6_vbhdX9XiUZVfLm0llgi6Kjd8jElAbtannG6R9PJBsTGtkj8lgZEFYAhQ7HQTkOfXPybdKW_A5c1dNmQPFXLSn5-9UkLyGPussTcwj_cCcBvkIxexi-eJhe4s7Fw4MHZvIvHMxESdbF8fiVK4N0wSep5FdsJiIRs5ypytjO7Gq8c5WE48Wnz-ep',
    productCategory: 'PELOTAS',
    percentage: 20,
    startDate: '2026-05-15',
    endDate: '2026-06-15',
    status: 'Confirmada',
  },
]

export const AdminPage = () => {
  const [activeSection, setActiveSection] = useState('catalog')
  const [searchTerm, setSearchTerm] = useState('')
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)
  const [products, setProducts] = useState(adminProducts)
  const [discounts, setDiscounts] = useState(initialDiscounts)
  const [productToDelete, setProductToDelete] = useState(null)
  const [productToEdit, setProductToEdit] = useState(null)

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  })

  const triggerAlert = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity })
  }

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }))
  }

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
    triggerAlert('¡Producto creado con éxito!')
  }

  const handleSaveEditedProduct = (updatedProduct) => {
    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    )

    setProductToEdit(null)
    setActiveSection('catalog')
    triggerAlert('¡Producto modificado con éxito!')
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
    triggerAlert('Estado del producto actualizado.')
  }

  const handleRequestEditProduct = (product) => {
    setProductToEdit(product)
  }

  const handleRequestDeleteProduct = (product) => {
    setProductToDelete(product)
  }

  const handleCloseDeleteModal = () => {
    setProductToDelete(null)
  }

  const handleConfirmDeleteProduct = () => {
    if (!productToDelete) return

    setProducts((currentProducts) =>
      currentProducts.filter((product) => product.id !== productToDelete.id)
    )
    setProductToDelete(null)
    triggerAlert('¡Producto eliminado con éxito!')
  }

  const handleSaveStock = (updatedProducts) => {
    setProducts(updatedProducts)
    setActiveSection('catalog')
    triggerAlert('¡Stock actualizado con éxito!')
  }

  const handleAddDiscount = (newDiscount) => {
    setDiscounts((prev) => [newDiscount, ...prev])
    triggerAlert('¡Descuento aplicado con éxito!')
  }

  const handleDeleteDiscount = (discountId) => {
    setDiscounts((prev) => prev.filter((d) => d.id !== discountId))
    triggerAlert('¡Descuento eliminado con éxito!')
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

    switch (activeSection) {
      case 'catalog':
        return (
          <>
            <AdminCatalogToolbar
              title={sectionContent.catalog.title}
              subtitle={sectionContent.catalog.subtitle}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onCreateProduct={handleOpenCreateProduct}
            />
            <AdminCatalogSection
              searchTerm={searchTerm}
              products={products}
              onRequestEdit={handleRequestEditProduct}
              onRequestDelete={handleRequestDeleteProduct}
              onToggleEnabled={handleToggleProductEnabled}
            />
          </>
        )

      case 'stock':
        return (
          <AdminStockSection
            title={sectionContent.stock.title}
            subtitle={sectionContent.stock.subtitle}
            products={products}
            onSaveStock={handleSaveStock}
          />
        )

      case 'discounts':
        return (
          <AdminDiscountsSection
            title={sectionContent.discounts.title}
            subtitle={sectionContent.discounts.subtitle}
            products={products}
            discounts={discounts}
            onAddDiscount={handleAddDiscount}
            onDeleteDiscount={handleDeleteDiscount}
          />
        )

      case 'profile':
        return (
          <AdminProfileSection
            title={sectionContent.profile.title}
            subtitle={sectionContent.profile.subtitle}
          />
        )

      default:
        return null
    }
  }

  return (
    <>
      <AdminLayout activeSection={activeSection} onSectionChange={handleSectionChange}>
        {renderActiveSection()}
      </AdminLayout>

      <AdminProductModal
        open={isProductModalOpen}
        productToEdit={null}
        onClose={handleCloseProductModal}
        onSave={handleSaveProduct}
      />

      <ConfirmationDialog
        open={Boolean(productToDelete)}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDeleteProduct}
        title="¿Estás seguro de que deseas eliminar este producto?"
        subtitle="Esta acción es irreversible. Se eliminarán todos los registros de stock y las estadísticas asociadas a este modelo del catálogo activo."
        confirmLabel="Eliminar"
        cancelLabel="Cancelar"
        confirmColor="error"
        center
        bottomLineColor="var(--mui-palette-error-main)"
        icon={
          <Box className="confirmation-dialog-icon-container">
            <WarningAmberOutlinedIcon />
          </Box>
        }
      >
        {productToDelete && (
          <Box className="admin-delete-selected-product">
            <span>PRODUCTO SELECCIONADO</span>
            <strong>{productToDelete.title}</strong>
          </Box>
        )}
      </ConfirmationDialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          className="admin-snackbar-alert"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  )
}
