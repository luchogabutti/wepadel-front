import { useState } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { AdminStockSection } from '../../components/admin/stock/AdminStockSection/AdminStockSection';
import { ConfirmationDialog } from '../../components/general/ConfirmationDialog/ConfirmationDialog';
import { adminProducts, adminSectionContent } from '../../data/adminProductsData';

export const AdminStockPage = () => {
  const [products, setProducts] = useState(adminProducts);
  const [pendingStockSave, setPendingStockSave] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const triggerAlert = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
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
    triggerAlert('Stock guardado con éxito');
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

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          className="admin-snackbar-alert"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};
