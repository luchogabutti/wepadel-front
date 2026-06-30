import { Typography, Button } from '@mui/material';
import { LoadingState } from '../components/general/LoadingState/LoadingState';
import { ApiErrorState } from '../components/general/ApiErrorState/ApiErrorState';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { CenteredPage } from '../components/layout/CenteredPage';
import { ProductDetail } from '../components/catalog/ProductDetail/ProductDetail';
import { useProducts } from '../context/ProductsContext';
import { useSelector } from 'react-redux';
import { getDefaultCatalogPath } from '../Redux/categoriesSlice';
import './styles.scss';

export const ProductDetailView = () => {
  const { id } = useParams();
  const productId = parseInt(id, 10);
  const { products, loading, error, refresh } = useProducts();
  const categorias = useSelector((state) => state.categories.items);
  const defaultCatalogPath = getDefaultCatalogPath(categorias);

  const product =
    products.find((p) => p.id === productId && p.estaHabilitado !== false) ?? null;

  if (loading) {
    return (
      <CenteredPage>
        <LoadingState message="Cargando producto..." />
      </CenteredPage>
    );
  }

  if (error) {
    return (
      <CenteredPage>
        <ApiErrorState
          error={error}
          fallback="No se pudo cargar la información del producto."
          onRetry={refresh}
        />
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
            to={defaultCatalogPath}
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
