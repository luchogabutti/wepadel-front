import { AdminDiscountsSection } from '../../components/admin/AdminDiscountsSection/AdminDiscountsSection';
import { adminSectionContent, useAdmin } from '../../context/AdminContext';

export const AdminDiscountsPage = () => {
  const { products, discounts, handleAddDiscount, handleDeleteDiscount } = useAdmin();

  return (
    <AdminDiscountsSection
      title={adminSectionContent.discounts.title}
      subtitle={adminSectionContent.discounts.subtitle}
      products={products}
      discounts={discounts}
      onAddDiscount={handleAddDiscount}
      onDeleteDiscount={handleDeleteDiscount}
    />
  );
};
