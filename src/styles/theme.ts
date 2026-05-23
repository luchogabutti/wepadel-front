/**
 * Paleta de colores de marca, fondos, texto y estados semánticos (error, acciones).
 */
export const colors = {
  primary: '#0066FF',
  secondary: '#141C24',
  tertiary: '#00CC99',
  background: '#0C0B12',
  textPrimary: '#FFFFFF',
  textSecondary: '#A0AEC0',
  error: '#FF4444',
};

/**
 * Escala tipográfica con la familia Outfit y roles jerárquicos (títulos, cuerpo, etiquetas).
 */
export const typography = {
  fontFamily: 'Outfit',
  headline: {
    fontWeight: { min: 700, max: 800 },
    fontSize: { min: 28, max: 48 },
  },
  subheading: {
    fontWeight: { min: 600, max: 600 },
    fontSize: { min: 18, max: 24 },
  },
  body: {
    fontWeight: { min: 400, max: 400 },
    fontSize: { min: 14, max: 16 },
  },
  label: {
    fontWeight: { min: 500, max: 500 },
    fontSize: { min: 11, max: 13 },
  },
};

/**
 * Radios de borde para botones, tarjetas, inputs y contenedores redondeados.
 */
const borderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

/**
 * Sombras de elevación para capas superpuestas (tarjetas, modales, elementos flotantes).
 */
const shadows = {
  sm: '0 1px 2px rgba(0, 0, 0, 0.4)',
  md: '0 4px 12px rgba(0, 0, 0, 0.45)',
  lg: '0 8px 24px rgba(0, 0, 0, 0.5)',
  glow: '0 0 20px rgba(0, 102, 255, 0.35)',
};

/**
 * Escala de espaciado (márgenes, padding y gaps) basada en unidad de 4px.
 */
const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
};

/** Tokens de diseño centralizados para la aplicación WePadel. */
export const theme = {
  colors,
  typography,
  borderRadius,
  shadows,
  spacing,
};
