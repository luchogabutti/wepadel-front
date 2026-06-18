import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoadingState } from '../../components/general/LoadingState/LoadingState';
import { AdminCatalogToolbar } from '../../components/admin/catalog/AdminCatalogToolbar/AdminCatalogToolbar';
import { useAppSnackbar } from '../../hooks/useAppSnackbar';
import { AdminCatalogSection } from '../../components/admin/catalog/AdminCatalogSection/AdminCatalogSection';
import { AdminProductModal } from '../../components/admin/catalog/AdminProductModal/AdminProductModal';
import { ConfirmationDialog } from '../../components/general/ConfirmationDialog/ConfirmationDialog';
import { adminSectionContent } from '../../data/adminProductsData';
import { useAdminProducts } from '../../hooks/useAdminProducts';
import { useProducts } from '../../context/ProductsContext';
import {
  createProducto,
  updateProducto,
  deleteProducto,
  buildProductoRequest,
} from '../../services/productsService';
import { updateStock } from '../../services/stocksService';
import { saveProductImage } from '../../services/imagenesService';

export const AdminCatalogView = () => {
  const navigate = useNavigate();
  const { products, loading, refresh } = useAdminProducts();
  const { refresh: refreshCatalog } = useProducts();
  const { notifySuccess, notifyError } = useAppSnackbar();
  const [searchTerm, setSearchTerm] = useState('');
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [productToToggle, setProductToToggle] = useState(null);

  const nextProductEnabled = productToToggle ? !productToToggle.enabled : false;

  const handleToggleProductEnabled = async (productId) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;
    const nextEnabled = !product.enabled;
    try {
      await updateProducto(productId, buildProductoRequest(product, { estaHabilitado: nextEnabled }));
      await refresh();
      await refreshCatalog();
      notifySuccess(nextEnabled ? 'Producto habilitado.' : 'Producto deshabilitado.');
    } catch (error) {
      notifyError(error.message || 'No se pudo actualizar el producto.');
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
      if (savedProduct.imageFile) {
        await saveProductImage(savedProduct.imageFile, { productoId: creado.id });
      }
      await refresh();
      await refreshCatalog();
      setIsProductModalOpen(false);
      notifySuccess('¡Producto creado con éxito!');
    } catch (error) {
      notifyError(error.message || 'No se pudo crear el producto.');
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
      await refreshCatalog();
      notifySuccess('¡Producto eliminado con éxito!');
    } catch (error) {
      notifyError(error.message || 'No se pudo eliminar el producto.');
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
        <LoadingState message="Cargando catálogo..." />
      ) : (
        <AdminCatalogSection
          searchTerm={searchTerm}
          products={products}
          onRequestEdit={handleRequestEditProduct}
          onRequestDelete={setProductToDelete}
          onRequestToggleEnabled={setProductToToggle}
        />
      )}

      <AdminProductModal
        open={isProductModalOpen}
        productToEdit={null}
        onClose={() => setIsProductModalOpen(false)}
        onSave={handleSaveProduct}
      />

      <ConfirmationDialog
        open={Boolean(productToToggle)}
        onClose={() => setProductToToggle(null)}
        onConfirm={() => productToToggle && handleToggleProductEnabled(productToToggle.id)}
        title={nextProductEnabled ? '¿Habilitar este producto?' : '¿Deshabilitar este producto?'}
        subtitle={
          nextProductEnabled
            ? 'El producto volverá a mostrarse en el catálogo.'
            : 'El producto dejará de mostrarse en el catálogo.'
        }
        confirmLabel={nextProductEnabled ? 'Habilitar' : 'Deshabilitar'}
        cancelLabel="Cancelar"
        confirmColor={nextProductEnabled ? 'success' : 'warning'}
        center
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
    </>
  );
};
