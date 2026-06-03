import { useState } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { AdminDiscountsSection } from '../../components/admin/AdminDiscountsSection/AdminDiscountsSection';
import { adminProducts, adminSectionContent, initialDiscounts } from '../../data/adminProductsData';

export const AdminDiscountsPage = () => {
  const [discounts, setDiscounts] = useState(initialDiscounts);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const triggerAlert = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleAddDiscount = (newDiscount) => {
    setDiscounts((prev) => [newDiscount, ...prev]);
    triggerAlert('¡Descuento aplicado con éxito!');
  };

  const handleDeleteDiscount = (discountId) => {
    setDiscounts((prev) => prev.filter((d) => d.id !== discountId));
    triggerAlert('¡Descuento eliminado con éxito!');
  };

  return (
    <>
      <AdminDiscountsSection
        title={adminSectionContent.discounts.title}
        subtitle={adminSectionContent.discounts.subtitle}
        products={adminProducts}
        discounts={discounts}
        onAddDiscount={handleAddDiscount}
        onDeleteDiscount={handleDeleteDiscount}
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
