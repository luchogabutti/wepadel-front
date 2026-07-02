import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingState } from '../../components/general/LoadingState/LoadingState';
import { AdminEditProductSection } from '../../components/admin/catalog/AdminEditProductSection/AdminEditProductSection';
import { useAppSnackbar } from '../../hooks/useAppSnackbar';
import { updateProductWithDetails } from '../../Redux/productsSlice';

export const AdminEditProductView = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { productId } = useParams();
  const items = useSelector((state) => state.products.items);
  const loading = useSelector((state) => state.products.loading);
  const adminLoaded = useSelector((state) => state.products.adminLoaded);
  const { notifySuccess, notifyError } = useAppSnackbar();

  if (!adminLoaded || loading) {
    return <LoadingState message="Cargando producto..." />;
  }

  const product = items.find((item) => String(item.id) === String(productId));

  if (!product) {
    return <Navigate to="/admin/catalogo" replace />;
  }

  const handleCancel = () => {
    navigate('/admin/catalogo');
  };

  const handleSave = async (updatedProduct) => {
    try {
      const result = await dispatch(updateProductWithDetails(updatedProduct));

      if (updateProductWithDetails.rejected.match(result)) {
        notifyError(result.payload || 'No se pudo actualizar el producto.');
        return;
      }

      notifySuccess('¡Producto actualizado con éxito!');
      navigate('/admin/catalogo');
    } catch (error) {
      notifyError(error.message || 'No se pudo actualizar el producto.');
    }
  };

  return (
    <AdminEditProductSection product={product} onCancel={handleCancel} onSave={handleSave} />
  );
};
