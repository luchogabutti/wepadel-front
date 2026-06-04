import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, TextField } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Form } from '../Form/Form';
import { isRegisterFormValid } from '../../../utils/authValidation';
import './styles.scss';

export const RegisterForm = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const canSubmit = isRegisterFormValid({ firstName, lastName, email, password });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    navigate('/');
  };

  return (
    <Form
      title="Crear una cuenta"
      subtitle="Unite a la comunidad de padel más exclusiva y accedé a equipamiento de élite."
      onSubmit={handleSubmit}
      footerText="¿Ya tenés cuenta?"
      footerActionText="Iniciá sesión"
      footerActionTo="/login"
      maxWidth="450px"
    >
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
        <Box className="form-field" sx={{ flex: 1 }}>
          <Typography variant="caption" className="field-label">
            Nombre
          </Typography>
          <TextField
            fullWidth
            required
            variant="outlined"
            placeholder="Ej: Juan"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Box>
        <Box className="form-field" sx={{ flex: 1 }}>
          <Typography variant="caption" className="field-label">
            Apellido
          </Typography>
          <TextField
            fullWidth
            required
            variant="outlined"
            placeholder="Ej: Perez"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Box>
      </Box>

      <Box className="form-field">
        <Typography variant="caption" className="field-label">
          Email
        </Typography>
        <TextField
          fullWidth
          required
          variant="outlined"
          placeholder="usuario@ejemplo.com"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Box>

      <Box className="form-field">
        <Typography variant="caption" className="field-label">
          Contraseña
        </Typography>
        <TextField
          fullWidth
          required
          variant="outlined"
          placeholder="••••••••••••"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Typography variant="caption" className="field-help-text">
          Mínimo 12 caracteres, una mayúscula, un número y un símbolo especial
        </Typography>
      </Box>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={!canSubmit}
        endIcon={<ArrowForwardIcon />}
        sx={{ py: '12px' }}
      >
        Crear cuenta
      </Button>
    </Form>
  );
};
