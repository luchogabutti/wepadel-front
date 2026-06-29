export const PLACEHOLDER_IMG = 'https://placehold.co/400x400?text=WePadel';

const EXT_MIME = {
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  webp: 'image/webp',
  gif: 'image/gif',
};

export const imagenToDataUrl = (imagen) => {
  if (!imagen?.archivoBase64) return null;
  const ext = imagen.nombre?.split('.').pop()?.toLowerCase();
  const mime = EXT_MIME[ext] || 'image/jpeg';
  return `data:${mime};base64,${imagen.archivoBase64}`;
};

export const mapProducto = (producto, imagenes = []) => {
  const primary = imagenes[0];
  const url = primary ? imagenToDataUrl(primary) : null;

  return {
    ...producto,
    imagenId: primary?.id ?? null,
    imagen: url || PLACEHOLDER_IMG,
    imagenes: url ? [url] : [],
  };
};
