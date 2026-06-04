import { useEffect, useState } from 'react';
import { Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { heroSlides, HERO_SLIDE_INTERVAL_MS } from '../../../data/heroSlides';
import './styles.scss';

export const HeroSection = () => {
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (heroSlides.length <= 1) return undefined;

    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, HERO_SLIDE_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="hero-section">
      <div className="hero-background" aria-hidden="true">
        {heroSlides.map((slide, index) => (
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
            sx={{ px: 4, py: 2, fontWeight: 'bold' }}
            onClick={() => navigate('/catalogo')}
          >
            Ver catálogo
          </Button>
          <Button
            variant="outlined"
            sx={{
              px: 4,
              py: 2,
              fontWeight: 'bold',
              color: 'primary.light',
              borderColor: 'primary.light',
            }}
            onClick={() => navigate('/login')}
          >
            Iniciar sesión
          </Button>
        </div>
      </div>
    </section>
  );
};
