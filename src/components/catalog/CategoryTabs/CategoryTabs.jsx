import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './styles.scss';

export const CategoryTabs = ({ activeCategory }) => {
  const navigate = useNavigate();
  const categorias = useSelector((state) => state.categories.items);
  const loading = useSelector((state) => state.categories.loading);

  if (loading || categorias.length === 0) {
    return null;
  }

  const handleTabClick = (path) => {
    navigate(path);
  };

  return (
    <nav className="category-tabs">
      {categorias.map((cat) => {
        const isActive = activeCategory === cat.id;
        return (
          <button
            key={cat.id}
            className={`tab${isActive ? ' active' : ''}`}
            onClick={() => handleTabClick(cat.path)}
          >
            {cat.label}
          </button>
        );
      })}
    </nav>
  );
};
