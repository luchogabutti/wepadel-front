import { Box, Typography, Button, TextField, Grid, Card, CardContent } from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { ProfileSidebar } from '../components/profile/ProfileSidebar/ProfileSidebar';
import { PointsBadge } from '../components/profile/PointsBadge/PointsBadge';

export const ProfilePage = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', minHeight: 'calc(100vh - 64px)', bgcolor: 'background.default' }}>
      <ProfileSidebar />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          minWidth: 0,
        }}
      >
        {/* Cuerpo de la Página */}
        <Box sx={{ flexGrow: 1, px: { xs: 2, md: 6 }, py: 6 }}>
          <Box sx={{ maxWidth: '1024px', mx: 'auto' }}>
            {/* Cabecera del Perfil */}
            <Box sx={{ mb: 6 }}>
              <Typography
                variant="h1"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: '32px', md: '44px' },
                  letterSpacing: '-0.02em',
                  mb: 1,
                  color: 'primary.light',
                }}
              >
                Mi Perfil
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '16px' }}>
                Administra tu cuenta y revisa tus beneficios exclusivos.
              </Typography>
            </Box>

            {/* Bento Grid Layout */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              {/* Mis Datos (Ancho: 2 columnas en lg) */}
              <Grid item xs={12} lg={8}>
                <Box
                  sx={{
                    bgcolor: '#141C24',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px',
                    p: 4,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                  }}
                >
                  {/* Encabezado Sección */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                    <Typography variant="h5" sx={{ fontWeight: 700, fontFamily: 'Outfit', color: '#FFFFFF' }}>
                      Mis datos
                    </Typography>
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{
                        borderColor: '#0066FF',
                        color: '#0066FF',
                        fontWeight: 700,
                        textTransform: 'none',
                        px: 3,
                        py: 0.8,
                        borderRadius: '8px',
                        '&:hover': {
                          bgcolor: 'rgba(0, 102, 255, 0.08)',
                          borderColor: '#0066FF',
                        },
                      }}
                    >
                      Editar
                    </Button>
                  </Box>

                  {/* Campos Formulario */}
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Typography variant="caption" sx={{ color: '#A0AEC0', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                          Nombre
                        </Typography>
                        <TextField
                          fullWidth
                          value="Juan"
                          disabled
                          variant="outlined"
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              bgcolor: 'rgba(0, 0, 0, 0.2)',
                              borderRadius: '8px',
                              border: '1px solid rgba(160, 174, 192, 0.1)',
                              '& fieldset': { border: 'none' },
                            },
                            '& .MuiInputBase-input.Mui-disabled': {
                              color: '#FFFFFF',
                              WebkitTextFillColor: '#FFFFFF',
                              py: '12px',
                              px: '16px',
                            },
                          }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Typography variant="caption" sx={{ color: '#A0AEC0', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                          Apellido
                        </Typography>
                        <TextField
                          fullWidth
                          value="Pérez"
                          disabled
                          variant="outlined"
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              bgcolor: 'rgba(0, 0, 0, 0.2)',
                              borderRadius: '8px',
                              border: '1px solid rgba(160, 174, 192, 0.1)',
                              '& fieldset': { border: 'none' },
                            },
                            '& .MuiInputBase-input.Mui-disabled': {
                              color: '#FFFFFF',
                              WebkitTextFillColor: '#FFFFFF',
                              py: '12px',
                              px: '16px',
                            },
                          }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Typography variant="caption" sx={{ color: '#A0AEC0', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                          Email
                        </Typography>
                        <TextField
                          fullWidth
                          value="juan.perez@padelpro.com"
                          disabled
                          variant="outlined"
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              bgcolor: 'rgba(0, 0, 0, 0.2)',
                              borderRadius: '8px',
                              border: '1px solid rgba(160, 174, 192, 0.1)',
                              '& fieldset': { border: 'none' },
                            },
                            '& .MuiInputBase-input.Mui-disabled': {
                              color: '#FFFFFF',
                              WebkitTextFillColor: '#FFFFFF',
                              py: '12px',
                              px: '16px',
                            },
                          }}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>

              {/* Mis Puntos (Ancho: 1 columna en lg) */}
              <Grid item xs={12} lg={4}>
                <PointsBadge pointsValue={500} />
              </Grid>
            </Grid>

            {/* Fichas de Beneficios de Bento */}
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Card
                  sx={{
                    bgcolor: '#141C24',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    height: '100%',
                  }}
                >
                  <CardContent sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                    <VerifiedIcon sx={{ color: '#00CC99', fontSize: '32px' }} />
                    <Typography variant="h6" sx={{ fontWeight: 700, fontFamily: 'Outfit', color: '#FFFFFF' }}>
                      Miembro Elite
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#A0AEC0', lineHeight: 1.4 }}>
                      Acceso prioritario a lanzamientos de nuevas colecciones.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card
                  sx={{
                    bgcolor: '#141C24',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    height: '100%',
                  }}
                >
                  <CardContent sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                    <LocalShippingIcon sx={{ color: '#00CC99', fontSize: '32px' }} />
                    <Typography variant="h6" sx={{ fontWeight: 700, fontFamily: 'Outfit', color: '#FFFFFF' }}>
                      Envíos Gratis
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#A0AEC0', lineHeight: 1.4 }}>
                      Por ser cliente recurrente, tenés envío bonificado en todo el país.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card
                  sx={{
                    bgcolor: '#141C24',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    height: '100%',
                  }}
                >
                  <CardContent sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                    <SupportAgentIcon sx={{ color: '#00CC99', fontSize: '32px' }} />
                    <Typography variant="h6" sx={{ fontWeight: 700, fontFamily: 'Outfit', color: '#FFFFFF' }}>
                      Soporte VIP
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#A0AEC0', lineHeight: 1.4 }}>
                      Chat directo con nuestros expertos en equipamiento técnico.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
