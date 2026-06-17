export const PLACEHOLDER_IMG = 'https://placehold.co/400x400?text=WePadel';

const EXT_MIME = {
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  webp: 'image/webp',
  gif: 'image/gif',
};

const toDataUrl = (imagen) => {
  if (!imagen?.archivoBase64) return null;
  const ext = imagen.nombre?.split('.').pop()?.toLowerCase();
  const mime = EXT_MIME[ext] || 'image/jpeg';
  return `data:${mime};base64,${imagen.archivoBase64}`;
};

export const mapProducto = (producto, imagenes = []) => {
  const urls = imagenes.map(toDataUrl).filter(Boolean);

  return {
    ...producto,
    imagen: urls[0] || PLACEHOLDER_IMG,
    imagenes: urls,
  };
};
