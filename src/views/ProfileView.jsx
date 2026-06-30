import { useState, useEffect, useMemo } from 'react';
import { Grid } from '@mui/material';
import { LoadingState } from '../components/general/LoadingState/LoadingState';
import { PageHeader } from '../components/layout/PageHeader';
import { ProfileDataCard } from '../components/profile/ProfileDataCard/ProfileDataCard';
import { ProfileBenefitsGrid } from '../components/profile/ProfileBenefitsGrid/ProfileBenefitsGrid';
import { PointsBadge } from '../components/profile/orders/PointsBadge/PointsBadge';
import { useDispatch, useSelector } from 'react-redux';
import { logout as logoutAction, updateUser } from '../Redux/authSlice';
import { useAppSnackbar } from '../hooks/useAppSnackbar';
import { getUsuarioById, updateUsuario } from '../services/usuariosService';
import { getPuntos } from '../services/puntosService';
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
  const { notifySuccess } = useAppSnackbar();
  const usuarioId = user?.id;
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [points, setPoints] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!usuarioId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    Promise.all([
      getUsuarioById(usuarioId).then(setUsuario),
      getPuntos(usuarioId).then((data) => setPoints(data?.cantidad ?? 0)),
    ])
      .catch((err) => console.error('Error al cargar el perfil:', err))
      .finally(() => setLoading(false));
  }, [usuarioId]);

  const datos = useMemo(() => {
    const fuente = usuario ?? user ?? {};
    const { firstName, lastName } = splitNombre(fuente.nombreApellido);
    return { firstName, lastName, email: fuente.mail ?? '' };
  }, [usuario, user]);

  const handleSave = async (form) => {
    const nombreApellido = `${form.firstName} ${form.lastName}`.trim();
    const emailChanged =
      form.email.trim().toLowerCase() !== (datos.email ?? '').trim().toLowerCase();

    const actualizado = await updateUsuario(usuarioId, {
      nombreApellido,
      mail: form.email.trim(),
    });
    setUsuario(actualizado);
    dispatch(updateUser({ nombreApellido, mail: form.email.trim() }));

    if (emailChanged) {
      notifySuccess('Email actualizado. Iniciá sesión con tu nuevo email.');
      dispatch(logoutAction());
      navigate('/login');
      return;
    }

    notifySuccess('Datos guardados.');
  };

  if (loading) {
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
