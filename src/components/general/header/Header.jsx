import { AppBar, Toolbar, Typography, Box, InputBase } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { UserLogin } from './components/UserLogin';
import { ShoppingCart } from './components/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';

export const Header = () => {
  return (
    <AppBar position="fixed" elevation={0} sx={{ height: '64px', justifyContent: 'center' }}>
      <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 6 } }}>
        <Typography
          variant="h5"
          component={RouterLink}
          to="/"
          sx={{ textDecoration: 'none', color: 'primary.light', fontWeight: 800, letterSpacing: '-0.02em' }}
        >
          WePadel
        </Typography>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, flex: 1, maxWidth: '600px', mx: 4 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              bgcolor: '#2a2931',
              px: 2,
              py: 0.5,
              borderRadius: '9999px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <SearchIcon sx={{ color: 'text.secondary', fontSize: '20px', mr: 1 }} />
            <InputBase
              placeholder="Buscar"
              sx={{ color: 'text.primary', width: '100%', fontSize: '14px' }}
            />
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <ShoppingCart />
          <UserLogin />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
