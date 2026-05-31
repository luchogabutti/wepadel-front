import { useState, useMemo, useEffect } from 'react';
import {
  Box,
  Typography,
  Slider,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Button,
} from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import { ProductCard } from './ProductCard/ProductCard';

export const ProductGrid = ({ products, activeCategory }) => {
  const [sortOrder, setSortOrder] = useState('default');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    setSortOrder('default');
    setPriceRange([0, 500]);
    setVisibleCount(6);
  }, [activeCategory]);

  const filteredAndSorted = useMemo(() => {
    let result = products.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    if (sortOrder === 'asc') result.sort((a, b) => a.price - b.price);
    else if (sortOrder === 'desc') result.sort((a, b) => b.price - a.price);

    return result;
  }, [products, sortOrder, priceRange]);

  const displayed = filteredAndSorted.slice(0, visibleCount);

  const filterControls = (
    <>
      <Box sx={{ py: 2.5, borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
        <Typography
          variant="caption"
          sx={{ color: 'text.secondary', fontWeight: 700, letterSpacing: '0.1em', display: 'block', mb: 2 }}
        >
          ORDENAR POR PRECIO
        </Typography>
        <FormControl component="fieldset">
          <RadioGroup value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <FormControlLabel
              value="asc"
              control={<Radio size="small" sx={{ color: 'text.secondary', '&.Mui-checked': { color: 'primary.main' } }} />}
              label={<Typography variant="body2" sx={{ color: 'text.primary' }}>Menor a mayor</Typography>}
            />
            <FormControlLabel
              value="desc"
              control={<Radio size="small" sx={{ color: 'text.secondary', '&.Mui-checked': { color: 'primary.main' } }} />}
              label={<Typography variant="body2" sx={{ color: 'text.primary' }}>Mayor a menor</Typography>}
            />
          </RadioGroup>
        </FormControl>
      </Box>

      <Box sx={{ py: 2.5, borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
        <Typography
          variant="caption"
          sx={{ color: 'text.secondary', fontWeight: 700, letterSpacing: '0.1em', display: 'block', mb: 2 }}
        >
          RANGO DE PRECIO (USD)
        </Typography>
        <Slider
          value={priceRange}
          onChange={(_, val) => setPriceRange(val)}
          valueLabelDisplay="auto"
          min={0}
          max={500}
          sx={{
            color: 'primary.main',
            '& .MuiSlider-thumb': { bgcolor: 'primary.light' },
            '& .MuiSlider-track': { bgcolor: 'primary.main' },
            '& .MuiSlider-rail': { color: 'rgba(255,255,255,0.1)' },
          }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>${priceRange[0]}</Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>${priceRange[1]}</Typography>
        </Box>
      </Box>
    </>
  );

  return (
    <Box sx={{ display: 'flex', flex: 1, gap: 4 }}>
      {/* Sidebar — desktop only */}
      <Box
        component="aside"
        sx={{
          display: { xs: 'none', lg: 'flex' },
          flexDirection: 'column',
          width: '260px',
          flexShrink: 0,
          bgcolor: 'background.paper',
          borderRadius: 2,
          border: '1px solid rgba(255, 255, 255, 0.05)',
          p: 3,
          height: 'fit-content',
          position: 'sticky',
          top: '84px',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
          <TuneIcon sx={{ color: 'primary.light', fontSize: '20px' }} />
          <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>
            Catálogo
          </Typography>
        </Box>
        {filterControls}
      </Box>

      {/* Main content */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        {/* Filter bar — mobile/tablet only */}
        <Box
          sx={{
            display: { xs: 'flex', lg: 'none' },
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'stretch', sm: 'center' },
            bgcolor: 'background.paper',
            borderRadius: 2,
            border: '1px solid rgba(255, 255, 255, 0.05)',
            p: 2,
            px: 3,
            gap: 4,
            width: '100%',
            mb: 4,
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700, letterSpacing: '0.05em' }}>
              ORDENAR POR PRECIO
            </Typography>
            <RadioGroup
              row
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              sx={{ gap: 1 }}
            >
              <FormControlLabel
                value="asc"
                control={<Radio size="small" sx={{ color: 'text.secondary', '&.Mui-checked': { color: 'primary.main' } }} />}
                label={<Typography variant="body2" sx={{ color: 'text.primary', whiteSpace: 'nowrap' }}>Menor a mayor</Typography>}
              />
              <FormControlLabel
                value="desc"
                control={<Radio size="small" sx={{ color: 'text.secondary', '&.Mui-checked': { color: 'primary.main' } }} />}
                label={<Typography variant="body2" sx={{ color: 'text.primary', whiteSpace: 'nowrap' }}>Mayor a menor</Typography>}
              />
            </RadioGroup>
          </Box>

          <Box sx={{ minWidth: '200px', display: 'flex', flexDirection: 'column', gap: 0.5, flexGrow: { xs: 1, sm: 0 } }}>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700, letterSpacing: '0.05em' }}>
              RANGO DE PRECIO (${priceRange[0]} - ${priceRange[1]} USD)
            </Typography>
            <Slider
              value={priceRange}
              onChange={(_, val) => setPriceRange(val)}
              valueLabelDisplay="auto"
              min={0}
              max={500}
              size="small"
              sx={{
                py: 1,
                color: 'primary.main',
                '& .MuiSlider-thumb': { bgcolor: 'primary.light' },
                '& .MuiSlider-track': { bgcolor: 'primary.main' },
                '& .MuiSlider-rail': { color: 'rgba(255,255,255,0.1)' },
              }}
            />
          </Box>
        </Box>

        {/* Grid or empty state */}
        {displayed.length === 0 ? (
          <Box sx={{ py: 8, textAlign: 'center' }}>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
              No se encontraron productos en este rango de precios.
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => { setPriceRange([0, 500]); setSortOrder('default'); }}
              sx={{ textTransform: 'none', fontWeight: 600 }}
            >
              Restablecer filtros
            </Button>
          </Box>
        ) : (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
              gap: 3,
            }}
          >
            {displayed.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Box>
        )}

        {/* Load more */}
        {filteredAndSorted.length > displayed.length && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
            <Button
              variant="outlined"
              onClick={() => setVisibleCount((prev) => prev + 3)}
              sx={{
                color: 'primary.light',
                borderColor: 'rgba(255, 255, 255, 0.1)',
                px: 4,
                py: 1.5,
                fontWeight: 700,
                fontSize: '14px',
                borderRadius: 2,
                '&:hover': { borderColor: 'primary.main', bgcolor: 'rgba(0, 102, 255, 0.05)' },
              }}
            >
              Cargar más productos
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};
