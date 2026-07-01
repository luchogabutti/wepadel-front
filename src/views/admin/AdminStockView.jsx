import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingState } from '../../components/general/LoadingState/LoadingState';
import { ApiErrorState } from '../../components/general/ApiErrorState/ApiErrorState';
import { AdminStockSection } from '../../components/admin/stock/AdminStockSection/AdminStockSection';
import { ConfirmationDialog } from '../../components/general/ConfirmationDialog/ConfirmationDialog';
import { useAppSnackbar } from '../../hooks/useAppSnackbar';
import { fetchAdminProducts, updateProductStock } from '../../Redux/productsSlice';

export const AdminStockView = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.products.items);
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);
  const products = items;
  const { notifySuccess, notifyError } = useAppSnackbar();
  const [pendingStockSave, setPendingStockSave] = useState(null);

  useEffect(() => {
    dispatch(fetchAdminProducts());
  }, [dispatch]);

  const handleRequestSaveStock = (updatedProducts) => {
    setPendingStockSave(updatedProducts);
  };

  const handleCloseSaveDialog = () => {
    setPendingStockSave(null);
  };

  const handleConfirmSaveStock = async () => {
    if (!pendingStockSave) return;
    const currentById = new Map(products.map((p) => [p.id, p.stock]));
    const changed = pendingStockSave
      .filter((p) => currentById.get(p.id) !== p.stock)
      .map((p) => ({ id: p.id, stock: p.stock }));
    try {
      const result = await dispatch(updateProductStock(changed));
      if (updateProductStock.rejected.match(result)) {
        notifyError(result.error?.message || 'No se pudo guardar el stock.');
        return;
      }
      notifySuccess('Stock guardado con éxito');
    } catch (error) {
      notifyError(error.message || 'No se pudo guardar el stock.');
    } finally {
      setPendingStockSave(null);
    }
  };

  return (
    <>
      {loading ? (
        <LoadingState message="Cargando stock..." />
      ) : error ? (
        <ApiErrorState
          error={error}
          fallback="No se pudo cargar el inventario."
          onRetry={() => dispatch(fetchAdminProducts())}
        />
      ) : (
        <AdminStockSection
          title="Control de Inventario"
          subtitle="Gestiona de forma masiva los niveles de disponibilidad de la tienda."
          products={products}
          onRequestSaveStock={handleRequestSaveStock}
        />
      )}

      <ConfirmationDialog
        open={Boolean(pendingStockSave)}
        onClose={handleCloseSaveDialog}
        onConfirm={handleConfirmSaveStock}
        title="¿Guardar cambios de stock?"
        subtitle="Se actualizarán las cantidades de stock de los productos modificados."
        confirmLabel="Guardar stock"
        cancelLabel="Cancelar"
        center
      />

    </>
  );
};
