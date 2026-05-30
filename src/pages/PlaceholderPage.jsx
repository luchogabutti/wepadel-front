import { Box, Typography } from '@mui/material'

export const PlaceholderPage = ({ title = 'Página' }) => {
  return (
    <Box sx={{ textAlign: 'left' }}>
      <Typography variant="h5" component="h1" color="text.secondary" sx={{ fontWeight: 600 }}>
        {title} (próximamente)
      </Typography>
    </Box>
  )
}
