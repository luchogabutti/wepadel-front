import { Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './styles.scss';

export const HeroSection = () => {
  const navigate = useNavigate();

  const handleSeeCatalog = () => {
    navigate('/catalogo');
  };

  return (
    <section className="hero-section">
      <div className="hero-background">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkpV-sAwDj0oBQJZ8X4mNOhR83zaLbVnI-sI5e2WidNmiV8VlWXxY6gQ-SwrcNu95WqvqhwfQPM42S4ExmfLmoiocD6T9_UP2HY2LOpfEsSLftBe_MVc5t7eSWd6EhYjKIEmZY5Frc6Gm5D1iBzYHvO5ESlTcg6uut1bXSSfNLD0wHIIlnrJssQFIHyivG-rxc0kY4j9p3f8f7v-zhcPSh8iomyNIqtaHl7y4VwWHcad7LP1a24L1vuocUVshz8HOxuYh9Ndre-JIA"
          alt="WePadel Hero"
          className="bg-img"
        />
        <div className="bg-overlay" />
      </div>
      
      <div className="hero-content">
        <Typography
          variant="overline"
          className="hero-subtitle"
        >
          Elite Performance
        </Typography>
        
        <Typography
          variant="h1"
          className="hero-title"
        >
          DOMINA LA PISTA CON{' '}
          <span className="brand-highlight">WEPADEL</span>
        </Typography>
        
        <Typography
          variant="body1"
          className="hero-description"
        >
          Equipamiento técnico diseñado para jugadores que buscan la máxima potencia y control en cada
          golpe. Tecnología de fibra de carbono de última generación.
        </Typography>
        
        <div className="hero-actions">
          <Button 
            variant="contained" 
            color="primary" 
            sx={{ px: 4, py: 2, fontWeight: 'bold' }} 
            onClick={handleSeeCatalog}
          >
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
        </div>
      </div>
    </section>
  );
};
