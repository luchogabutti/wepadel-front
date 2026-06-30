import { useState } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { Avatar, Box, Link, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { ConfirmationDialog } from '../ConfirmationDialog/ConfirmationDialog';
import { useDispatch } from 'react-redux';
import { logout as logoutAction } from '../../../Redux/authSlice';
import './styles.scss';

const isItemActive = (pathname, item) => {
  if (item.end) {
    return pathname === item.to;
  }

  return pathname === item.to || pathname.startsWith(`${item.to}/`);
};

export const Sidebar = ({ user, items }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logoutAction());
    navigate('/login');
  };

  return (
    <Box component="aside" className="app-sidebar">
      <Box className="sidebar-user-summary">
        <Avatar alt={user.nombreApellido} src='https://lh3.googleusercontent.com/aida-public/AB6AXuDJ5DcwCqUxBTP6jUksUtzDByChxWAMaRxgRb-6tvApdoUZOH8XOsp8n1PJCJJPuUZRTVECl-HhiENhrtjDAUxMjNT0dWk_jaVY7MMogUO2uNh44dDlShzZ5dU9bOstE25Yz8qlUvkuXqkmoDYH1pVxNmA_ymOybJ1GYUt_8jBKp83ivlgniU51oQJQo_Fan0Vj0NMubQdWnb8GZXB1aYfNY4l_RMJAOIC1KKhop46PZ9Yx8HcNbooFzLIjYmwoY5-o6xwXmHJ8DcQh' className="sidebar-user-avatar" />
        <Typography variant="h6" className="sidebar-user-name">
          {user.nombreApellido}
        </Typography>
        <Typography variant="body2" className="sidebar-user-email">
          {user.mail}
        </Typography>
      </Box>

      <Box component="nav" className="sidebar-nav">
        {items.map((item) => (
          <Link
            key={item.to}
            component={RouterLink}
            to={item.to}
            className={`sidebar-nav-item ${isItemActive(location.pathname, item) ? 'active' : ''}`}
            underline="none"
          >
            <span className="sidebar-nav-icon">{item.icon}</span>
            <Typography className="sidebar-nav-text">{item.label}</Typography>
          </Link>
        ))}

        <Link
          component="button"
          type="button"
          onClick={() => setLogoutDialogOpen(true)}
          className="sidebar-nav-item sidebar-nav-item--logout"
          underline="none"
        >
          <span className="sidebar-nav-icon">
            <LogoutIcon />
          </span>
          <Typography className="sidebar-nav-text">Cerrar sesión</Typography>
        </Link>
      </Box>

      <ConfirmationDialog
        open={logoutDialogOpen}
        onClose={() => setLogoutDialogOpen(false)}
        onConfirm={handleLogout}
        title="¿Cerrar sesión?"
        subtitle="Vas a salir de tu cuenta en WePadel."
        confirmLabel="Cerrar sesión"
        confirmColor="primary"
      />
    </Box>
  );
};
