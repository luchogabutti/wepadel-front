import { useState } from 'react';
import { Alert, Grid } from '@mui/material';
import { PageSnackbar } from '../components/general/PageSnackbar/PageSnackbar';
import { PageHeader } from '../components/layout/PageHeader';
import { ProfileDataCard } from '../components/profile/ProfileDataCard/ProfileDataCard';
import { ProfileBenefitsGrid } from '../components/profile/ProfileBenefitsGrid/ProfileBenefitsGrid';
import { PointsBadge } from '../components/profile/orders/PointsBadge/PointsBadge';

export const ProfilePage = () => {
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
      <PageHeader
        variant="profile"
        title="Mi Perfil"
        subtitle="Administra tu cuenta y revisa tus beneficios exclusivos."
      />

      <Grid container spacing={3} className="profile-section">
        <Grid size={{ xs: 12, lg: 8 }}>
          <ProfileDataCard onSaved={() => showSnackbar('Datos guardados.')} />
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <PointsBadge pointsValue={500} />
        </Grid>
      </Grid>

      <ProfileBenefitsGrid />

      <Alert severity="info" sx={{ mt: 3 }}>
        El botón &quot;Panel Admin&quot; es solo para esta demo y en producción se quitará del
        perfil del cliente.
      </Alert>

      <PageSnackbar snackbar={snackbar} onClose={handleCloseSnackbar} />
    </>
  );
};
