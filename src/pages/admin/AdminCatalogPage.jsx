import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminCatalogToolbar } from '../../components/admin/AdminCatalogToolbar/AdminCatalogToolbar';
import { AdminCatalogSection } from '../../components/admin/AdminCatalogSection/AdminCatalogSection';
import { adminSectionContent, useAdmin } from '../../context/AdminContext';

export const AdminCatalogPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const {
    products,
    handleOpenCreateProduct,
    handleToggleProductEnabled,
    handleRequestDeleteProduct,
  } = useAdmin();

  const handleRequestEditProduct = (product) => {
    navigate(`/admin/catalogo/editar/${product.id}`);
  };

  return (
    <>
      <AdminCatalogToolbar
        title={adminSectionContent.catalog.title}
        subtitle={adminSectionContent.catalog.subtitle}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onCreateProduct={handleOpenCreateProduct}
      />
      <AdminCatalogSection
        searchTerm={searchTerm}
        products={products}
        onRequestEdit={handleRequestEditProduct}
        onRequestDelete={handleRequestDeleteProduct}
        onToggleEnabled={handleToggleProductEnabled}
      />
    </>
  );
};
