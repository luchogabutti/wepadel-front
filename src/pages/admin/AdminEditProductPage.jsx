import { useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';
import { AdminEditProductSection } from '../../components/admin/catalog/AdminEditProductSection/AdminEditProductSection';
import { PageSnackbar } from '../../components/general/PageSnackbar/PageSnackbar';
import { useAdminProducts } from '../../hooks/useAdminProducts';
import { updateProducto, buildProductoRequest } from '../../services/productsService';
import { updateStock } from '../../services/stocksService';

export const AdminEditProductPage = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const { products, loading, refresh } = useAdminProducts();
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

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
        <CircularProgress color="primary" />
      </Box>
    );
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
      showSnackbar('¡Producto actualizado con éxito!');
      window.setTimeout(() => navigate('/admin/catalogo'), 1000);
    } catch (error) {
      showSnackbar(error.message || 'No se pudo actualizar el producto.', 'error');
    }
  };

  return (
    <>
      <AdminEditProductSection product={product} onCancel={handleCancel} onSave={handleSave} />

      <PageSnackbar snackbar={snackbar} onClose={handleCloseSnackbar} />
    </>
  );
};
