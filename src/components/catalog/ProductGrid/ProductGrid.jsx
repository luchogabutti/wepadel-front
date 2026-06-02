import { useState, useMemo, useEffect } from 'react';
import {
  Typography,
  Slider,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Button,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import TuneIcon from '@mui/icons-material/Tune';
import { ProductCard } from '../ProductCard/ProductCard';
import './styles.scss';

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

    if (sortOrder === 'asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'desc') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, sortOrder, priceRange]);


  const displayed = filteredAndSorted.slice(0, visibleCount);

  const filterControls = (
    <>
      <div className="filter-section">
        <Typography
          variant="caption"
          className="filter-label"
          sx={{ fontWeight: 700, letterSpacing: '0.1em' }}
        >
          ORDENAR POR PRECIO
        </Typography>
        <FormControl component="fieldset">
          <RadioGroup value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <FormControlLabel
              value="asc"
              control={<Radio size="small" sx={{ color: 'text.secondary', '&.Mui-checked': { color: 'primary.main' } }} />}
              label={<Typography variant="body2">Menor a mayor</Typography>}
            />
            <FormControlLabel
              value="desc"
              control={<Radio size="small" sx={{ color: 'text.secondary', '&.Mui-checked': { color: 'primary.main' } }} />}
              label={<Typography variant="body2">Mayor a menor</Typography>}
            />
          </RadioGroup>
        </FormControl>
      </div>

      <div className="filter-section">
        <Typography
          variant="caption"
          className="filter-label"
          sx={{ fontWeight: 700, letterSpacing: '0.1em' }}
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
            '& .MuiSlider-rail': { color: (theme) => alpha(theme.palette.text.primary, 0.1) },
          }}
        />
        <div className="price-labels">
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>${priceRange[0]}</Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>${priceRange[1]}</Typography>
        </div>
      </div>
    </>
  );

  return (
    <div className="product-grid">
      {/* Sidebar — desktop only */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <TuneIcon sx={{ color: 'primary.light', fontSize: '20px' }} />
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Catálogo
          </Typography>
        </div>
        {filterControls}
      </aside>

      {/* Main content */}
      <main className="main">
        {/* Filter bar — mobile/tablet only */}
        <div className="mobile-bar">
          <div className="mobile-sort">
            <Typography variant="caption" className="filter-label" sx={{ fontWeight: 700, letterSpacing: '0.05em' }}>
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
                label={<Typography variant="body2" sx={{ whiteSpace: 'nowrap' }}>Menor a mayor</Typography>}
              />
              <FormControlLabel
                value="desc"
                control={<Radio size="small" sx={{ color: 'text.secondary', '&.Mui-checked': { color: 'primary.main' } }} />}
                label={<Typography variant="body2" sx={{ whiteSpace: 'nowrap' }}>Mayor a menor</Typography>}
              />
            </RadioGroup>
          </div>

          <div className="mobile-price">
            <Typography variant="caption" className="filter-label" sx={{ fontWeight: 700, letterSpacing: '0.05em' }}>
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
                '& .MuiSlider-rail': { color: (theme) => alpha(theme.palette.text.primary, 0.1) },
              }}
            />
          </div>
        </div>

        {/* Grid or empty state */}
        {displayed.length === 0 ? (
          <div className="empty">
            <Typography variant="body1" className="empty-message">
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
          </div>
        ) : (
          <div className="grid">
            {displayed.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Load more */}
        {filteredAndSorted.length > displayed.length && (
          <div className="load-more">
            <Button
              variant="outlined"
              onClick={() => setVisibleCount((prev) => prev + 3)}
              sx={(theme) => ({
                color: 'primary.light',
                borderColor: alpha(theme.palette.text.primary, 0.1),
                px: 4,
                py: 1.5,
                fontWeight: 700,
                fontSize: '14px',
                borderRadius: 2,
                '&:hover': {
                  borderColor: 'primary.main',
                  bgcolor: alpha(theme.palette.primary.main, 0.05),
                },
              })}
            >
              Cargar más productos
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};
