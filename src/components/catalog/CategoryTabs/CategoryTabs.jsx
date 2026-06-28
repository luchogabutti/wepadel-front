import { useNavigate } from 'react-router-dom';
import { CATEGORIAS } from '../../../constants/categorias';
import './styles.scss';

export const CategoryTabs = ({ activeCategory }) => {
  const navigate = useNavigate();

  const handleTabClick = (path) => {
    navigate(path);
  };

  return (
    <nav className="category-tabs">
      {CATEGORIAS.map((cat) => {
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
