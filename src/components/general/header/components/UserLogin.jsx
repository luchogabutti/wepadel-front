import PersonIcon from '@mui/icons-material/Person';
import { IconButton } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export const UserLogin = () => {
  return (
    <IconButton 
      component={RouterLink} 
      to="/perfil" 
      aria-label="Perfil"
      sx={{
        color: 'primary.light',
        transition: 'opacity 0.2s ease-in-out',
        '&:hover': {
          opacity: 0.7,
        }
      }}
    >
      <PersonIcon />
    </IconButton>
  );
}
