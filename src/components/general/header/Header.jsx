import { AppBar, Toolbar, Typography, InputBase, Box } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { UserLogin } from './components/UserLogin';
import { ShoppingCart } from './components/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import './styles.scss';

const AUTH_ROUTES = ['/login', '/registro'];

export const Header = () => {
  const { pathname } = useLocation();
  const isAuthPage = AUTH_ROUTES.includes(pathname);
  const isAdminPage = pathname.startsWith('/admin');

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
          {isAdminPage && (
            <span className="admin-header-badge">ADMIN</span>
          )}
        </Box>

        {!isAuthPage && !isAdminPage && (
          <>
            <div className="search-container">
              <div className="search-box">
                <SearchIcon sx={{ color: 'text.secondary', fontSize: '20px', mr: 1 }} />
                <InputBase
                  placeholder="Buscar"
                  className="search-input"
                />
              </div>
            </div>

            <div className="header-actions">
              <ShoppingCart />
              <UserLogin />
            </div>
          </>
        )}

        {isAdminPage && (
          <div className="header-actions">
            <UserLogin />
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};


