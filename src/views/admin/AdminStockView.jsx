import { useState } from 'react';
import { LoadingState } from '../../components/general/LoadingState/LoadingState';
import { AdminStockSection } from '../../components/admin/stock/AdminStockSection/AdminStockSection';
import { ConfirmationDialog } from '../../components/general/ConfirmationDialog/ConfirmationDialog';
import { useAppSnackbar } from '../../hooks/useAppSnackbar';
import { adminSectionContent } from '../../data/adminProductsData';
import { useAdminProducts } from '../../hooks/useAdminProducts';
import { updateStock } from '../../services/stocksService';

export const AdminStockView = () => {
  const { products, loading, refreshStocks } = useAdminProducts();
  const { notifySuccess, notifyError } = useAppSnackbar();
  const [pendingStockSave, setPendingStockSave] = useState(null);

  const handleRequestSaveStock = (updatedProducts) => {
    setPendingStockSave(updatedProducts);
  };

  const handleCloseSaveDialog = () => {
    setPendingStockSave(null);
  };

  const handleConfirmSaveStock = async () => {
    if (!pendingStockSave) return;
    const currentById = new Map(products.map((p) => [p.id, p.stock]));
    const changed = pendingStockSave.filter((p) => currentById.get(p.id) !== p.stock);
    try {
      await Promise.all(changed.map((p) => updateStock(p.id, Number(p.stock))));
      await refreshStocks();
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
      ) : (
        <AdminStockSection
          title={adminSectionContent.stock.title}
          subtitle={adminSectionContent.stock.subtitle}
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
