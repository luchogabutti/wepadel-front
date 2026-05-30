import { Box, Typography } from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import { Link } from 'react-router-dom';

const categories = [
  {
    id: 1,
    title: 'PALETAS',
    icon: CategoryIcon,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-yjy1JExQez21J_WpMqzYJ_MqJnptKKJ7JwaDS-Hxx5BcvPe-trnVrePYEUzaK3-etXdp6KtaimRsadDKCdkne2n8MQnJ-HGdXB_LR8jYvw-Za5hQ1QLetJcJuHzPX-vEXTjx0KHOVSdy8TgDdY0IW_Wwbj8upAwd8pVP1lekSd5oTlSatKTd4TIQ_wyyYdYHDZCnPIpyKeBfNrWJqTij_FSJ5rqL9a0TW0VL_yi-QoyeULWi14HjgBXaEVXDcKqZgmHQC79JT1gB',
    path: '/catalogo',
  },
  {
    id: 2,
    title: 'ACCESORIOS',
    icon: FitnessCenterIcon,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFE3tklQN7U-ivmNkLhFz9ZwFlnN0dY4DhqfZ8KIG_w7N6zb2pzaM_5ITEeuv-5niLJ7BVpgZfJ73F3CCswxbxkYD8hRTfEzlfKYVgwKuSx61kVIgacCFbRCMwZPhiXNWrxSaRgCqiFPiytqi56R_PiBA8LnlO-fM0aSsz3yHPtCVmnhdiF6KkZq0i7c5YFaaFMDO9OpctDI8OKOrRQqC9e7Z5oGrnY8UWGJzm4TMFrwZGQYMn49R5JbXPNJ9hoyZdKsfwPSOL1OPM',
    path: '#catalogo/accesiorios',
  },
  {
    id: 3,
    title: 'PELOTAS',
    icon: SportsTennisIcon,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcIwhbeLBb9-7Z1Y9OKmPRAwl4iNRjMpe6II3UUNm2_Co3oMFwt_z0l9Dr5PQ5Z0VVEqdW2QfZz1VDppNCuPTejusMSVmakC3DAHKG22UI6BJbPJqxxVFpuhyJA7pajmnU9oqukmMbJ9GmdJFRt_3bpYc6iuYbl-r83DIWTgRQmbvV6AdAJn-lULhJb7vI2IEurv1yFmfSihJCMqlQozTo-BWuBs8GEg9PIsTn9VEsufbeUxsQxLcM_vnfbD2P8H0VvPSFoJdX-LZ5',
    path: '#catalogo/pelotas',
  },
];

export const CategoriesSection = () => {
  return (
    <Box component="section" sx={{ py: 6, bgcolor: 'background.default' }}>
      <Typography variant="h4" sx={{ textAlign: 'center', mb: 6, fontWeight: 700, px: 2 }}>
        Explora por Categoría
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 2,
          px: { xs: 2, md: 4 },
        }}
      >
        {categories.map((cat) => {
          const IconComponent = cat.icon;
          return (
            <Box
              key={cat.id}
              component={cat.path === '#' ? 'a' : Link}
              to={cat.path !== '#' ? cat.path : undefined}
              href={cat.path === '#' ? '#' : undefined}
              sx={{
                flex: 1,
                position: 'relative',
                minHeight: { xs: 220, md: 380 },
                borderRadius: 2,
                overflow: 'hidden',
                textDecoration: 'none',
                display: 'block',
                '&:hover .cat-image': { transform: 'scale(1.05)' },
                '&:hover .cat-text': { opacity: 1 },
              }}
            >
              <Box
                component="img"
                src={cat.img}
                alt={cat.title}
                className="cat-image"
                sx={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: 0.65,
                  transition: 'transform 0.7s ease',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, #0C0B12 10%, transparent 60%)',
                }}
              />
              <Box
                sx={{
                  position: 'relative',
                  zIndex: 1,
                  height: '100%',
                  minHeight: 'inherit',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  p: 4,
                }}
              >
                <IconComponent sx={{ fontSize: 52, color: 'primary.light', mb: 2 }} />
                <Typography variant="h5" sx={{ fontWeight: 700, color: 'white', letterSpacing: '0.05em' }}>
                  {cat.title}
                </Typography>
                <Typography
                  className="cat-text"
                  variant="button"
                  sx={{
                    color: 'primary.light',
                    mt: 1,
                    fontWeight: 'bold',
                    opacity: 0,
                    transition: 'opacity 0.3s',
                  }}
                >
                  DESCUBRIR
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
