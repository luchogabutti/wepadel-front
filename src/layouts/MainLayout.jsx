import { Outlet } from 'react-router-dom'
import { Header } from '../components/general/header/Header'
import { Box, Container } from '@mui/material'

export function MainLayout() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Container component="main" maxWidth="lg" sx={{ flexGrow: 1, py: 4 }}>
        <Outlet />
      </Container>
    </Box>
  )
}
