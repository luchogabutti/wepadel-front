import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminCatalogToolbar } from '../../components/admin/catalog/AdminCatalogToolbar/AdminCatalogToolbar';
import { PageSnackbar } from '../../components/general/PageSnackbar/PageSnackbar';
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
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
    key: 0,
  });

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar((prev) => ({
      open: true,
      message,
      severity,
      key: prev.key + 1,
    }));
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleToggleProductEnabled = (productId) => {
    const product = products.find((p) => p.id === productId);
    const nextEnabled = !product?.enabled;

    setProducts((current) =>
      current.map((p) => (p.id === productId ? { ...p, enabled: nextEnabled } : p))
    );

    showSnackbar(nextEnabled ? 'Producto habilitado.' : 'Producto deshabilitado.');
  };

  const handleRequestEditProduct = (product) => {
    navigate(`/admin/catalogo/editar/${product.id}`);
  };

  const handleSaveProduct = () => {
    setIsProductModalOpen(false);
    showSnackbar('¡Producto creado con éxito!');
  };

  const handleCloseDeleteModal = () => {
    setProductToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (productToDelete) {
      setProducts((current) => current.filter((p) => p.id !== productToDelete.id));
    }
    setProductToDelete(null);
    showSnackbar('¡Producto eliminado con éxito!');
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

      <PageSnackbar snackbar={snackbar} onClose={handleCloseSnackbar} />
    </>
  );
};
