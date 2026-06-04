import { useEffect, useState } from 'react';
import { Typography, Button, TextField, Grid } from '@mui/material';
import { getProfileFieldError, isProfileFormValid } from '../../../utils/profileValidation';
import './styles.scss';

export const ProfileDataCard = ({
  firstName = 'Juan',
  lastName = 'Pérez',
  email = 'juan.perez@padelpro.com',
  onSaved,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [form, setForm] = useState({ firstName, lastName, email });
  const [saved, setSaved] = useState({ firstName, lastName, email });

  useEffect(() => {
    if (!isEditing) {
      setForm({ firstName: saved.firstName, lastName: saved.lastName, email: saved.email });
    }
  }, [saved, isEditing]);

  useEffect(() => {
    setSaved({ firstName, lastName, email });
    setForm({ firstName, lastName, email });
  }, [firstName, lastName, email]);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleEdit = () => {
    setShowErrors(false);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setForm({ ...saved });
    setShowErrors(false);
    setIsEditing(false);
  };

  const handleSave = () => {
    if (!isProfileFormValid(form)) {
      setShowErrors(true);
      return;
    }

    setSaved({ ...form });
    setShowErrors(false);
    setIsEditing(false);
    onSaved?.();
  };

  const fieldProps = (field) => {
    const errorMessage = isEditing && showErrors ? getProfileFieldError(field, form) : '';
    return {
      error: Boolean(errorMessage),
      helperText: errorMessage,
    };
  };

  return (
    <div className="surface-card surface-card--elevated profile-data-card">
      <div className="profile-data-card__header">
        <Typography variant="h5" className="profile-data-card__title">
          Mis datos
        </Typography>
        {isEditing ? (
          <div className="profile-data-card__actions">
            <Button variant="outlined" onClick={handleCancel} className="profile-data-card__cancel-btn">
              Cancelar
            </Button>
            <Button variant="contained" onClick={handleSave} className="profile-data-card__save-btn">
              Guardar
            </Button>
          </div>
        ) : (
          <Button variant="outlined" onClick={handleEdit} className="profile-data-card__edit-btn">
            Editar
          </Button>
        )}
      </div>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <div className="profile-data-card__field">
            <Typography variant="caption" className="profile-data-card__label">
              Nombre
            </Typography>
            <TextField
              fullWidth
              required
              value={form.firstName}
              onChange={handleChange('firstName')}
              disabled={!isEditing}
              variant="outlined"
              {...fieldProps('firstName')}
            />
          </div>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <div className="profile-data-card__field">
            <Typography variant="caption" className="profile-data-card__label">
              Apellido
            </Typography>
            <TextField
              fullWidth
              required
              value={form.lastName}
              onChange={handleChange('lastName')}
              disabled={!isEditing}
              variant="outlined"
              {...fieldProps('lastName')}
            />
          </div>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <div className="profile-data-card__field">
            <Typography variant="caption" className="profile-data-card__label">
              Email
            </Typography>
            <TextField
              fullWidth
              required
              type="email"
              value={form.email}
              onChange={handleChange('email')}
              disabled={!isEditing}
              variant="outlined"
              {...fieldProps('email')}
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
