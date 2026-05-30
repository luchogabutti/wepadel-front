import { Link as RouterLink } from 'react-router-dom'
import { Box, Typography, Link } from '@mui/material'

export const TestPage = () => {
  return (
    <Box sx={{ textAlign: 'left' }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
        Página de prueba
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Ruta de prueba: <strong>/prueba</strong>
      </Typography>
      <Link component={RouterLink} to="/" color="primary" sx={{ fontWeight: 500, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
        Volver al inicio
      </Link>
    </Box>
  )
}
