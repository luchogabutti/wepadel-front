import { useNavigate } from 'react-router-dom';
import { AdminStockSection } from '../../components/admin/stock/AdminStockSection/AdminStockSection';
import { adminProducts, adminSectionContent } from '../../data/adminProductsData';

export const AdminStockPage = () => {
  const navigate = useNavigate();

  const onSaveStock = () => {
    navigate('/admin/catalogo');
  };

  return (
    <AdminStockSection
      title={adminSectionContent.stock.title}
      subtitle={adminSectionContent.stock.subtitle}
      products={adminProducts}
      onSaveStock={onSaveStock}
    />
  );
};
