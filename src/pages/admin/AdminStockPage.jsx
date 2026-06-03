import { useNavigate } from 'react-router-dom';
import { AdminStockSection } from '../../components/admin/AdminStockSection/AdminStockSection';
import { adminSectionContent, useAdmin } from '../../context/AdminContext';

export const AdminStockPage = () => {
  const navigate = useNavigate();
  const { products, handleSaveStock } = useAdmin();

  const onSaveStock = (updatedProducts) => {
    handleSaveStock(updatedProducts);
    navigate('/admin/catalogo');
  };

  return (
    <AdminStockSection
      title={adminSectionContent.stock.title}
      subtitle={adminSectionContent.stock.subtitle}
      products={products}
      onSaveStock={onSaveStock}
    />
  );
};
