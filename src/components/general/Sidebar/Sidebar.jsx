import { useState } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { Avatar, Box, Link, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { ConfirmationDialog } from '../ConfirmationDialog/ConfirmationDialog';
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
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <Box component="aside" className="app-sidebar">
      <Box className="sidebar-user-summary">
        <Avatar alt={user.name} src={user.avatarSrc} className="sidebar-user-avatar" />
        <Typography variant="h6" className="sidebar-user-name">
          {user.name}
        </Typography>
        <Typography variant="body2" className="sidebar-user-email">
          {user.email}
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
