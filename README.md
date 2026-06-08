# WePadel

E-commerce de productos de pádel desarrollado como proyecto universitario en **UADE** (Universidad Argentina de la Empresa). Permite explorar el catálogo, gestionar el carrito, completar el checkout, consultar el perfil del usuario y administrar el negocio desde un panel interno (catálogo, stock, descuentos y pedidos).

## Stack tecnológico

- **React 19** — interfaz de usuario
- **Material UI (MUI) v9** — componentes y theme (`src/styles/theme.js`)
- **Vite** — bundler y entorno de desarrollo
- **JavaScript** — lógica de la aplicación
- **React Router DOM** — navegación y rutas
- **Sass (SCSS)** — estilos por componente y clases globales
- **Context API** — estado del carrito (`src/context/CartContext.jsx`, provisto desde `MainLayout`)

Los datos de productos, categorías, pedidos y configuración admin están en `src/data/` (mock local). La integración con API REST está prevista para una etapa posterior.

## Estructura del proyecto

```
src/
├── layouts/              # Shells de ruta (MainLayout, ProfileAreaLayout, AdminAreaLayout)
├── pages/                # Rutas: solo composición, sin estilos repetidos
│   └── admin/            # Páginas del panel de administración
├── components/           # UI por dominio
│   ├── admin/            # Catálogo, stock, descuentos, perfil admin
│   ├── auth/             # Login y registro
│   ├── cart/             # Carrito y notificaciones
│   ├── catalog/          # Catálogo, filtros, detalle de producto
│   ├── checkout/         # Envío, pago y confirmación
│   ├── general/          # Header, footer, sidebar, diálogos, snackbar
│   ├── home/             # Hero, categorías, destacados
│   ├── layout/           # Wrappers de página reutilizables (PageContainer, etc.)
│   └── profile/          # Datos de usuario y órdenes
├── config/               # Configuración de UI (sidebar, usuario mock)
├── context/              # Estado global (carrito)
├── data/                 # Datos mock
├── utils/                # Validaciones (auth, checkout, perfil)
└── styles/
    ├── theme.js          # Tokens MUI + overrides de componentes
    └── globals.scss      # Clases reutilizables (.surface-card, etc.)
```

### Datos mock (`src/data/`)

| Archivo | Contenido |
|---------|-----------|
| `productsData.js` | Productos del catálogo público |
| `categoriesData.js` | Categorías del catálogo |
| `cartData.js` | Ítems iniciales del carrito |
| `orders.js` | Órdenes del usuario |
| `adminProductsData.js` | Productos del panel admin |
| `adminOrders.js` | Pedidos del panel admin |
| `heroSlides.js` | Imágenes del hero de la home |

### Configuración (`src/config/`)

| Archivo | Contenido |
|---------|-----------|
| `accountUser.js` | Usuario mock para sidebar de perfil/admin |
| `sidebarItems.jsx` | Ítems de navegación lateral (perfil y admin) |

## Rutas actuales

Todas las rutas viven dentro de `MainLayout` (header + footer + `CartProvider`).

### Tienda y cuenta

| Ruta | Página | Descripción |
|------|--------|-------------|
| `/` | Home | Inicio, destacados y categorías |
| `/catalogo` | Catalog | Catálogo (categoría por defecto: `paletas`, sin cambiar la URL) |
| `/catalogo/:categoria` | Catalog | Catálogo filtrado por categoría |
| `/producto/:id` | ProductDetail | Detalle de producto |
| `/carrito` | Cart | Carrito de compras |
| `/checkout` | Checkout | Envío y pago |
| `/checkout/confirmacion/:orderId` | CheckoutSuccess | Confirmación de compra |
| `/login` | Auth | Inicio de sesión |
| `/registro` | Auth | Registro |
| `/mis-pedidos` | Placeholder | Sección pendiente |

### Área de perfil (`ProfileAreaLayout`)

Sidebar lateral + contenido. Rutas anidadas bajo `MainLayout`.

| Ruta | Página | Descripción |
|------|--------|-------------|
| `/perfil` | Profile | Datos y beneficios del usuario |
| `/perfil/ordenes` | Orders | Historial de órdenes |

### Área de administración (`AdminAreaLayout`)

Panel interno con sidebar propio. `/admin` redirige a `/admin/catalogo`.

| Ruta | Página | Descripción |
|------|--------|-------------|
| `/admin/catalogo` | AdminCatalog | Gestión del catálogo |
| `/admin/catalogo/editar/:productId` | AdminEditProduct | Edición de producto |
| `/admin/stock` | AdminStock | Control de stock |
| `/admin/descuentos` | AdminDiscounts | Gestión de descuentos |
| `/admin/pedidos` | AdminOrders | Pedidos recibidos |
| `/admin/perfil` | AdminProfile | Perfil del administrador |

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
- Overrides de MUI (`AppBar`, `Button`, `TextField`, `OutlinedInput`, campos `disabled`, etc.)
- Botones `outlined` usan `primary.light` de forma global (borde y texto)

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

### 4. Layouts de ruta (`src/layouts/`)

| Layout | Rol |
|--------|-----|
| `MainLayout` | Shell global: header, footer, `CartProvider`, scroll al cambiar de ruta |
| `ProfileAreaLayout` | Sidebar de perfil + `PageContainer` estrecho para `/perfil` y `/perfil/ordenes` |
| `AdminAreaLayout` | Sidebar de admin + área de contenido para rutas `/admin/*` |

Las **pages no deben repetir** el shell de `MainLayout` (`minHeight`, `bgcolor`, etc.).

### 5. Wrappers de página (`src/components/layout/`)

Componentes de estructura reutilizable (no definen el look de cards):

| Componente | Cuándo usarlo |
|------------|----------------|
| `PageContainer` | Padding y ancho máximo (`Container` MUI). Prop `narrow` para perfil (max 1024px) |
| `PageHeader` | Título + subtítulo (`variant="profile"` en perfil/órdenes) |
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
