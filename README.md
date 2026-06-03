# WePadel

E-commerce de productos de pádel desarrollado como proyecto universitario en **UADE** (Universidad Argentina de la Empresa). Permite explorar el catálogo, gestionar el carrito, completar el checkout y consultar el perfil del usuario.

## Stack tecnológico

- **React 19** — interfaz de usuario
- **Material UI (MUI) v9** — componentes y theme (`src/styles/theme.js`)
- **Vite** — bundler y entorno de desarrollo
- **JavaScript** — lógica de la aplicación
- **React Router DOM** — navegación y rutas
- **Sass (SCSS)** — estilos por componente y clases globales
- **Context API** — estado del carrito (`src/context/CartContext.jsx`)

Los datos de productos, categorías y pedidos están en `src/data/` (mock local). La integración con API REST está prevista para una etapa posterior.

## Estructura del proyecto

```
src/
├── layouts/           # Shell de la app (header, main, footer)
├── pages/             # Rutas: solo composición, sin estilos repetidos
├── components/        # UI por dominio (cart, catalog, checkout, profile…)
│   └── layout/        # Wrappers de página reutilizables
├── context/           # Estado global (carrito)
├── data/              # Datos mock
├── hooks/
└── styles/
    ├── theme.js       # Tokens MUI + overrides de componentes
    └── globals.scss   # Clases reutilizables (.surface-card, etc.)
```

## Rutas actuales

Todas las rutas viven dentro de `MainLayout` (header + footer).

| Ruta | Página | Descripción |
|------|--------|-------------|
| `/` | Home | Inicio, destacados y categorías |
| `/catalogo` | Catalog | Catálogo (redirige a categoría por defecto) |
| `/catalogo/:categoria` | Catalog | Catálogo por categoría |
| `/producto/:id` | ProductDetail | Detalle de producto |
| `/carrito` | Cart | Carrito de compras |
| `/checkout` | Checkout | Envío y pago |
| `/checkout/confirmacion/:orderId` | CheckoutSuccess | Confirmación de compra |
| `/login` | Auth | Inicio de sesión |
| `/registro` | Auth | Registro |
| `/perfil` | Profile | Datos y beneficios del usuario |
| `/perfil/ordenes` | Orders | Historial de órdenes |
| `/mis-pedidos` | Placeholder | Sección pendiente |

## Ejecución local

```bash
npm install
npm run dev
```

La aplicación queda disponible en la URL que indique Vite (por defecto `http://localhost:5173`).

```bash
npm run build    # build de producción
npm run preview  # vista previa del build
npm run lint     # ESLint
```

## Convenciones de estilos y arquitectura

El proyecto usa un **híbrido MUI + SCSS** con reglas claras por capa. La idea es no repetir estilos ni mezclar responsabilidades.

### 1. Theme (`src/styles/theme.js`)

Fuente de verdad para:

- Paleta de colores (`primary`, `surface`, `text.emphasis`, etc.)
- Tipografía base y variantes de página: `pageTitle`, `pageTitleProfile`, `pageSubtitle`
- Overrides de MUI (`Button`, `TextField`, `OutlinedInput`, campos `disabled`, etc.)

Usar tokens del theme en lugar de valores sueltos (`#0066FF` → `primary.main`).

### 2. Clases globales (`src/styles/globals.scss`)

Importado una vez en `src/main.jsx`. Define contenedores visuales reutilizables:

| Clase | Uso |
|-------|-----|
| `.surface-card` | Card estándar (checkout, carrito, formularios) |
| `.surface-card--dark` | Resumen de pago / carrito (fondo más oscuro) |
| `.surface-card--paper` | Cards de perfil y órdenes |
| `.surface-card--compact` | Menos padding (ej. ítem de carrito) |
| `.surface-card--elevated` | Sombra extra |

**Uso en JSX:**

```jsx
<div className="surface-card checkout-shipping-card">
```

Los colores vienen del theme vía variables CSS (`var(--mui-palette-surface-main)`).

### 3. SCSS por componente (`ComponentName/styles.scss`)

Cada componente de UI tiene su SCSS co-located. Ahí va **solo el estilo interno** del bloque (header, filas, hover, badges, responsive del interior).

**No copiar** en el SCSS del componente lo que ya define `.surface-card` (fondo, borde, padding base).

**Breakpoints estándar** (alinear con MUI):

- `sm` = 600px
- `md` = 900px
- `lg` = 1200px

### 4. Layout de la app (`src/layouts/MainLayout.jsx`)

Define el shell global: columna flex, `minHeight: 100vh`, header, `<main>` con `pt: 64px`, footer.

Las **pages no deben repetir** ese shell (`minHeight`, `bgcolor`, etc.).

### 5. Layouts de página (`src/components/layout/`)

Wrappers para estructura de ruta (no para el look de cards):

| Componente | Cuándo usarlo |
|------------|----------------|
| `PageContainer` | Padding y ancho máximo (`Container` MUI). Prop `narrow` para perfil (max 1024px) |
| `PageHeader` | Título + subtítulo (`variant="profile"` en perfil/órdenes) |
| `ProfilePageLayout` | Sidebar + área de contenido (perfil, órdenes) |
| `CenteredPage` | Contenido centrado verticalmente (auth, placeholder, error de producto) |

Importar cada layout desde su archivo, por ejemplo:

```js
import { PageContainer } from '../components/layout/PageContainer';
```

### 6. Pages (`src/pages/`)

Solo **composición**: datos, estado de la ruta, y ensamblado de componentes.

- Sin shells duplicados de `MainLayout`
- Sin estilos de card repetidos
- Para columnas (carrito, checkout): `Grid` y `Stack` de MUI **directo en la page**, sin abstracciones extra

Ejemplo:

```jsx
<Grid container spacing={4} alignItems="flex-start">
  <Grid size={{ xs: 12, lg: 8 }}>...</Grid>
  <Grid size={{ xs: 12, lg: 4 }}>...</Grid>
</Grid>
```

### 7. Cuándo usar `sx`

- **Sí:** dentro de layouts compartidos (`PageContainer`, `MainLayout`) o ajustes puntuales difíciles en SCSS
- **No:** layout repetido en cada page, ni el “card shell” que ya cubre `.surface-card`

### Resumen en una frase

> El **theme** define tokens; **globals.scss** define contenedores; **layouts** arman pantallas; cada **componente** estiliza su interior en SCSS; las **pages** solo componen bloques.

## Tipografía y paleta

**Tipografía:** [Outfit](https://fonts.google.com/specimen/Outfit) (Google Fonts).

| Token | Valor | Uso |
|-------|-------|-----|
| Primary | `#0066FF` | `primary.main` |
| Primary light | `#B3C5FF` | `primary.light` |
| Background | `#0C0B12` | `background.default` |
| Surface | `#1c1b22` | `surface.main` |
| Success | `#00CC99` | `success.main` |
| Error | `#FF4444` | `error.main` |
| Text emphasis | `#e5e1eb` | `text.emphasis` |

## Variables de entorno (futuro backend)

Cuando se conecte la API, crear `.env` en la raíz:

```env
VITE_API_URL=http://localhost:8080
```

Las variables del cliente deben usar el prefijo `VITE_`.

## Licencia

Proyecto académico — UADE.
