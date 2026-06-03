import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { AdminEditProductSection } from '../../components/admin/AdminEditProductSection/AdminEditProductSection';
import { useAdmin } from '../../context/AdminContext';

export const AdminEditProductPage = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const { products, handleSaveEditedProduct } = useAdmin();

  const product = products.find((item) => String(item.id) === String(productId));

  if (!product) {
    return <Navigate to="/admin/catalogo" replace />;
  }

  const handleCancel = () => {
    navigate('/admin/catalogo');
  };

  const handleSave = (updatedProduct) => {
    handleSaveEditedProduct(updatedProduct);
    navigate('/admin/catalogo');
  };

  return (
    <AdminEditProductSection
      product={product}
      onCancel={handleCancel}
      onSave={handleSave}
    />
  );
};
