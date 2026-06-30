import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LoadingState } from '../../../components/general/LoadingState/LoadingState';
import './styles.scss';

export const CategoriesSection = () => {
  const categorias = useSelector((state) => state.categories.items);
  const loading = useSelector((state) => state.categories.loading);
  const error = useSelector((state) => state.categories.error);

  if (loading) {
    return (
      <section className="categories-section">
        <LoadingState message="Cargando categorías..." />
      </section>
    );
  }

  if (error) {
    return null;
  }

  if (categorias.length === 0) {
    return null;
  }

  return (
    <section className="categories-section">
      <Typography variant="h4" className="section-title">
        Explora por Categoría
      </Typography>

      <div className="categories-grid">
        {categorias.map((cat) => {
          const IconComponent = cat.icon;

          return (
            <Link
              key={cat.id}
              to={cat.path}
              className={`category-card${cat.img ? '' : ' category-card--no-image'}`}
            >
              {cat.img && (
                <img src={cat.img} alt={cat.label} className="cat-image" />
              )}
              <div className="cat-overlay" />
              <div className="cat-content">
                <IconComponent className="cat-icon" />
                <Typography variant="h5" className="cat-title">
                  {cat.label}
                </Typography>
                <Typography className="cat-text" variant="button">
                  DESCUBRIR
                </Typography>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
