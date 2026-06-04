import { useState } from 'react';
import { AdminProfileSection } from '../../components/admin/profile/AdminProfileSection/AdminProfileSection';
import { PageSnackbar } from '../../components/general/PageSnackbar/PageSnackbar';
import { adminSectionContent } from '../../data/adminProductsData';

export const AdminProfilePage = () => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
    key: 0,
  });

  const showSnackbar = (message) => {
    setSnackbar((prev) => ({
      open: true,
      message,
      severity: 'success',
      key: prev.key + 1,
    }));
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <>
      <AdminProfileSection
        title={adminSectionContent.profile.title}
        subtitle={adminSectionContent.profile.subtitle}
        onProfileSaved={() => showSnackbar('Datos guardados.')}
      />

      <PageSnackbar snackbar={snackbar} onClose={handleCloseSnackbar} />
    </>
  );
};
