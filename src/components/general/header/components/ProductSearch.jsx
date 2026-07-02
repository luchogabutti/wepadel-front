import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputBase, Paper, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useSelector } from 'react-redux';
import { getProductImageUrl } from '../../../../utils/products';

export const ProductSearch = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const products = useSelector((state) => state.products.items);

  const normalizedQuery = query.trim().toLowerCase();
  const results = normalizedQuery
    ? products
        .filter(
          (product) =>
            product.estaHabilitado !== false &&
            ((product.nombre || '')
              .toLowerCase()
              .includes(normalizedQuery) ||
              (product.categoria || '').toLowerCase().includes(normalizedQuery))
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
                <img src={getProductImageUrl(product)} alt="" />
                <span>{product.nombre}</span>
              </button>
            ))
          )}
        </Paper>
      )}
    </div>
  );
};
