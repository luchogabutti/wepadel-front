import { useNavigate } from 'react-router-dom';
import { categories } from '../../../data/categoriesData';
import './styles.scss';

export const CategoryTabs = ({ activeCategory }) => {
  const navigate = useNavigate();

  const handleTabClick = (categoryId) => {
    if (categoryId === 'paletas') {
      navigate('/catalogo');
    } else {
      navigate(`/catalogo/${categoryId}`);
    }
  }

  return (
    <nav className="category-tabs">
      {categories.map((cat) => {
        const isActive = activeCategory === cat.id;
        return (
          <button
            key={cat.id}
            className={`tab${isActive ? ' active' : ''}`}
            onClick={() => handleTabClick(cat.id)}
          >
            {cat.label}
          </button>
        );
      })}
    </nav>
  );
};
