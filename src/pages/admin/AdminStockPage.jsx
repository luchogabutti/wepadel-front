import { useState } from 'react';
import { CircularProgress, Box } from '@mui/material';
import { AdminStockSection } from '../../components/admin/stock/AdminStockSection/AdminStockSection';
import { ConfirmationDialog } from '../../components/general/ConfirmationDialog/ConfirmationDialog';
import { PageSnackbar } from '../../components/general/PageSnackbar/PageSnackbar';
import { adminSectionContent } from '../../data/adminProductsData';
import { useAdminProducts } from '../../hooks/useAdminProducts';
import { updateStock } from '../../services/stocksService';

export const AdminStockPage = () => {
  const { products, loading, refreshStocks } = useAdminProducts();
  const [pendingStockSave, setPendingStockSave] = useState(null);
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
      showSnackbar('Stock guardado con éxito');
    } catch (error) {
      showSnackbar(error.message || 'No se pudo guardar el stock.', 'error');
    } finally {
      setPendingStockSave(null);
    }
  };

  return (
    <>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
          <CircularProgress color="primary" />
        </Box>
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

      <PageSnackbar snackbar={snackbar} onClose={handleCloseSnackbar} />
    </>
  );
};
