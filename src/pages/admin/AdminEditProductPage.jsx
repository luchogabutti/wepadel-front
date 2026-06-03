import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { AdminEditProductSection } from '../../components/admin/AdminEditProductSection/AdminEditProductSection';
import { adminProducts } from '../../data/adminProductsData';

export const AdminEditProductPage = () => {
  const navigate = useNavigate();
  const { productId } = useParams();

  const product = adminProducts.find((item) => String(item.id) === String(productId));

  if (!product) {
    return <Navigate to="/admin/catalogo" replace />;
  }

  const handleCancel = () => {
    navigate('/admin/catalogo');
  };

  const handleSave = () => {
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
