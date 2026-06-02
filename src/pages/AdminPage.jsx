import { Box, Typography, Button } from '@mui/material'

export const AdminPage = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        color: 'text.primary',
        p: { xs: 2, md: 5 },
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: '32px', md: '44px' },
          fontWeight: 800,
          mb: 1,
        }}
      >
        Panel administrador
      </Typography>

      <Typography
        variant="body1"
        sx={{
          color: 'text.secondary',
          mb: 4,
        }}
      >
        Desde acá el administrador va a poder gestionar productos, pedidos, usuarios y descuentos.
      </Typography>

      <Button variant="contained">
        Nuevo producto
      </Button>
    </Box>
  )
}