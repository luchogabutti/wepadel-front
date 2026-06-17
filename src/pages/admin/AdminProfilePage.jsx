import { useState, useEffect, useMemo } from 'react';
import { AdminProfileSection } from '../../components/admin/profile/AdminProfileSection/AdminProfileSection';
import { PageSnackbar } from '../../components/general/PageSnackbar/PageSnackbar';
import { adminSectionContent } from '../../data/adminProductsData';
import { useAuth } from '../../context/AuthContext';
import { getUsuarioById, updateUsuario } from '../../services/usuariosService';

const splitNombre = (nombreApellido = '') => {
  const parts = nombreApellido.trim().split(/\s+/);
  return { firstName: parts[0] ?? '', lastName: parts.slice(1).join(' ') };
};

export const AdminProfilePage = () => {
  const { user, updateUser } = useAuth();
  const usuarioId = user?.id;

  const [usuario, setUsuario] = useState(null);
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
      <AdminProfileSection
        title={adminSectionContent.profile.title}
        subtitle={adminSectionContent.profile.subtitle}
        firstName={datos.firstName}
        lastName={datos.lastName}
        email={datos.email}
        onSave={handleSave}
        onProfileSaved={() => showSnackbar('Datos guardados.')}
      />

      <PageSnackbar snackbar={snackbar} onClose={handleCloseSnackbar} />
    </>
  );
};
