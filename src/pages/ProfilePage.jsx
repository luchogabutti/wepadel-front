import { useState, useEffect, useMemo } from 'react';
import { Alert, Grid } from '@mui/material';
import { PageSnackbar } from '../components/general/PageSnackbar/PageSnackbar';
import { PageHeader } from '../components/layout/PageHeader';
import { ProfileDataCard } from '../components/profile/ProfileDataCard/ProfileDataCard';
import { ProfileBenefitsGrid } from '../components/profile/ProfileBenefitsGrid/ProfileBenefitsGrid';
import { PointsBadge } from '../components/profile/orders/PointsBadge/PointsBadge';
import { useAuth } from '../context/AuthContext';
import { getUsuarioById, updateUsuario } from '../services/usuariosService';
import { getPuntos } from '../services/puntosService';

const splitNombre = (nombreApellido = '') => {
  const parts = nombreApellido.trim().split(/\s+/);
  return {
    firstName: parts[0] ?? '',
    lastName: parts.slice(1).join(' '),
  };
};

export const ProfilePage = () => {
  const { user, updateUser } = useAuth();
  const usuarioId = user?.id;

  const [usuario, setUsuario] = useState(null);
  const [points, setPoints] = useState(0);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
    key: 0,
  });

  useEffect(() => {
    if (!usuarioId) return;
    getUsuarioById(usuarioId)
      .then(setUsuario)
      .catch((err) => console.error('Error al obtener el perfil:', err));
    getPuntos(usuarioId)
      .then((data) => setPoints(data?.cantidad ?? 0))
      .catch((err) => console.error('Error al obtener los puntos:', err));
  }, [usuarioId]);

  const datos = useMemo(() => {
    const fuente = usuario ?? user ?? {};
    const { firstName, lastName } = splitNombre(fuente.nombreApellido);
    return { firstName, lastName, email: fuente.mail ?? '' };
  }, [usuario, user]);

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

  const handleSave = async (form) => {
    const nombreApellido = `${form.firstName} ${form.lastName}`.trim();
    const actualizado = await updateUsuario(usuarioId, {
      nombreApellido,
      mail: form.email,
    });
    setUsuario(actualizado);
    updateUser({ nombreApellido, mail: form.email });
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
          <ProfileDataCard
            key={`${datos.firstName}-${datos.lastName}-${datos.email}`}
            firstName={datos.firstName}
            lastName={datos.lastName}
            email={datos.email}
            onSave={handleSave}
            onSaved={() => showSnackbar('Datos guardados.')}
          />
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <PointsBadge pointsValue={points} />
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
