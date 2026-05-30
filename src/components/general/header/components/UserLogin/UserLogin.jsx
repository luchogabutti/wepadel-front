import PersonIcon from '@mui/icons-material/Person';
import { IconButton } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import './UserLogin.css';

export function UserLogin() {
  return (
    <IconButton 
      component={RouterLink} 
      to="/login" 
      className="user-login-wrapper"
      aria-label="Perfil"
    >
      <PersonIcon />
    </IconButton>
  );
}
