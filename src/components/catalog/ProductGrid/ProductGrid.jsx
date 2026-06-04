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
import {
  TablePaginationFooter,
  buildShowingLabel,
} from '../../general/TablePaginationFooter/TablePaginationFooter';
import './styles.scss';

export const ProductGrid = ({ products, activeCategory }) => {
  const [sortOrder, setSortOrder] = useState('default');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(true);

  useEffect(() => {
    setSortOrder('default');
    setPriceRange([0, 500]);
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

  const hasActiveFilters =
    sortOrder !== 'default' || priceRange[0] !== 0 || priceRange[1] !== 500;

  const resetFilters = () => {
    setSortOrder('default');
    setPriceRange([0, 500]);
  };

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
      <aside className="sidebar">
        <div className="sidebar-header">
          <TuneIcon sx={{ color: 'primary.light', fontSize: '20px' }} />
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Filtrar por
          </Typography>
        </div>
        {filterControls}
        <Button
          variant="text"
          color="primary"
          className="filter-reset-btn"
          onClick={resetFilters}
          disabled={!hasActiveFilters}
        >
          Restablecer
        </Button>
      </aside>

      <main className="main">
        <Button
          variant="outlined"
          color="primary"
          className="mobile-filters-toggle"
          startIcon={<TuneIcon />}
          onClick={() => setMobileFiltersOpen((open) => !open)}
        >
          {mobileFiltersOpen ? 'Ocultar filtros' : 'Mostrar filtros'}
        </Button>

        <div className={`mobile-bar ${mobileFiltersOpen ? 'is-open' : ''}`}>
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

          <Button
            variant="text"
            color="primary"
            className="filter-reset-btn filter-reset-btn--mobile"
            onClick={resetFilters}
            disabled={!hasActiveFilters}
          >
            Restablecer
          </Button>
        </div>

        {filteredAndSorted.length === 0 ? (
          <div className="empty">
            <Typography variant="body1" className="empty-message">
              No se encontraron productos en este rango de precios.
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              onClick={resetFilters}
              sx={{ textTransform: 'none', fontWeight: 600 }}
            >
              Restablecer
            </Button>
          </div>
        ) : (
          <div className="grid">
            {filteredAndSorted.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {filteredAndSorted.length > 0 && (
          <TablePaginationFooter
            className="table-pagination-footer--catalog"
            label={buildShowingLabel(filteredAndSorted.length, filteredAndSorted.length, 'productos')}
          />
        )}
      </main>
    </div>
  );
};
