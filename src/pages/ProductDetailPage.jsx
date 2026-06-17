import { Typography, Button, CircularProgress } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { CenteredPage } from '../components/layout/CenteredPage';
import { ProductDetail } from '../components/catalog/ProductDetail/ProductDetail';
import { useProducts } from '../context/ProductsContext';
import './styles.scss';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const productId = parseInt(id, 10);
  const { products, loading } = useProducts();

  const product =
    products.find((p) => p.id === productId && p.estaHabilitado !== false) ?? null;

  if (loading) {
    return (
      <CenteredPage>
        <CircularProgress color="primary" />
      </CenteredPage>
    );
  }

  if (!product) {
    return (
      <CenteredPage>
        <div className="product-not-found">
          <Typography variant="h3" component="h1" className="product-not-found__title">
            Producto no encontrado
          </Typography>
          <Typography variant="body1" color="text.secondary" className="product-not-found__message">
            Lo sentimos, el producto que estás buscando no existe o ha sido retirado de nuestra tienda.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component={RouterLink}
            to="/catalogo"
            startIcon={<ArrowBackIcon />}
            className="product-not-found__btn"
          >
            Volver al catálogo
          </Button>
        </div>
      </CenteredPage>
    );
  }

  return <ProductDetail key={product.id} product={product} />;
};
