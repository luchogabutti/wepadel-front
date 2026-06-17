import { useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import { Divider, IconButton, ListItemText, Menu, MenuItem, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../context/AuthContext';

export const UserLogin = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

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
    logout();
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
          ? [
              <MenuItem key="admin" onClick={() => handleNavigate('/admin')}>
                <ListItemText>Panel de administración</ListItemText>
              </MenuItem>,
              <MenuItem key="admin-perfil" onClick={() => handleNavigate('/admin/perfil')}>
                <ListItemText>Mi perfil</ListItemText>
              </MenuItem>,
            ]
          : [
              <MenuItem key="perfil" onClick={() => handleNavigate('/perfil')}>
                <ListItemText>Mi perfil</ListItemText>
              </MenuItem>,
              <MenuItem key="ordenes" onClick={() => handleNavigate('/perfil/ordenes')}>
                <ListItemText>Mis pedidos</ListItemText>
              </MenuItem>,
            ]}

        <Divider />

        <MenuItem onClick={handleLogout}>
          <ListItemText>Cerrar sesión</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};
