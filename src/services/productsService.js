export const getProducts = async () => {
  try {
    const response = await fetch('http://localhost:8080/productos');
    return response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};
