import { useEffect, useMemo } from 'react';
import { Grid } from '@mui/material';
import { LoadingState } from '../components/general/LoadingState/LoadingState';
import { PageHeader } from '../components/layout/PageHeader';
import { ProfileDataCard } from '../components/profile/ProfileDataCard/ProfileDataCard';
import { ProfileBenefitsGrid } from '../components/profile/ProfileBenefitsGrid/ProfileBenefitsGrid';
import { PointsBadge } from '../components/profile/orders/PointsBadge/PointsBadge';
import { useDispatch, useSelector } from 'react-redux';
import { logout as logoutAction, updateUser } from '../Redux/authSlice';
import { persistor } from '../Redux/store';
import { fetchProfile, fetchPoints, updateProfile } from '../Redux/profileSlice';
import { useAppSnackbar } from '../hooks/useAppSnackbar';
import { useNavigate } from 'react-router-dom';

const splitNombre = (nombreApellido = '') => {
  const parts = nombreApellido.trim().split(/\s+/);
  return {
    firstName: parts[0] ?? '',
    lastName: parts.slice(1).join(' '),
  };
};

export const ProfileView = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { usuario, points, loading, pointsLoading, profileLoaded, pointsLoaded } = useSelector(
    (state) => state.profile
  );
  const { notifySuccess, notifyError } = useAppSnackbar();
  const usuarioId = user?.id;
  const navigate = useNavigate();

  useEffect(() => {
    if (!usuarioId) return;
    dispatch(fetchProfile(usuarioId));
    dispatch(fetchPoints(usuarioId));
  }, [dispatch, usuarioId]);

  const datos = useMemo(() => {
    const fuente = usuario ?? user ?? {};
    const { firstName, lastName } = splitNombre(fuente.nombreApellido);
    return { firstName, lastName, email: fuente.mail ?? '' };
  }, [usuario, user]);

  const handleSave = async (form) => {
    const nombreApellido = `${form.firstName} ${form.lastName}`.trim();
    const emailChanged =
      form.email.trim().toLowerCase() !== (datos.email ?? '').trim().toLowerCase();

    const result = await dispatch(
      updateProfile({
        id: usuarioId,
        nombreApellido,
        mail: form.email.trim(),
      })
    );

    if (updateProfile.rejected.match(result)) {
      notifyError(result.payload || 'No se pudieron guardar los datos.');
      return;
    }

    dispatch(updateUser({ nombreApellido, mail: form.email.trim() }));

    if (emailChanged) {
      notifySuccess('Email actualizado. Iniciá sesión con tu nuevo email.');
      dispatch(logoutAction());
      persistor.purge();
      navigate('/login');
      return;
    }

    notifySuccess('Datos guardados.');
  };

  const isInitialLoad =
    (!profileLoaded && loading) || (!pointsLoaded && pointsLoading);

  if (isInitialLoad) {
    return <LoadingState message="Cargando tu perfil..." />;
  }

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
          />
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <PointsBadge pointsValue={points} />
        </Grid>
      </Grid>

      <ProfileBenefitsGrid />
    </>
  );
};
