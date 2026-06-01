import { useState } from 'react';
import { Typography, Button, IconButton, Rating, Breadcrumbs, Link as MuiLink } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';
import './styles.scss';

export const ProductDetail = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImg, setSelectedImg] = useState(product?.img || '');
  const navigate = useNavigate();
  const { addItem } = useCart();

  if (!product) {
    return (
      <div className="product-detail-empty">
        <Typography variant="h5">Producto no encontrado</Typography>
        <Button variant="contained" component={RouterLink} to="/catalogo" sx={{ mt: 2 }}>
          Volver al catálogo
        </Button>
      </div>
    );
  }

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };


  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  // Generate mock specifications based on category
  const getSpecs = (categoryId) => {
    switch (categoryId) {
      case 'paletas':
        return [
          { name: 'Forma', value: product.title.includes('Control') ? 'Redonda' : 'Lágrima / Diamante' },
          { name: 'Balance', value: product.title.includes('Control') ? 'Bajo' : 'Medio-Alto' },
          { name: 'Núcleo', value: 'Goma EVA Soft Premium' },
          { name: 'Caras', value: 'Carbono 12K de alta resistencia' },
          { name: 'Peso', value: '360g - 375g' }
        ];
      case 'pelotas':
        return [
          { name: 'Tipo', value: 'Presurizada de alta velocidad' },
          { name: 'Núcleo', value: 'Caucho natural reforzado' },
          { name: 'Fieltro', value: 'Lana natural y nylon sintético' },
          { name: 'Presión', value: 'Alta duración y rebote óptimo' },
          { name: 'Cantidad', value: 'Tubo de 3 bolas' }
        ];
      case 'accesorios':
      default:
        return [
          { name: 'Material', value: 'Poliéster técnico transpirable' },
          { name: 'Medidas', value: 'Ajuste elástico adaptable' },
          { name: 'Uso recomendado', value: 'Entrenamiento y alta competencia' },
          { name: 'Detalle', value: 'Logo reflectante WePadel' }
        ];
    }
  };

  const specifications = getSpecs(product.categoryId);

  // Generate fallback description
  const fallbackDesc = product.description || `La línea WePadel ${product.title} representa la cúspide del equipamiento deportivo para pádel de alto rendimiento. Diseñada meticulosamente en fibra de carbono y con tecnologías avanzadas de amortiguación de impacto, ofrece a los jugadores exigentes la máxima precisión y velocidad en cada golpe. Probada bajo estándares de competencia profesional.`;

  return (
    <div className="product-detail-container">
      {/* Back button and Breadcrumbs */}
      <div className="detail-navigation">
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={() => navigate(-1)}
          className="back-btn"
          sx={{ textTransform: 'none', fontWeight: 600, color: 'text.secondary' }}
        >
          Volver
        </Button>
        <Breadcrumbs aria-label="breadcrumb" className="detail-breadcrumbs">
          <MuiLink component={RouterLink} to="/" color="inherit" underline="hover">
            Inicio
          </MuiLink>
          <MuiLink component={RouterLink} to={`/catalogo/${product.categoryId || ''}`} color="inherit" underline="hover">
            {product.categoryId ? product.categoryId.toUpperCase() : 'Catálogo'}
          </MuiLink>
          <Typography color="text.primary">{product.title}</Typography>
        </Breadcrumbs>
      </div>

      <div className="detail-layout">
        {/* Left: Image Gallery */}
        <div className="detail-gallery">
          <div className="main-image-wrapper">
            <img src={selectedImg || product.img} alt={product.title} className="main-image" />
            {product.badge && <span className="detail-badge">{product.badge}</span>}
          </div>
          {/* Thumbnail preview list (mock gallery) */}
          <div className="thumbnail-list">
            <button 
              className={`thumb-btn ${selectedImg === product.img ? 'active' : ''}`}
              onClick={() => setSelectedImg(product.img)}
            >
              <img src={product.img} alt="Thumbnail 1" />
            </button>
            <button 
              className={`thumb-btn ${selectedImg === product.img + '_alt1' ? 'active' : ''}`}
              onClick={() => setSelectedImg(product.img)}
            >
              <img src={product.img} alt="Thumbnail 2" style={{ filter: 'hue-rotate(45deg)' }} />
            </button>
            <button 
              className={`thumb-btn ${selectedImg === product.img + '_alt2' ? 'active' : ''}`}
              onClick={() => setSelectedImg(product.img)}
            >
              <img src={product.img} alt="Thumbnail 3" style={{ filter: 'hue-rotate(-45deg)' }} />
            </button>
          </div>
        </div>

        {/* Right: Product Info & Actions */}
        <div className="detail-info">
          <span className="product-category-label">
            {product.category || (product.categoryId ? product.categoryId.toUpperCase() : 'WEPADEL ELITE')}
          </span>

          <Typography variant="h1" className="product-title">
            {product.title}
          </Typography>

          <div className="rating-row">
            <Rating name="read-only" value={4.8} precision={0.1} readOnly size="small" />
            <Typography variant="body2" className="rating-count">
              4.8 (42 valoraciones de clientes)
            </Typography>
          </div>

          <div className="price-row">
            <Typography variant="h2" className="current-price">
              {typeof product.price === 'number' ? `$${product.price.toFixed(2)}` : product.price}
            </Typography>
            {product.oldPrice && (
              <Typography variant="body1" className="old-price">
                {typeof product.oldPrice === 'number' ? `$${product.oldPrice.toFixed(2)}` : product.oldPrice}
              </Typography>
            )}
          </div>

          <div className="stock-row">
            <span className={`stock-badge ${product.inStock !== false ? 'in-stock' : 'out-of-stock'}`}>
              {product.inStock !== false ? 'Stock disponible' : 'Sin stock'}
            </span>
          </div>

          <Typography variant="body1" className="product-description">
            {fallbackDesc}
          </Typography>

          {/* Technical Specifications */}
          <div className="specs-section">
            <Typography variant="h6" className="specs-title">
              Especificaciones Técnicas
            </Typography>
            <div className="specs-grid">
              {specifications.map((spec, i) => (
                <div key={i} className="spec-item">
                  <span className="spec-name">{spec.name}</span>
                  <span className="spec-value">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions: Quantity Selector & Add to Cart */}
          <div className="purchase-actions">
            <div className="quantity-selector">
              <IconButton onClick={handleDecrease} className="qty-btn" disabled={product.inStock === false}>
                <RemoveIcon fontSize="small" />
              </IconButton>
              <span className="qty-value">{quantity}</span>
              <IconButton onClick={handleIncrease} className="qty-btn" disabled={product.inStock === false}>
                <AddIcon fontSize="small" />
              </IconButton>
            </div>
            
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<AddShoppingCartIcon />}
              className="add-to-cart-btn"
              disabled={product.inStock === false}
              onClick={handleAddToCart}
              sx={{ fontWeight: 'bold', textTransform: 'none' }}
            >
              Agregar al carrito
            </Button>
          </div>

          {/* Guarantee & Shipping Highlights */}
          <div className="highlights-section">
            <div className="highlight-item">
              <LocalShippingIcon className="highlight-icon" />
              <div className="highlight-text">
                <Typography variant="body2" sx={{ fontWeight: 700 }}>Envío gratis a todo el país</Typography>
                <Typography variant="caption" color="text.secondary">Recíbelo en 48hs en tu domicilio</Typography>
              </div>
            </div>
            <div className="highlight-item">
              <CreditCardIcon className="highlight-icon" />
              <div className="highlight-text">
                <Typography variant="body2" sx={{ fontWeight: 700 }}>Hasta 12 cuotas sin interés</Typography>
                <Typography variant="caption" color="text.secondary">Aceptamos todas las tarjetas de crédito</Typography>
              </div>
            </div>
            <div className="highlight-item">
              <VerifiedUserIcon className="highlight-icon" />
              <div className="highlight-text">
                <Typography variant="body2" sx={{ fontWeight: 700 }}>Garantía Oficial WePadel</Typography>
                <Typography variant="caption" color="text.secondary">Compra 100% segura directa de fábrica</Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
