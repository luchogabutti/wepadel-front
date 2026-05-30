import { Link as RouterLink } from 'react-router-dom'
import { Box, Typography, Link } from '@mui/material'

export function HomePage() {
  return (
    <Box sx={{ textAlign: 'left' }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
        Inicio
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Ruta de prueba: <strong>/</strong>
      </Typography>
      <Link component={RouterLink} to="/prueba" color="primary" sx={{ fontWeight: 500, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
        Ir a /prueba
      </Link>
    </Box>
  )
}
