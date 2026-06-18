import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { LoadingState } from '../../components/general/LoadingState/LoadingState';
import { AdminEditProductSection } from '../../components/admin/catalog/AdminEditProductSection/AdminEditProductSection';
import { useAppSnackbar } from '../../hooks/useAppSnackbar';
import { useAdminProducts } from '../../hooks/useAdminProducts';
import { useProducts } from '../../context/ProductsContext';
import { updateProducto, buildProductoRequest } from '../../services/productsService';
import { updateStock } from '../../services/stocksService';
import { saveProductImage } from '../../services/imagenesService';

export const AdminEditProductView = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const { products, loading, refresh } = useAdminProducts();
  const { refresh: refreshCatalog } = useProducts();
  const { notifySuccess, notifyError } = useAppSnackbar();

  if (loading) {
    return <LoadingState message="Cargando producto..." />;
  }

  const product = products.find((item) => String(item.id) === String(productId));

  if (!product) {
    return <Navigate to="/admin/catalogo" replace />;
  }

  const handleCancel = () => {
    navigate('/admin/catalogo');
  };

  const handleSave = async (updatedProduct) => {
    try {
      await updateProducto(updatedProduct.id, buildProductoRequest(updatedProduct));
      await updateStock(updatedProduct.id, Number(updatedProduct.stock));
      if (updatedProduct.imageFile) {
        await saveProductImage(updatedProduct.imageFile, {
          productoId: updatedProduct.id,
          imagenId: updatedProduct.imagenId,
        });
      }
      await refresh();
      await refreshCatalog();
      notifySuccess('¡Producto actualizado con éxito!');
      window.setTimeout(() => navigate('/admin/catalogo'), 1000);
    } catch (error) {
      notifyError(error.message || 'No se pudo actualizar el producto.');
    }
  };

  return (
    <>
      <AdminEditProductSection product={product} onCancel={handleCancel} onSave={handleSave} />
    </>
  );
};
