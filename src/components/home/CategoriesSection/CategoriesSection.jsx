import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { buildCategoriasParaHome } from '../../../constants/categorias';
import { useProducts } from '../../../context/ProductsContext';
import { LoadingState } from '../../../components/general/LoadingState/LoadingState';
import './styles.scss';

export const CategoriesSection = () => {
  const { products, loading, error } = useProducts();

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

  const categorias = buildCategoriasParaHome(products);

  if (categorias.length === 0) {
    return null;
  }

  return (
    <section className="categories-section">
      <Typography variant="h4" className="section-title">
        Explora por Categoría
      </Typography>

      <div className="categories-grid">
        {categorias.map((cat) => (
          <Link
            key={cat.id}
            to={cat.path}
            className={`category-card${cat.cover ? '' : ' category-card--no-image'}`}
          >
            {cat.cover && (
              <img src={cat.cover} alt={cat.label} className="cat-image" />
            )}
            <div className="cat-overlay" />
            <div className="cat-content">
              <Typography variant="h5" className="cat-title">
                {cat.label}
              </Typography>
              <Typography className="cat-text" variant="button">
                DESCUBRIR
              </Typography>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
