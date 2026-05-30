import { Box, Typography } from '@mui/material'

export const PlaceholderPage = ({ title = 'Página' }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 64px)', gap: 2 }}>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
        {title}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Esta sección estará disponible próximamente.
      </Typography>
    </Box>
  )
}
