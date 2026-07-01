import { useState, useEffect, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingState } from '../../components/general/LoadingState/LoadingState';
import { ApiErrorState } from '../../components/general/ApiErrorState/ApiErrorState';
import { AdminDiscountsSection } from '../../components/admin/discount/AdminDiscountsSection/AdminDiscountsSection';
import { useAppSnackbar } from '../../hooks/useAppSnackbar';
import { getProductImageUrl, PLACEHOLDER_IMG } from '../../utils/products';
import { fetchAdminProducts } from '../../Redux/productsSlice';
import {
  getDescuentosByProducto,
  createDescuento,
  updateDescuento,
  deleteDescuento,
} from '../../services/descuentosService';

const toRequest = (discount, overrides = {}) => ({
  productoId: discount.productId,
  porcentaje: Number(discount.percentage),
  fechaInicio: `${discount.startDate}T00:00:00`,
  fechaFin: `${discount.endDate}T23:59:59`,
  activo: discount.status === 'Activado',
  ...overrides,
});

export const AdminDiscountsView = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.products.items);
  const productsLoading = useSelector((state) => state.products.loading);
  const productsError = useSelector((state) => state.products.error);
  const products = items;
  const { notifySuccess, notifyError } = useAppSnackbar();
  const [discounts, setDiscounts] = useState([]);
  const [loadingDiscounts, setLoadingDiscounts] = useState(true);
  const [discountsError, setDiscountsError] = useState(null);

  const imageById = useMemo(() => {
    const map = new Map();
    products.forEach((p) => map.set(p.id, getProductImageUrl(p)));
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
    dispatch(fetchAdminProducts());
  }, [dispatch]);

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
      dispatch(fetchAdminProducts());
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
