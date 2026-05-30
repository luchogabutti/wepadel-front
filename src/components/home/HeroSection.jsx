import { Box, Typography, Button } from '@mui/material';

export function HeroSection() {
  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        width: '100%',
        height: { xs: '819px', md: '921px' },
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        px: { xs: 2, md: 6 },
      }}
    >
      <Box sx={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Box
          component="img"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkpV-sAwDj0oBQJZ8X4mNOhR83zaLbVnI-sI5e2WidNmiV8VlWXxY6gQ-SwrcNu95WqvqhwfQPM42S4ExmfLmoiocD6T9_UP2HY2LOpfEsSLftBe_MVc5t7eSWd6EhYjKIEmZY5Frc6Gm5D1iBzYHvO5ESlTcg6uut1bXSSfNLD0wHIIlnrJssQFIHyivG-rxc0kY4j9p3f8f7v-zhcPSh8iomyNIqtaHl7y4VwWHcad7LP1a24L1vuocUVshz8HOxuYh9Ndre-JIA"
          alt="WePadel Hero"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 30%',
            transform: 'scale(1.05)',
            filter: 'brightness(0.4)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, #0C0B12, rgba(12,11,18,0.4), transparent)',
          }}
        />
      </Box>
      <Box sx={{ relative: true, zIndex: 10, maxWidth: 'md', position: 'relative' }}>
        <Typography
          variant="overline"
          sx={{
            color: 'primary.light',
            letterSpacing: '0.3em',
            mb: 2,
            display: 'block',
            fontWeight: 500,
          }}
        >
          Elite Performance
        </Typography>
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '48px', md: '64px' },
            fontWeight: 800,
            lineHeight: 1.2,
            mb: 4,
            color: 'text.primary',
          }}
        >
          DOMINA LA PISTA CON{' '}
          <Box component="span" sx={{ color: 'primary.main' }}>
            WEPADEL
          </Box>
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: 'text.secondary',
            mb: 4,
            maxWidth: 'sm',
            fontSize: '16px',
          }}
        >
          Equipamiento técnico diseñado para jugadores que buscan la máxima potencia y control en cada
          golpe. Tecnología de fibra de carbono de última generación.
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <Button variant="contained" color="primary" sx={{ px: 4, py: 2, fontWeight: 'bold' }}>
            Ver catálogo
          </Button>
          <Button
            variant="outlined"
            sx={{
              px: 4, py: 2, fontWeight: 'bold',
              color: 'primary.light',
              borderColor: 'primary.light',
              '&:hover': { borderColor: 'primary.light', bgcolor: 'rgba(179, 197, 255, 0.08)' },
            }}
          >
            Nuevos Ingresos
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
