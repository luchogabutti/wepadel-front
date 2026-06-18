import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { LoadingState } from '../../components/general/LoadingState/LoadingState';
import { AdminEditProductSection } from '../../components/admin/catalog/AdminEditProductSection/AdminEditProductSection';
import { useAppSnackbar } from '../../hooks/useAppSnackbar';
import { useAdminProducts } from '../../hooks/useAdminProducts';
import { updateProducto, buildProductoRequest } from '../../services/productsService';
import { updateStock } from '../../services/stocksService';

export const AdminEditProductPage = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const { products, loading, refresh } = useAdminProducts();
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
      await refresh();
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
