import { useState, useEffect, useMemo, useCallback } from 'react';
import { LoadingState } from '../../components/general/LoadingState/LoadingState';
import { ApiErrorState } from '../../components/general/ApiErrorState/ApiErrorState';
import { AdminDiscountsSection } from '../../components/admin/discount/AdminDiscountsSection/AdminDiscountsSection';
import { useAppSnackbar } from '../../hooks/useAppSnackbar';
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

export const AdminDiscountsView = () => {
  const { products, loading: productsLoading, error: productsError, refresh } = useAdminProducts();
  const { notifySuccess, notifyError } = useAppSnackbar();
  const [discounts, setDiscounts] = useState([]);
  const [loadingDiscounts, setLoadingDiscounts] = useState(true);
  const [discountsError, setDiscountsError] = useState(null);

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
      setDiscountsError(null);
      return;
    }
    setLoadingDiscounts(true);
    setDiscountsError(null);
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
    } catch (err) {
      setDiscountsError(err);
      setDiscounts([]);
    } finally {
      setLoadingDiscounts(false);
    }
  }, [products, mapDescuento]);

  useEffect(() => {
    loadDiscounts();
  }, [loadDiscounts]);

  const handleAddDiscount = async (newDiscount) => {
    try {
      await createDescuento(toRequest(newDiscount));
      await loadDiscounts();
      notifySuccess('¡Descuento aplicado con éxito!');
    } catch (error) {
      notifyError(error.message || 'No se pudo aplicar el descuento.');
    }
  };

  const handleDeleteDiscount = async (discountId) => {
    try {
      await deleteDescuento(discountId);
      await loadDiscounts();
      notifySuccess('¡Descuento eliminado con éxito!');
    } catch (error) {
      notifyError(error.message || 'No se pudo eliminar el descuento.');
    }
  };

  const handleToggleStatus = async (discountId) => {
    const discount = discounts.find((item) => item.id === discountId);
    if (!discount) return;
    const nextActivo = discount.status !== 'Activado';
    try {
      await updateDescuento(discountId, toRequest(discount, { activo: nextActivo }));
      await loadDiscounts();
      notifySuccess(nextActivo ? 'Descuento activado.' : 'Descuento desactivado.');
    } catch (error) {
      notifyError(error.message || 'No se pudo actualizar el descuento.');
    }
  };

  const handleEditDiscount = async (updatedDiscount) => {
    try {
      await updateDescuento(updatedDiscount.id, toRequest(updatedDiscount));
      await loadDiscounts();
      notifySuccess('Descuento actualizado con éxito.');
    } catch (error) {
      notifyError(error.message || 'No se pudo actualizar el descuento.');
    }
  };

  const loading = productsLoading || loadingDiscounts;
  const error = productsError || discountsError;
  const handleRetry = () => {
    if (productsError) {
      refresh();
    } else {
      loadDiscounts();
    }
  };

  return (
    <>
      {loading ? (
        <LoadingState message="Cargando descuentos..." />
      ) : error ? (
        <ApiErrorState
          error={error}
          fallback="No se pudieron cargar los descuentos."
          onRetry={handleRetry}
        />
      ) : (
        <AdminDiscountsSection
          title="Gestión de Descuentos"
          subtitle="Configura promociones temporales para tus productos de alto rendimiento."
          products={products}
          discounts={discounts}
          onAddDiscount={handleAddDiscount}
          onEditDiscount={handleEditDiscount}
          onDeleteDiscount={handleDeleteDiscount}
          onToggleStatus={handleToggleStatus}
        />
      )}

    </>
  );
};
