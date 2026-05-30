import { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Slider,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Button,
  IconButton,
  Grid,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import TuneIcon from '@mui/icons-material/Tune';
import { Footer } from '../components/general/footer/Footer';

const categories = [
  { id: 'paletas', label: 'PALETAS', active: true },
  { id: 'accesorios', label: 'ACCESORIOS', active: false },
  { id: 'pelotas', label: 'PELOTAS', active: false },
];

const mockProducts = [
  {
    id: 1,
    title: 'Pro Carbon Stealth',
    category: 'Paleta de Ataque',
    price: 349.99,
    oldPrice: 412.00,
    badge: '15% OFF',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXKAgpP53VaYUIYhiPLYu0myrXae465GDTDUpNqtkVLF_ipW1Baj_Lv7BGfRPbI_uEIUcD5aHT4_U5n3TPpcua5PA164OHuVI0ZMOQa932eOUkrjL4iLHplXZezbWFs9iU39dIMa0WMjQE_aSvjUZIgKlXAnDpTp6hYmI5JryLvMVs7D5b6mK3JRRqCBLFeDd4GAoIb3VW0Ev5jkDV_zm1-kZa7TQf7hKNmpSZGj6cjeUENXBj8i0E4biiXhPFMeKNX9-6SHsMzfVR',
    inStock: true,
  },
  {
    id: 2,
    title: 'Viper Ultra Light',
    category: 'Paleta de Control',
    price: 289.00,
    oldPrice: 340.00,
    badge: '15% OFF',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWhJ0DcIyfcCe5ql7ivzgEpctZ11YOyDFSzVIe2mx4Zjc5kFbregCqha5QHVlBJumWK24XjLLG9Hnq8ynCrCUl2qooiqia_ExNkYP0Qqp-xv0L4a1T5EMPwTaAZsgJZttAc56hFrbbMhxhilPjXIt8mV_ituUm4RFQiycaLNfNytCgGaIksfJLgNeU0gyoyodcl_UpvZ0n-hOe_I6igIx7zZejxhs9q64SHK5gHlP30w7AO2UEN5S3o0wB9Lt9zJHi-lo7FPtnJFn1',
    inStock: true,
  },
  {
    id: 3,
    title: 'Neon Strike Hybrid',
    category: 'Paleta Híbrida',
    price: 315.00,
    oldPrice: 370.00,
    badge: '15% OFF',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5PFu8T9sFFeCZyWG_U_HCsT64FBwHrCXIxpsM4x06rQ_IXbWaO-XeENBwckqb9sYGAD81pVEC-b7mLr_MXuowLtXrJbOGBV209IkSFRVutYzRm5zXOuIikFbnBAgMp-8akJSnKK7FTsFWvCYFo2aQzM-pzVV7X6s0bhFXfxdvDxuFW9_LPqJK1bEbwvrL5gymBb5zhbXQbyTt6kyWf1K1pOCmSYvvwFvwPjeNSKhYQ7q9wnxZPpiqLR8L1H3r7zo-jd3mh2Na-eFm',
    inStock: true,
  },
  {
    id: 4,
    title: 'Apex Control Orange',
    category: 'Paleta de Control',
    price: 245.00,
    oldPrice: 288.00,
    badge: '15% OFF',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGiBt5KIyFelXEOnEdkLZGzcKV8iqLrMiG2uWc3VqFB-8jbm-1CZEj17OMOIMV_E8WoHdZfxwGFXx_laF5nTICV09bj_9ygfb7j4SdpZO95N6r3HDjvtHZG_AxyG61g6v77cjOtPWWxb9YfoIwPNg53bdMg7YczGOgu9Z3_tUC6r7y0f7QHkHWP8H_VjHiwMZIMzKjc2vXJ9SX5rboSbIM8_CegUrYwvRJf9FM2U3GfBrz7JAVMb-RgY59oK1TJhUADIcGK0Htoqha',
    inStock: true,
  },
  {
    id: 5,
    title: 'Toxic Green Power',
    category: 'Paleta de Potencia',
    price: 399.00,
    oldPrice: 470.00,
    badge: '15% OFF',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAACLDJjcGAE8qVjTAPusbnQK9ih2YyWpyn1uhImzmZudTXK4lGB-17_UdeStTJriDz9V56UIUSDZhDrDbmYZnEOikmyxGODOFXgFOG0FRJrPpCUIkCgRt8_uAlEHGkW5916bDOnRG9UGJKkvJXeZsYElrXAAJ9RkqvM-hbfNiklOlh7il6NyFxqRLqbSX234UUvjWVpIe00FpZOX2mlkVA1r9dS0PGXdzpndkXHaKpeDvx09k86rNxiD0jwy30dtF5_Yq5IZWOy5hG',
    inStock: true,
  },
  {
    id: 6,
    title: 'Shadow Master X',
    category: 'Paleta de Control',
    price: 425.00,
    oldPrice: 500.00,
    badge: '15% OFF',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7fZlU74dofDzZEurUTUK9OF8JaJo8fS5421Tp3C7x7IQ4zi9_70UUTtEgKbV9m8YvMrtsukuL4zzJUdw18Miad9t4m94bRjBDoU9qIXMFK6ATuD2-AF0YMhK6sf5sf6QwfrvZOtftmAU9H8HP38E89MW82FkMzXCekgIPtKJn4uD5CBCmdAPV6BCIcWZ5RTF1xblnWIoytdma7xbhoPNXTBOHYY-1o1ejKfUUGjX0qIhB5d_pzlYYXZaYZuojZLYCJ8EF21TGSMTC',
    inStock: true,
  },
];

export const CatalogPage = () => {
  const [activeCategory, setActiveCategory] = useState('paletas');
  const [sortOrder, setSortOrder] = useState('default');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [visibleCount, setVisibleCount] = useState(6);

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...mockProducts];

    // Filter by price
    result = result.filter(
      (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sort
    if (sortOrder === 'asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'desc') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [sortOrder, priceRange]);

  const displayedProducts = useMemo(() => {
    return filteredAndSortedProducts.slice(0, visibleCount);
  }, [filteredAndSortedProducts, visibleCount]);

  const loadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Secondary Category NavBar */}
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
              onClick={() => setActiveCategory(cat.id)}
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
                '&:hover': {
                  color: 'primary.light',
                },
              }}
            >
              {cat.label}
            </Box>
          );
        })}
      </Box>

      {/* Main Content Layout */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
          flex: 1,
          px: { xs: 2, md: 6 },
          py: 4,
          gap: 4,
          position: 'relative',
        }}
      >
        {/* Sidebar Filter - Left Column (Visible ONLY on desktop) */}
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

          {/* Sort Order */}
          <Box sx={{ py: 2.5, borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
                fontWeight: 700,
                letterSpacing: '0.1em',
                display: 'block',
                mb: 2,
              }}
            >
              ORDENAR POR PRECIO
            </Typography>
            <FormControl component="fieldset">
              <RadioGroup value={sortOrder} onChange={handleSortChange}>
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

          {/* Price Filter */}
          <Box sx={{ py: 2.5, borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
                fontWeight: 700,
                letterSpacing: '0.1em',
                display: 'block',
                mb: 2,
              }}
            >
              RANGO DE PRECIO (USD)
            </Typography>
            <Slider
              value={priceRange}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              min={0}
              max={500}
              sx={{
                color: 'primary.main',
                '& .MuiSlider-thumb': {
                  bgcolor: 'primary.light',
                },
                '& .MuiSlider-track': {
                  bgcolor: 'primary.main',
                },
                '& .MuiSlider-rail': {
                  color: 'rgba(255,255,255,0.1)',
                },
              }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                ${priceRange[0]}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                ${priceRange[1]}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Main Content Area - Right Column */}
        <Box component="main" sx={{ flexGrow: 1 }}>
          {/* Header Info */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h1"
              sx={{
                fontWeight: 800,
                fontSize: { xs: '32px', md: '40px' },
                letterSpacing: '-0.02em',
                mb: 1,
                color: 'text.primary',
              }}
            >
              Elite Paletas
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              Equipamiento de alto rendimiento para jugadores exigentes.
            </Typography>
          </Box>

          {/* Sleek Horizontal Filter Bar (Visible ONLY on mobile/tablet) */}
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
            {/* Sort */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700, letterSpacing: '0.05em' }}>
                ORDENAR POR PRECIO
              </Typography>
              <RadioGroup row value={sortOrder} onChange={handleSortChange} sx={{ gap: 1 }}>
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

            {/* Price Slider */}
            <Box sx={{ minWidth: '200px', display: 'flex', flexDirection: 'column', gap: 0.5, flexGrow: { xs: 1, sm: 0 } }}>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700, letterSpacing: '0.05em' }}>
                RANGO DE PRECIO (${priceRange[0]} - ${priceRange[1]} USD)
              </Typography>
              <Slider
                value={priceRange}
                onChange={handlePriceChange}
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

          {/* Product Grid */}
          {displayedProducts.length === 0 ? (
            <Box sx={{ py: 8, textAlign: 'center' }}>
              <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                No se encontraron paletas en este rango de precios.
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => {
                  setPriceRange([0, 500]);
                  setSortOrder('default');
                }}
                sx={{ textTransform: 'none', fontWeight: 600 }}
              >
                Restablecer filtros
              </Button>
            </Box>
          ) : (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(3, 1fr)',
                },
                gap: 3,
              }}
            >
              {displayedProducts.map((product) => (
                <Box
                  key={product.id}
                  sx={{
                    bgcolor: 'background.paper',
                    borderRadius: 3,
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    overflow: 'hidden',
                    position: 'relative',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 24px rgba(0, 102, 255, 0.2)',
                      borderColor: 'rgba(0, 102, 255, 0.2)',
                      '& .product-img': { transform: 'scale(1.06)' },
                      '& .floating-cart-btn': { opacity: 1, transform: 'translateY(0)' },
                    },
                  }}
                >
                  {/* Image Area */}
                  <Box
                    sx={{
                      position: 'relative',
                      aspectRatio: '1/1',
                      bgcolor: '#19171e',
                      overflow: 'hidden',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Box
                      component="img"
                      src={product.img}
                      alt={product.title}
                      className="product-img"
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.6s ease',
                      }}
                    />

                    {/* Sale Tag */}
                    {product.badge && (
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 16,
                          left: 16,
                          bgcolor: 'success.main',
                          color: 'success.contrastText',
                          fontWeight: 700,
                          fontSize: '11px',
                          px: 1.5,
                          py: 0.5,
                          borderRadius: '99px',
                          letterSpacing: '0.05em',
                        }}
                      >
                        {product.badge}
                      </Box>
                    )}

                    {/* Floating Add to Cart Button */}
                    <IconButton
                      className="floating-cart-btn"
                      sx={{
                        position: 'absolute',
                        bottom: 16,
                        right: 16,
                        bgcolor: 'primary.main',
                        color: 'primary.contrastText',
                        p: 1.5,
                        opacity: 0,
                        transform: 'translateY(12px)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          bgcolor: 'primary.light',
                        },
                      }}
                    >
                      <AddShoppingCartIcon fontSize="small" />
                    </IconButton>
                  </Box>

                  {/* Content Area */}
                  <Box sx={{ p: 2.5 }}>
                    {/* Row 1: Title & Stock */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1, gap: 1 }}>
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: 700,
                          color: 'text.primary',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          fontSize: '16px',
                        }}
                      >
                        {product.title}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexShrink: 0 }}>
                        <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'success.main' }} />
                        <Typography variant="caption" sx={{ color: 'success.main', fontWeight: 600, fontSize: '11px' }}>
                          Stock disponible
                        </Typography>
                      </Box>
                    </Box>

                    {/* Row 2: Price */}
                    <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.5 }}>
                      <Typography variant="h5" sx={{ fontWeight: 800, color: 'primary.main', fontSize: '20px' }}>
                        ${product.price.toFixed(2)}
                      </Typography>
                      {product.oldPrice && (
                        <Typography variant="body2" sx={{ color: 'text.secondary', textDecoration: 'line-through', fontSize: '12px' }}>
                          ${product.oldPrice.toFixed(2)}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          )}

          {/* Load More Section */}
          {filteredAndSortedProducts.length > displayedProducts.length && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
              <Button
                variant="outlined"
                onClick={loadMore}
                sx={{
                  color: 'primary.light',
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                  px: 4,
                  py: 1.5,
                  fontWeight: 700,
                  fontSize: '14px',
                  borderRadius: 2,
                  '&:hover': {
                    borderColor: 'primary.main',
                    bgcolor: 'rgba(0, 102, 255, 0.05)',
                  },
                }}
              >
                Cargar más productos
              </Button>
            </Box>
          )}
        </Box>
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
};
