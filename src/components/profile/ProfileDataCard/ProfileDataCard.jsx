import { Typography, Button, TextField, Grid } from '@mui/material';
import './styles.scss';

export const ProfileDataCard = ({
  firstName = 'Juan',
  lastName = 'Pérez',
  email = 'juan.perez@padelpro.com',
}) => {
  return (
    <div className="surface-card surface-card--elevated profile-data-card">
      <div className="profile-data-card__header">
        <Typography variant="h5" className="profile-data-card__title">
          Mis datos
        </Typography>
        <Button variant="outlined" sx={{ color: 'primary.light', borderColor: 'primary.light' }} className="profile-data-card__edit-btn">
          Editar
        </Button>
      </div>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <div className="profile-data-card__field">
            <Typography variant="caption" className="profile-data-card__label">
              Nombre
            </Typography>
            <TextField fullWidth value={firstName} disabled variant="outlined" />
          </div>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <div className="profile-data-card__field">
            <Typography variant="caption" className="profile-data-card__label">
              Apellido
            </Typography>
            <TextField fullWidth value={lastName} disabled variant="outlined" />
          </div>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <div className="profile-data-card__field">
            <Typography variant="caption" className="profile-data-card__label">
              Email
            </Typography>
            <TextField fullWidth value={email} disabled variant="outlined" />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
