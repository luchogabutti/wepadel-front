import { useState } from 'react';
import { Box, Typography, Button, TextField } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Form } from '../Form/Form';
import './styles.scss';

export const RegisterForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registration submitted:', { firstName, lastName, email, password });
    // Aquí se manejaría el registro
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
      {/* Nombre y Apellido lado a lado */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
        <Box className="form-field" sx={{ flex: 1 }}>
          <Typography variant="caption" className="field-label">
            Nombre
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Ej: Juan"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </Box>
        <Box className="form-field" sx={{ flex: 1 }}>
          <Typography variant="caption" className="field-label">
            Apellido
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Ej: Perez"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </Box>
      </Box>

      {/* Email */}
      <Box className="form-field">
        <Typography variant="caption" className="field-label">
          Email
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="usuario@ejemplo.com"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Box>

      {/* Contraseña */}
      <Box className="form-field">
        <Typography variant="caption" className="field-label">
          Contraseña
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="••••••••••••"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Typography variant="caption" className="field-help-text">
          Mínimo 12 caracteres, una mayúscula, un número y un símbolo especial
        </Typography>
      </Box>

      {/* Botón de Enviar */}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        className="submit-btn"
        endIcon={<ArrowForwardIcon />}
        sx={{
          bgcolor: '#0066FF',
          color: '#FFFFFF',
          py: '12px',
          fontWeight: 700,
          fontSize: '16px',
          textTransform: 'none',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 102, 255, 0.3)',
          '&:hover': {
            bgcolor: '#0052cc',
            opacity: 0.95,
          },
          '&:active': {
            transform: 'scale(0.98)',
          },
          transition: 'all 0.2s ease',
          mt: 1,
        }}
      >
        Crear cuenta
      </Button>
    </Form>
  );
};
