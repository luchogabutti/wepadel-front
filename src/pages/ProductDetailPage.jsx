import { useParams } from 'react-router-dom';
import { Box, Container, Button, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link as RouterLink } from 'react-router-dom';
import { ProductDetail } from '../components/catalog/ProductDetail/ProductDetail';
import { allProducts } from '../data/productsData';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const productId = parseInt(id, 10);

  // Find the product by ID
  const product = allProducts.find((p) => p.id === productId);

  if (!product) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
        <Container maxWidth="md" sx={{ flexGrow: 1, py: 12, textAlign: 'center' }}>
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, color: 'text.primary' }}>
            Producto no encontrado
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
            Lo sentimos, el producto que estás buscando no existe o ha sido retirado de nuestra tienda.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component={RouterLink}
            to="/catalogo"
            startIcon={<ArrowBackIcon />}
            sx={{ fontWeight: 'bold', textTransform: 'none', px: 4, py: 1.5 }}
          >
            Volver al catálogo
          </Button>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
      <Box sx={{ flexGrow: 1 }}>
        <ProductDetail product={product} />
      </Box>
    </Box>
  );
};
