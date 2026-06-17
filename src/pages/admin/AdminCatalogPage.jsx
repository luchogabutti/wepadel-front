import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';
import { AdminCatalogToolbar } from '../../components/admin/catalog/AdminCatalogToolbar/AdminCatalogToolbar';
import { PageSnackbar } from '../../components/general/PageSnackbar/PageSnackbar';
import { AdminCatalogSection } from '../../components/admin/catalog/AdminCatalogSection/AdminCatalogSection';
import { AdminProductModal } from '../../components/admin/catalog/AdminProductModal/AdminProductModal';
import { ConfirmationDialog } from '../../components/general/ConfirmationDialog/ConfirmationDialog';
import { adminSectionContent } from '../../data/adminProductsData';
import { useAdminProducts } from '../../hooks/useAdminProducts';
import {
  createProducto,
  updateProducto,
  deleteProducto,
  buildProductoRequest,
} from '../../services/productsService';
import { updateStock } from '../../services/stocksService';

export const AdminCatalogPage = () => {
  const navigate = useNavigate();
  const { products, loading, refresh } = useAdminProducts();
  const [searchTerm, setSearchTerm] = useState('');
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

  const handleToggleProductEnabled = async (productId) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;
    const nextEnabled = !product.enabled;
    try {
      await updateProducto(productId, buildProductoRequest(product, { estaHabilitado: nextEnabled }));
      await refresh();
      showSnackbar(nextEnabled ? 'Producto habilitado.' : 'Producto deshabilitado.');
    } catch (error) {
      showSnackbar(error.message || 'No se pudo actualizar el producto.', 'error');
    }
  };

  const handleRequestEditProduct = (product) => {
    navigate(`/admin/catalogo/editar/${product.id}`);
  };

  const handleSaveProduct = async (savedProduct) => {
    try {
      const creado = await createProducto(buildProductoRequest(savedProduct));
      if (savedProduct.stock) {
        await updateStock(creado.id, Number(savedProduct.stock));
      }
      await refresh();
      setIsProductModalOpen(false);
      showSnackbar('¡Producto creado con éxito!');
    } catch (error) {
      showSnackbar(error.message || 'No se pudo crear el producto.', 'error');
    }
  };

  const handleCloseDeleteModal = () => {
    setProductToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete) return;
    try {
      await deleteProducto(productToDelete.id);
      await refresh();
      showSnackbar('¡Producto eliminado con éxito!');
    } catch (error) {
      showSnackbar(error.message || 'No se pudo eliminar el producto.', 'error');
    } finally {
      setProductToDelete(null);
    }
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

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <AdminCatalogSection
          searchTerm={searchTerm}
          products={products}
          onRequestEdit={handleRequestEditProduct}
          onRequestDelete={setProductToDelete}
          onToggleEnabled={handleToggleProductEnabled}
        />
      )}

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
