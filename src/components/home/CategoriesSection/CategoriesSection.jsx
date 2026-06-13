import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { categories } from '../../../data/categoriesData';
import './styles.scss';

export const CategoriesSection = () => {
  return (
    <section className="categories-section">
      <Typography variant="h4" className="section-title">
        Explora por Categoría
      </Typography>

      <div className="categories-grid">
        {categories.map((cat) => {
          const IconComponent = cat.icon;

          return (
            <Link
              key={cat.id}
              to={cat.path}
              className="category-card"
            >
              <img
                src={cat.img}
                alt={cat.label}
                className="cat-image"
              />
              <div className="cat-overlay" />
              <div className="cat-content">
                <IconComponent className="cat-icon" />
                <Typography variant="h5" className="cat-title">
                  {cat.label}
                </Typography>
                <Typography
                  className="cat-text"
                  variant="button"
                >
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
