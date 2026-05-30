import { Box, Typography, Link, IconButton, Container } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

function FooterColumn({ title, children }) {
  return (
    <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
      <Typography
        variant="overline"
        sx={{
          display: 'block',
          fontWeight: 'bold',
          color: 'text.primary',
          mb: 2,
          letterSpacing: '0.1em',
        }}
      >
        {title}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: { xs: 'center', md: 'flex-start' } }}>
        {children}
      </Box>
    </Box>
  );
}

export function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        py: 6,
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        bgcolor: '#0e0d14',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: { xs: 'center', md: 'space-between' },
            alignItems: { xs: 'center', md: 'flex-start' },
            gap: { xs: 4, md: 0 },
          }}
        >
          <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Typography
              variant="h5"
              sx={{ fontFamily: 'Outfit', fontWeight: 800, color: 'primary.light', mb: 1 }}
            >
              WePadel
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Elite Performance Equipment.
            </Typography>
          </Box>

          <FooterColumn title="Compañía">
            <Link href="#" underline="hover" color="text.secondary" sx={{ '&:hover': { color: 'primary.main' } }}>
              Sobre nosotros
            </Link>
            <Link href="#" underline="hover" color="text.secondary" sx={{ '&:hover': { color: 'primary.main' } }}>
              Contacto
            </Link>
          </FooterColumn>

          <FooterColumn title="Soporte">
            <Link href="#" underline="hover" color="text.secondary" sx={{ '&:hover': { color: 'primary.main' } }}>
              Política de privacidad
            </Link>
            <Link href="#" underline="hover" color="text.secondary" sx={{ '&:hover': { color: 'primary.main' } }}>
              Términos de servicio
            </Link>
          </FooterColumn>

          <FooterColumn title="Síguenos">
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
                <ShareIcon />
              </IconButton>
              <IconButton sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
                <CameraAltIcon />
              </IconButton>
            </Box>
          </FooterColumn>
        </Box>

        <Typography
          variant="body2"
          sx={{ color: 'text.secondary', opacity: 0.6, mt: 6, textAlign: 'center' }}
        >
          © 2026 WePadel. Elite Performance Equipment.
        </Typography>
      </Container>
    </Box>
  );
}
