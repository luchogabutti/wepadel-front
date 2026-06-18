import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { UserLogin } from './components/UserLogin';
import { ShoppingCart } from './components/ShoppingCart';
import { ProductSearch } from './components/ProductSearch';
import { useAuth } from '../../../context/AuthContext';
import './styles.scss';

const AUTH_ROUTES = ['/login', '/registro'];

export const Header = () => {
  const { pathname } = useLocation();
  const { isAdmin } = useAuth();
  const isAuthPage = AUTH_ROUTES.includes(pathname);
  const isAdminView = isAdmin || pathname.startsWith('/admin');

  return (
    <AppBar position="fixed" elevation={0} className="app-header-bar">
      <Toolbar className="header-toolbar">
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography
            variant="h5"
            component={RouterLink}
            to="/"
            className="header-logo"
          >
            WePadel
          </Typography>
          {isAdminView && (
            <span className="admin-header-badge">ADMIN</span>
          )}
        </Box>

        {!isAuthPage && !isAdminView && <ProductSearch />}

        {!isAuthPage && (
          <div className="header-actions">
            {!isAdminView && <ShoppingCart />}
            <UserLogin />
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};


