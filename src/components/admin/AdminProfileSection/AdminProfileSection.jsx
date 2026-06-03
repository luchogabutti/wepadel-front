import { Box, Typography, Button } from '@mui/material';
import { PageHeader } from '../../layout/PageHeader';
import '../styles.scss';

export const AdminProfileSection = ({ title, subtitle }) => {
  return (
    <>
      <PageHeader variant="profile" title={title} subtitle={subtitle} />

      <Box className="surface-card admin-profile-card">
        <Box className="admin-profile-avatar">JP</Box>

        <Box className="admin-profile-info">
          <Typography variant="h5" className="admin-profile-name">
            Juan Pérez
          </Typography>
          <Typography variant="body2" className="admin-profile-email">
            juan.perez@padelpro.com
          </Typography>
          <Typography variant="caption" className="admin-profile-role">
            Administrador General
          </Typography>
        </Box>

        <Button
          variant="outlined"
          color="inherit"
          href="/"
          className="admin-profile-back-btn"
        >
          Volver a la Tienda Pública
        </Button>
      </Box>
    </>
  );
};
