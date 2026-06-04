import { useState } from 'react';
import { AdminDiscountsSection } from '../../components/admin/discount/AdminDiscountsSection/AdminDiscountsSection';
import { PageSnackbar } from '../../components/general/PageSnackbar/PageSnackbar';
import { adminProducts, adminSectionContent, initialDiscounts } from '../../data/adminProductsData';
export const AdminDiscountsPage = () => {
  const [discounts, setDiscounts] = useState(initialDiscounts);
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

  const handleAddDiscount = (newDiscount) => {
    setDiscounts((prev) => [newDiscount, ...prev]);
    showSnackbar('¡Descuento aplicado con éxito!');
  };

  const handleDeleteDiscount = (discountId) => {
    setDiscounts((prev) => prev.filter((d) => d.id !== discountId));
    showSnackbar('¡Descuento eliminado con éxito!');
  };

  const handleToggleStatus = (discountId) => {
    const discount = discounts.find((item) => item.id === discountId);
    const nextStatus = discount?.status === 'Activado' ? 'Desactivado' : 'Activado';

    setDiscounts((prev) =>
      prev.map((item) => (item.id === discountId ? { ...item, status: nextStatus } : item))
    );

    showSnackbar(nextStatus === 'Activado' ? 'Descuento activado.' : 'Descuento desactivado.');
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
        onToggleStatus={handleToggleStatus}
      />

      <PageSnackbar snackbar={snackbar} onClose={handleCloseSnackbar} />
    </>
  );
};
