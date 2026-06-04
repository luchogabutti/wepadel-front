import { useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { AdminEditProductSection } from '../../components/admin/catalog/AdminEditProductSection/AdminEditProductSection';
import { PageSnackbar } from '../../components/general/PageSnackbar/PageSnackbar';
import { adminProducts } from '../../data/adminProductsData';

export const AdminEditProductPage = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
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

  const product = adminProducts.find((item) => String(item.id) === String(productId));

  if (!product) {
    return <Navigate to="/admin/catalogo" replace />;
  }

  const handleCancel = () => {
    navigate('/admin/catalogo');
  };

  const handleSave = () => {
    showSnackbar('¡Producto actualizado con éxito!');
    window.setTimeout(() => navigate('/admin/catalogo'), 1200);
  };

  return (
    <>
      <AdminEditProductSection product={product} onCancel={handleCancel} onSave={handleSave} />

      <PageSnackbar snackbar={snackbar} onClose={handleCloseSnackbar} />
    </>
  );
};
