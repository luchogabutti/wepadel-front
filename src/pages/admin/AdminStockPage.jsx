import { useState } from 'react';
import { AdminStockSection } from '../../components/admin/stock/AdminStockSection/AdminStockSection';
import { ConfirmationDialog } from '../../components/general/ConfirmationDialog/ConfirmationDialog';
import { PageSnackbar } from '../../components/general/PageSnackbar/PageSnackbar';
import { adminProducts, adminSectionContent } from '../../data/adminProductsData';

export const AdminStockPage = () => {
  const [products, setProducts] = useState(adminProducts);
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

  const handleConfirmSaveStock = () => {
    if (pendingStockSave) {
      setProducts(pendingStockSave);
    }
    setPendingStockSave(null);
    showSnackbar('Stock guardado con éxito');
  };

  return (
    <>
      <AdminStockSection
        title={adminSectionContent.stock.title}
        subtitle={adminSectionContent.stock.subtitle}
        products={products}
        onRequestSaveStock={handleRequestSaveStock}
      />

      <ConfirmationDialog
        open={pendingStockSave}
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
