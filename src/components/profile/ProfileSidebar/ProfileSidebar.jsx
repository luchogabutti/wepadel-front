import { useState } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Avatar, Link } from '@mui/material';
import { ConfirmationDialog } from '../../general/ConfirmationDialog/ConfirmationDialog';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import LogoutIcon from '@mui/icons-material/Logout';
import './styles.scss';

export const ProfileSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <Box component="aside" className="profile-sidebar">
      {/* Información del Usuario */}
      <Box className="user-profile-summary">
        <Avatar
          alt="Juan Pérez"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJ5DcwCqUxBTP6jUksUtzDByChxWAMaRxgRb-6tvApdoUZOH8XOsp8n1PJCJJPuUZRTVECl-HhiENhrtjDAUxMjNT0dWk_jaVY7MMogUO2uNh44dDlShzZ5dU9bOstE25Yz8qlUvkuXqkmoDYH1pVxNmA_ymOybJ1GYUt_8jBKp83ivlgniU51oQJQo_Fan0Vj0NMubQdWnb8GZXB1aYfNY4l_RMJAOIC1KKhop46PZ9Yx8HcNbooFzLIjYmwoY5-o6xwXmHJ8DcQh"
          className="user-avatar"
        />
        <Typography variant="h6" className="user-name">
          Juan Pérez
        </Typography>
        <Typography variant="body2" className="user-email">
          juan.perez@padelpro.com
        </Typography>
      </Box>

      {/* Menú de Navegación */}
      <Box component="nav" className="nav-menu">
        <Link
          component={RouterLink}
          to="/perfil"
          className={`nav-item ${currentPath === '/perfil' ? 'active' : ''}`}
          underline="none"
        >
          <PersonIcon className="nav-icon" />
          <Typography className="nav-text">Perfil</Typography>
        </Link>
        
        <Link
          component={RouterLink}
          to="/perfil/ordenes"
          className={`nav-item ${currentPath === '/perfil/ordenes' ? 'active' : ''}`}
          underline="none"
        >
          <ShoppingBagIcon className="nav-icon" />
          <Typography className="nav-text">Mis órdenes</Typography>
        </Link>

        <Link
          component="button"
          type="button"
          onClick={() => setLogoutDialogOpen(true)}
          className="nav-item logout-item"
          underline="none"
        >
          <LogoutIcon className="nav-icon" />
          <Typography className="nav-text">Cerrar sesión</Typography>
        </Link>
      </Box>

      <ConfirmationDialog
        open={logoutDialogOpen}
        onClose={() => setLogoutDialogOpen(false)}
        onConfirm={handleLogout}
        title="¿Cerrar sesión?"
        subtitle="Vas a salir de tu cuenta en WePadel."
        confirmLabel="Cerrar sesión"
        cancelLabel="Cancelar"
        confirmColor="primary"
      />
    </Box>
  );
};
