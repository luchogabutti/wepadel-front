import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingState } from '../../components/general/LoadingState/LoadingState';
import { ApiErrorState } from '../../components/general/ApiErrorState/ApiErrorState';
import { AdminCatalogToolbar } from '../../components/admin/catalog/AdminCatalogToolbar/AdminCatalogToolbar';
import { useAppSnackbar } from '../../hooks/useAppSnackbar';
import { AdminCatalogSection } from '../../components/admin/catalog/AdminCatalogSection/AdminCatalogSection';
import { AdminProductModal } from '../../components/admin/catalog/AdminProductModal/AdminProductModal';
import { ConfirmationDialog } from '../../components/general/ConfirmationDialog/ConfirmationDialog';
import {
  fetchAdminProducts,
  createProductWithDetails,
  deleteProducto,
  toggleProductEnabled,
} from '../../Redux/productsSlice';

export const AdminCatalogView = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const items = useSelector((state) => state.products.items);
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);
  const products = items;
  const { notifySuccess, notifyError } = useAppSnackbar();
  const [searchTerm, setSearchTerm] = useState('');
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [productToToggle, setProductToToggle] = useState(null);

  const nextProductEnabled = productToToggle ? !productToToggle.estaHabilitado : false;

  const handleToggleProductEnabled = async (productId) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;
    const nextEnabled = !product.estaHabilitado;
    try {
      const result = await dispatch(toggleProductEnabled({ product, nextEnabled }));
      if (toggleProductEnabled.rejected.match(result)) {
        notifyError(result.error?.message || 'No se pudo actualizar el producto.');
        return;
      }
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
      const result = await dispatch(createProductWithDetails(savedProduct));
      if (createProductWithDetails.rejected.match(result)) {
        notifyError(result.error?.message || 'No se pudo crear el producto.');
        return;
      }
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
      const result = await dispatch(deleteProducto(productToDelete.id));
      if (deleteProducto.rejected.match(result)) {
        notifyError(result.error?.message || 'No se pudo eliminar el producto.');
        return;
      }
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
        title="Catálogo"
        subtitle="Administra productos, precios y visibilidad en la tienda."
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onCreateProduct={() => setIsProductModalOpen(true)}
      />

      {loading ? (
        <LoadingState message="Cargando catálogo..." />
      ) : error ? (
        <ApiErrorState
          error={error}
          fallback="No se pudo cargar el catálogo."
          onRetry={() => dispatch(fetchAdminProducts())}
        />
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
