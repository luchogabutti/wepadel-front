import { useMemo, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PageContainer } from '../components/layout/PageContainer';
import { PageHeader } from '../components/layout/PageHeader';
import { CategoryTabs } from '../components/catalog/CategoryTabs/CategoryTabs';
import { ProductGrid } from '../components/catalog/ProductGrid/ProductGrid';
import { categories } from '../data/categoriesData';
import { getProducts } from '../services/productsService';

export const CatalogPage = () => {
  const { categoria } = useParams();
  const activeCategory = categoria ?? 'paletas';

  const [products, setProducts] = useState([]);

  const title = categories.find((cat) => cat.id === activeCategory)?.label;

  const categoryProducts = useMemo(
    () =>
      products.filter(
        (p) =>
          p.estaHabilitado !== false &&
          p.categoria?.toLowerCase() === activeCategory
      ),
    [activeCategory, products]
  );

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data.filter((p) => p.estaHabilitado !== false));
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  return (
    <>
      <CategoryTabs activeCategory={activeCategory} />
      <PageContainer>
        <PageHeader
          title={title}
          subtitle="Equipamiento de alto rendimiento para jugadores exigentes."
        />
        <ProductGrid products={categoryProducts} activeCategory={activeCategory} />
      </PageContainer>
    </>
  );
};
