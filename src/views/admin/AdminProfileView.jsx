import { useState, useEffect, useMemo } from 'react';
import { AdminProfileSection } from '../../components/admin/profile/AdminProfileSection/AdminProfileSection';
import { useDispatch, useSelector } from 'react-redux';
import { logout as logoutAction, updateUser } from '../../Redux/authSlice';
import { useAppSnackbar } from '../../hooks/useAppSnackbar';
import { getUsuarioById, updateUsuario } from '../../services/usuariosService';
import { useNavigate } from 'react-router-dom';

const splitNombre = (nombreApellido = '') => {
  const parts = nombreApellido.trim().split(/\s+/);
  return { firstName: parts[0] ?? '', lastName: parts.slice(1).join(' ') };
};

export const AdminProfileView = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { notifySuccess } = useAppSnackbar();
  const usuarioId = user?.id;
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    if (!usuarioId) return;
    getUsuarioById(usuarioId)
      .then(setUsuario)
      .catch((err) => console.error('Error al obtener el perfil:', err));
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
