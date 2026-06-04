import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Snackbar, Alert } from '@mui/material';
import { AdminCatalogToolbar } from '../../components/admin/catalog/AdminCatalogToolbar/AdminCatalogToolbar';
import { AdminCatalogSection } from '../../components/admin/catalog/AdminCatalogSection/AdminCatalogSection';
import { AdminProductModal } from '../../components/admin/catalog/AdminProductModal/AdminProductModal';
import { ConfirmationDialog } from '../../components/general/ConfirmationDialog/ConfirmationDialog';
import { adminProducts, adminSectionContent } from '../../data/adminProductsData';

export const AdminCatalogPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState(adminProducts);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const triggerAlert = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleToggleProductEnabled = (productId) => {
    setProducts((current) =>
      current.map((p) => (p.id === productId ? { ...p, enabled: !p.enabled } : p))
    );
  };

  const handleRequestEditProduct = (product) => {
    navigate(`/admin/catalogo/editar/${product.id}`);
  };

  const handleSaveProduct = () => {
    setIsProductModalOpen(false);
    triggerAlert('¡Producto creado con éxito!');
  };

  const handleCloseDeleteModal = () => {
    setProductToDelete(null);
  };

  const handleConfirmDelete = () => {
    triggerAlert('¡Producto eliminado con éxito!');
  };

  return (
    <>
      <AdminCatalogToolbar
        title={adminSectionContent.catalog.title}
        subtitle={adminSectionContent.catalog.subtitle}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onCreateProduct={() => setIsProductModalOpen(true)}
      />
      <AdminCatalogSection
        searchTerm={searchTerm}
        products={products}
        onRequestEdit={handleRequestEditProduct}
        onRequestDelete={setProductToDelete}
        onToggleEnabled={handleToggleProductEnabled}
      />

      <AdminProductModal
        open={isProductModalOpen}
        productToEdit={null}
        onClose={() => setIsProductModalOpen(false)}
        onSave={handleSaveProduct}
      />

      <ConfirmationDialog
        open={Boolean(productToDelete)}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        title="¿Eliminar este producto?"
        subtitle="Esta acción es irreversible. Se eliminarán el stock y las estadísticas asociadas."
        confirmLabel="Eliminar"
        cancelLabel="Cancelar"
        confirmColor="error"
        center
      />

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
  );
};
