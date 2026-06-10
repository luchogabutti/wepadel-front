import { useMemo, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PageContainer } from '../components/layout/PageContainer';
import { PageHeader } from '../components/layout/PageHeader';
import { CategoryTabs } from '../components/catalog/CategoryTabs/CategoryTabs';
import { ProductGrid } from '../components/catalog/ProductGrid/ProductGrid';
import { categories } from '../data/categoriesData';
import { allProducts } from '../data/productsData';

export const CatalogPage = () => {
  const { categoria } = useParams();
  const activeCategory = categoria ?? 'paletas';

  const [products, setProducts] = useState([]);

  const title = categories.find((cat) => cat.id === activeCategory)?.label;

  const categoryProducts = useMemo(
    () => allProducts.filter((p) => p.categoryId === activeCategory),
    [activeCategory]
  );

  useEffect(() => {
    fetch(`http://localhost:8080/productos`)
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, [activeCategory]);

  console.log('Fetched products:', products);

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
