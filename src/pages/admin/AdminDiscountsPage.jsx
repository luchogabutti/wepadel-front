import { useState, useEffect, useMemo, useCallback } from 'react';
import { CircularProgress, Box } from '@mui/material';
import { AdminDiscountsSection } from '../../components/admin/discount/AdminDiscountsSection/AdminDiscountsSection';
import { PageSnackbar } from '../../components/general/PageSnackbar/PageSnackbar';
import { adminSectionContent } from '../../data/adminProductsData';
import { useAdminProducts } from '../../hooks/useAdminProducts';
import {
  getDescuentosByProducto,
  createDescuento,
  updateDescuento,
  deleteDescuento,
} from '../../services/descuentosService';
import { PLACEHOLDER_IMG } from '../../services/productMapper';

const toRequest = (discount, overrides = {}) => ({
  productoId: discount.productId,
  porcentaje: Number(discount.percentage),
  fechaInicio: `${discount.startDate}T00:00:00`,
  fechaFin: `${discount.endDate}T23:59:59`,
  activo: discount.status === 'Activado',
  ...overrides,
});

export const AdminDiscountsPage = () => {
  const { products, loading: productsLoading } = useAdminProducts();
  const [discounts, setDiscounts] = useState([]);
  const [loadingDiscounts, setLoadingDiscounts] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
    key: 0,
  });

  const imageById = useMemo(() => {
    const map = new Map();
    products.forEach((p) => map.set(p.id, p.img));
    return map;
  }, [products]);

  const mapDescuento = useCallback(
    (descuento) => {
      const productoId = descuento.producto?.id;
      return {
        id: descuento.id,
        productId: productoId,
        productTitle: descuento.producto?.nombre,
        productImg: imageById.get(productoId) || PLACEHOLDER_IMG,
        productCategory: descuento.producto?.categoria,
        percentage: Number(descuento.porcentaje),
        startDate: (descuento.fechaInicio || '').split('T')[0],
        endDate: (descuento.fechaFin || '').split('T')[0],
        status: descuento.activo ? 'Activado' : 'Desactivado',
      };
    },
    [imageById]
  );

  const loadDiscounts = useCallback(async () => {
    if (products.length === 0) {
      setDiscounts([]);
      setLoadingDiscounts(false);
      return;
    }
    setLoadingDiscounts(true);
    try {
      const lists = await Promise.all(
        products.map(async (product) => {
          try {
            return await getDescuentosByProducto(product.id);
          } catch {
            return [];
          }
        })
      );
      setDiscounts(lists.flat().map(mapDescuento));
    } catch (error) {
      console.error('Error al cargar descuentos:', error);
    } finally {
      setLoadingDiscounts(false);
    }
  }, [products, mapDescuento]);

  useEffect(() => {
    loadDiscounts();
  }, [loadDiscounts]);

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

  const handleAddDiscount = async (newDiscount) => {
    try {
      await createDescuento(toRequest(newDiscount));
      await loadDiscounts();
      showSnackbar('¡Descuento aplicado con éxito!');
    } catch (error) {
      showSnackbar(error.message || 'No se pudo aplicar el descuento.', 'error');
    }
  };

  const handleDeleteDiscount = async (discountId) => {
    try {
      await deleteDescuento(discountId);
      await loadDiscounts();
      showSnackbar('¡Descuento eliminado con éxito!');
    } catch (error) {
      showSnackbar(error.message || 'No se pudo eliminar el descuento.', 'error');
    }
  };

  const handleToggleStatus = async (discountId) => {
    const discount = discounts.find((item) => item.id === discountId);
    if (!discount) return;
    const nextActivo = discount.status !== 'Activado';
    try {
      await updateDescuento(discountId, toRequest(discount, { activo: nextActivo }));
      await loadDiscounts();
      showSnackbar(nextActivo ? 'Descuento activado.' : 'Descuento desactivado.');
    } catch (error) {
      showSnackbar(error.message || 'No se pudo actualizar el descuento.', 'error');
    }
  };

  const loading = productsLoading || loadingDiscounts;

  return (
    <>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <AdminDiscountsSection
          title={adminSectionContent.discounts.title}
          subtitle={adminSectionContent.discounts.subtitle}
          products={products}
          discounts={discounts}
          onAddDiscount={handleAddDiscount}
          onDeleteDiscount={handleDeleteDiscount}
          onToggleStatus={handleToggleStatus}
        />
      )}

      <PageSnackbar snackbar={snackbar} onClose={handleCloseSnackbar} />
    </>
  );
};
