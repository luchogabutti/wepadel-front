import { useState, useEffect, useMemo } from 'react';
import { AdminProfileSection } from '../../components/admin/profile/AdminProfileSection/AdminProfileSection';
import { adminSectionContent } from '../../data/adminProductsData';
import { useAuth } from '../../context/AuthContext';
import { useAppSnackbar } from '../../hooks/useAppSnackbar';
import { getUsuarioById, updateUsuario } from '../../services/usuariosService';
import { useNavigate } from 'react-router-dom';

const splitNombre = (nombreApellido = '') => {
  const parts = nombreApellido.trim().split(/\s+/);
  return { firstName: parts[0] ?? '', lastName: parts.slice(1).join(' ') };
};

export const AdminProfileView = () => {
  const { user, updateUser, logout } = useAuth();
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
    updateUser({ nombreApellido, mail: form.email.trim() });

    if (emailChanged) {
      notifySuccess('Email actualizado. Iniciá sesión con tu nuevo email.');
      logout();
      navigate('/login');
      return;
    }

    notifySuccess('Datos guardados.');
  };

  return (
    <AdminProfileSection
      title={adminSectionContent.profile.title}
      subtitle={adminSectionContent.profile.subtitle}
      firstName={datos.firstName}
      lastName={datos.lastName}
      email={datos.email}
      onSave={handleSave}
    />
  );
};
