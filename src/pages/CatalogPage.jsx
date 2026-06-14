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
    () => products.filter((p) => p.categoria === activeCategory.toLowerCase()),
    [activeCategory, products]
  );

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
        //add toast of success
      } catch (error) {
        //add toast of error
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

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
