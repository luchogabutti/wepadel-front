import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingState } from '../../components/general/LoadingState/LoadingState';
import { ApiErrorState } from '../../components/general/ApiErrorState/ApiErrorState';
import { AdminDiscountsSection } from '../../components/admin/discount/AdminDiscountsSection/AdminDiscountsSection';
import { useAppSnackbar } from '../../hooks/useAppSnackbar';
import { fetchAdminProducts } from '../../Redux/productsSlice';
import { createDescuento, updateDescuento, deleteDescuento } from '../../Redux/discountsSlice';

export const AdminDiscountsView = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const productsLoading = useSelector((state) => state.products.loading);
  const productsError = useSelector((state) => state.products.error);
  const adminLoaded = useSelector((state) => state.products.adminLoaded);
  const mutating = useSelector((state) => state.discounts.mutating);
  const { notifySuccess, notifyError } = useAppSnackbar();

  const discounts = useMemo(
    () =>
      products.flatMap((product) =>
        (product.descuentos ?? []).map((descuento) => ({
          ...descuento,
          producto: {
            id: product.id,
            nombre: product.nombre,
            categoria: product.categoria,
            imagenPrincipal: product.imagenPrincipal,
          },
        }))
      ),
    [products]
  );

  const handleAddDiscount = async (descuento) => {
    const result = await dispatch(createDescuento(descuento));
    if (createDescuento.rejected.match(result)) {
      notifyError(result.error?.message || 'No se pudo aplicar el descuento.');
      return;
    }
    notifySuccess('¡Descuento aplicado con éxito!');
  };

  const handleDeleteDiscount = async (discountId) => {
    const result = await dispatch(deleteDescuento(discountId));
    if (deleteDescuento.rejected.match(result)) {
      notifyError(result.error?.message || 'No se pudo eliminar el descuento.');
      return;
    }
    notifySuccess('¡Descuento eliminado con éxito!');
  };

  const handleToggleStatus = async (discountId) => {
    const descuento = discounts.find((item) => item.id === discountId);
    if (!descuento) return;
    const nextActivo = !descuento.activo;
    const result = await dispatch(
      updateDescuento({ id: discountId, descuento, overrides: { activo: nextActivo } })
    );
    if (updateDescuento.rejected.match(result)) {
      notifyError(result.error?.message || 'No se pudo actualizar el descuento.');
      return;
    }
    notifySuccess(nextActivo ? 'Descuento activado.' : 'Descuento desactivado.');
  };

  const handleEditDiscount = async (descuento) => {
    const result = await dispatch(updateDescuento({ id: descuento.id, descuento }));
    if (updateDescuento.rejected.match(result)) {
      notifyError(result.error?.message || 'No se pudo actualizar el descuento.');
      return;
    }
    notifySuccess('Descuento actualizado con éxito.');
  };

  if (!adminLoaded || productsLoading) {
    return <LoadingState message="Cargando descuentos..." />;
  }

  if (productsError) {
    return (
      <ApiErrorState
        error={productsError}
        fallback="No se pudieron cargar los descuentos."
        onRetry={() => dispatch(fetchAdminProducts())}
      />
    );
  }

  if (mutating) {
    return <LoadingState message="Guardando descuento..." />;
  }

  return (
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
  );
};
