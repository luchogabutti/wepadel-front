import { useEffect, useMemo } from 'react';
import { AdminProfileSection } from '../../components/admin/profile/AdminProfileSection/AdminProfileSection';
import { LoadingState } from '../../components/general/LoadingState/LoadingState';
import { useDispatch, useSelector } from 'react-redux';
import { logout as logoutAction, updateUser } from '../../Redux/authSlice';
import { fetchProfile, updateProfile } from '../../Redux/profileSlice';
import { useAppSnackbar } from '../../hooks/useAppSnackbar';
import { useNavigate } from 'react-router-dom';

const splitNombre = (nombreApellido = '') => {
  const parts = nombreApellido.trim().split(/\s+/);
  return { firstName: parts[0] ?? '', lastName: parts.slice(1).join(' ') };
};

export const AdminProfileView = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { usuario, loading } = useSelector((state) => state.profile);
  const { notifySuccess, notifyError } = useAppSnackbar();
  const usuarioId = user?.id;
  const navigate = useNavigate();

  useEffect(() => {
    if (!usuarioId) return;
    dispatch(fetchProfile(usuarioId));
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
      navigate('/login');
      return;
    }

    notifySuccess('Datos guardados.');
  };

  if (loading) {
    return <LoadingState message="Cargando perfil..." />;
  }

  return (
    <AdminProfileSection
      title="Perfil Administrador"
      subtitle="Datos de la cuenta con acceso al panel de administración."
      firstName={datos.firstName}
      lastName={datos.lastName}
      email={datos.email}
      onSave={handleSave}
    />
  );
};
