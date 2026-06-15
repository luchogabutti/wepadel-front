import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputBase, Paper, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { getProducts } from '../../../../services/productsService';

export const ProductSearch = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data.filter((p) => p.estaHabilitado !== false));
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        // TODO: add toast of error
      });
  }, []);

  const normalizedQuery = query.trim().toLowerCase();
  const results = normalizedQuery
    ? products
        .filter(
          (product) =>
            (product.nombre || product.descripcion || '')
              .toLowerCase()
              .includes(normalizedQuery) ||
            (product.categoria || '').toLowerCase().includes(normalizedQuery)
        )
        .slice(0, 8)
    : [];

  const handleSelect = (productId) => {
    setQuery('');
    setIsOpen(false);
    navigate(`/producto/${productId}`);
  };

  return (
    <div className="search-container product-search">
      <div className="search-box">
        <SearchIcon className="search-box__icon" />
        <InputBase
          placeholder="Buscar productos..."
          className="search-input"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 150)}
          inputProps={{ 'aria-label': 'Buscar productos' }}
        />
      </div>

      {isOpen && query.trim() && (
        <Paper className="product-search-dropdown" elevation={8}>
          {results.length === 0 ? (
            <Typography variant="body2" className="product-search-empty">
              Sin resultados
            </Typography>
          ) : (
            results.map((product) => (
              <button
                key={product.id}
                type="button"
                className="product-search-option"
                onMouseDown={() => handleSelect(product.id)}
              >
                <img
                  src={product.imagen || 'https://placehold.co/400x400?text=WePadel'} // TODO: agregar data en backend/revisar — campo `imagen`
                  alt=""
                />
                <span>{product.nombre || product.descripcion}</span>
              </button>
            ))
          )}
        </Paper>
      )}
    </div>
  );
};
