export const getProducts = async () => {
  const response = await fetch('http://localhost:8080/productos');

  if (!response.ok) {
    throw new Error(`Error al obtener productos (${response.status})`);
  }

  return response.json();
};
