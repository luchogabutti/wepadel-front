import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { categories } from '../../data/categoriesData';

export const CategoryTabs = ({ activeCategory }) => {
  const navigate = useNavigate();

  return (
    <Box
      component="nav"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        gap: { xs: 3, md: 6 },
        py: 2,
        bgcolor: 'background.paper',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
      }}
    >
      {categories.map((cat) => {
        const isActive = activeCategory === cat.id;
        return (
          <Box
            key={cat.id}
            component="button"
            onClick={() => navigate(cat.id === 'paletas' ? '/catalogo' : `/catalogo/${cat.id}`)}
            sx={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: isActive ? 'primary.light' : 'text.secondary',
              fontWeight: 700,
              fontSize: '13px',
              letterSpacing: '0.15em',
              pb: 0.5,
              borderBottom: isActive ? '2px solid' : 'none',
              borderBottomColor: isActive ? 'primary.light' : 'transparent',
              textTransform: 'uppercase',
              transition: 'all 0.3s',
              '&:hover': { color: 'primary.light' },
            }}
          >
            {cat.label}
          </Box>
        );
      })}
    </Box>
  );
};
