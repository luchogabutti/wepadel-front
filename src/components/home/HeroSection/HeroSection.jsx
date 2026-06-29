import { useEffect, useMemo, useState } from 'react';
import { Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { HERO_SLIDES, HERO_SLIDE_INTERVAL_MS } from '../../../config/heroSlides';
import { useCategorias } from '../../../context/CategoriesContext';
import { useAuth } from '../../../context/AuthContext';
import './styles.scss';

export const HeroSection = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { categorias, defaultCatalogPath } = useCategorias();
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = useMemo(() => {
    const list = [...HERO_SLIDES];
    const paletas = categorias.find((cat) => cat.id === 'paletas');
    const paletasImg = paletas?.img;

    if (paletasImg) {
      list.push({
        src: paletasImg,
        alt: 'PALETAS',
        position: 'center center',
      });
    }

    return list;
  }, [categorias]);

  useEffect(() => {
    setActiveSlide(0);
  }, [slides.length]);

  useEffect(() => {
    if (slides.length <= 1) return undefined;

    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, HERO_SLIDE_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="hero-section">
      <div className="hero-background" aria-hidden="true">
        {slides.map((slide, index) => (
          <img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            className={`bg-img ${index === activeSlide ? 'bg-img--active' : ''}`}
            style={{ objectPosition: slide.position }}
            loading={index === 0 ? 'eager' : 'lazy'}
            decoding="async"
          />
        ))}
        <div className="bg-overlay" />
      </div>

      <div className="hero-content">
        <Typography variant="overline" className="hero-subtitle">
          Elite Performance
        </Typography>

        <Typography variant="h1" className="hero-title">
          DOMINA LA PISTA CON <span className="brand-highlight">WEPADEL</span>
        </Typography>

        <Typography variant="body1" className="hero-description">
          Equipamiento técnico diseñado para jugadores que buscan la máxima potencia y control en cada
          golpe. Tecnología de fibra de carbono de última generación.
        </Typography>

        <div className="hero-actions">
          <Button
            variant="contained"
            color="primary"
            sx={{ px: 4, py: 2 }}
            onClick={() => navigate(defaultCatalogPath)}
          >
            Ver catálogo
          </Button>
          {!isAuthenticated && (
            <Button
              variant="outlined"
              sx={{
                px: 4,
                py: 2,
              }}
              onClick={() => navigate('/login')}
            >
              Iniciar sesión
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};
