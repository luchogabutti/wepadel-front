import { AppBar, Toolbar, Typography, Grid, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { UserLogin } from './components/UserLogin';
import { ShoppingCart } from './components/ShoppingCart';
import { HeaderSearch } from './components/HeaderSearch';

export function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container alignItems="center" justifyContent="space-between" spacing={2}>

          <Grid item xs={6} sm={3} md={2}>
            <Typography
              variant="h6"
              component={RouterLink}
              to="/"
              sx={{ textDecoration: 'none', color: 'inherit', fontWeight: 'bold' }}
            >
              WePadel
            </Typography>
          </Grid>

          <Grid
            item
            xs={0} sm={6} md={7}
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            <HeaderSearch />
          </Grid>

          <Grid
            item
            xs={6} sm={3} md={3}
            sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}
          >
            <ShoppingCart />
            <UserLogin />
          </Grid>

        </Grid>
      </Toolbar>
    </AppBar>
  );
}
