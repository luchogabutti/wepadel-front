import PersonIcon from '@mui/icons-material/Person';
import { IconButton } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';

export const UserLogin = () => {
  const { pathname } = useLocation();
  const profilePath = pathname.startsWith('/admin') ? '/admin/perfil' : '/perfil';

  return (
    <IconButton
      component={RouterLink}
      to={profilePath}
      aria-label="Perfil"
      sx={{
        color: 'primary.light',
        transition: 'opacity 0.2s ease-in-out',
        '&:hover': {
          opacity: 0.7,
        },
      }}
    >
      <PersonIcon />
    </IconButton>
  );
};
