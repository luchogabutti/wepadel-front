import { useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import { Divider, IconButton, ListItemText, Menu, MenuItem, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout as logoutAction } from '../../../../Redux/authSlice';
import { persistor } from '../../../../Redux/store';
import { ConfirmationDialog } from '../../ConfirmationDialog/ConfirmationDialog';

export const UserLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = user?.token;
  const isAdmin = user?.rol === 'ADMINISTRADOR';
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const iconSx = {
    color: 'primary.light',
    transition: 'opacity 0.2s ease-in-out',
    '&:hover': { opacity: 0.7 },
  };

  if (!isAuthenticated) {
    return (
      <IconButton onClick={() => navigate('/login')} aria-label="Iniciar sesión" sx={iconSx}>
        <PersonIcon />
      </IconButton>
    );
  }

  const handleClose = () => setAnchorEl(null);

  const handleNavigate = (path) => {
    handleClose();
    navigate(path);
  };

  const handleLogout = () => {
    handleClose();
    dispatch(logoutAction());
    persistor.purge();
    navigate('/login');
  };

  return (
    <>
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} aria-label="Cuenta" sx={iconSx}>
        <PersonIcon />
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {user?.nombreApellido && (
          <Typography variant="caption" sx={{ px: 2, py: 0.5, display: 'block', color: 'text.secondary' }}>
            {user.nombreApellido}
          </Typography>
        )}

        {isAdmin
          ? 
              <MenuItem key="admin-perfil" onClick={() => handleNavigate('/admin/perfil')}>
                <ListItemText>Mi perfil</ListItemText>
              </MenuItem>
          : [
              <MenuItem key="perfil" onClick={() => handleNavigate('/perfil')}>
                <ListItemText>Mi perfil</ListItemText>
              </MenuItem>,
              <MenuItem key="ordenes" onClick={() => handleNavigate('/perfil/ordenes')}>
                <ListItemText>Mis órdenes</ListItemText>
              </MenuItem>,
            ]}

        <Divider />

        <MenuItem onClick={() => setLogoutDialogOpen(true)}>
          <ListItemText>Cerrar sesión</ListItemText>
        </MenuItem>
      </Menu>
      <ConfirmationDialog
        open={logoutDialogOpen}
        onClose={() => setLogoutDialogOpen(false)}
        onConfirm={handleLogout}
        title="¿Cerrar sesión?"
        subtitle="Vas a salir de tu cuenta en WePadel."
        confirmLabel="Cerrar sesión"
        confirmColor="primary"
      />
    </>
  );
};
