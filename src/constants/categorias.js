/** Espejo del CategoriaEnum del backend (com.uade.tpo.wepadel.entity.CategoriaEnum) */
export const CATEGORIA_ENUM = Object.freeze(['PALETAS', 'ACCESORIOS', 'PELOTAS']);

export const categoriaToSlug = (categoria) => (categoria ?? '').toLowerCase();

export const slugToCategoriaEnum = (slug) => {
  const value = (slug ?? 'paletas').toUpperCase();
  return CATEGORIA_ENUM.includes(value) ? value : CATEGORIA_ENUM[0];
};

export const getCatalogPath = (slugOrEnum) => `/catalogo/${categoriaToSlug(slugOrEnum)}`;

export const DEFAULT_CATEGORIA_SLUG = categoriaToSlug(CATEGORIA_ENUM[0]);

/** Tabs y rutas del catálogo: solo metadata derivada del enum */
export const getCategoriasFromEnum = () =>
  CATEGORIA_ENUM.map((backendValue) => ({
    id: categoriaToSlug(backendValue),
    label: backendValue,
    backendValue,
    path: getCatalogPath(backendValue),
  }));

export const CATEGORIAS = getCategoriasFromEnum();

export const getCategoriaBySlug = (slug) => CATEGORIAS.find((cat) => cat.id === slug);

const productosHabilitados = (products) =>
  products.filter((producto) => producto.estaHabilitado !== false);

/** Cards de la home: enum + primer producto habilitado con imagen de cada categoría */
export const buildCategoriasParaHome = (products) => {
  const habilitados = productosHabilitados(products);

  return CATEGORIA_ENUM.map((backendValue) => {
    const deCategoria = habilitados.filter(
      (producto) => producto.categoria?.toUpperCase() === backendValue
    );
    if (deCategoria.length === 0) return null;

    const cover = deCategoria.find((producto) => producto.imagen)?.imagen ?? null;

    return {
      id: categoriaToSlug(backendValue),
      label: backendValue,
      path: getCatalogPath(backendValue),
      cover,
    };
  }).filter(Boolean);
};

/** Imagen de portada de una categoría desde productos del API */
export const getCategoriaCoverFromProducts = (products, backendValue) => {
  const producto = productosHabilitados(products).find(
    (item) => item.categoria?.toUpperCase() === backendValue && item.imagen
  );
  return producto?.imagen ?? null;
};
