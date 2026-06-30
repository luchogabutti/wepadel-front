# WePadel

E-commerce de productos de pádel desarrollado como proyecto universitario en **UADE** (Universidad Argentina de la Empresa). Permite explorar el catálogo, gestionar el carrito, completar el checkout, consultar el perfil del usuario y administrar el negocio desde un panel interno (catálogo, stock, descuentos y pedidos).

## Stack tecnológico

- **React 19** — interfaz de usuario
- **Material UI (MUI) v9** — componentes y theme (`src/styles/theme.js`)
- **Vite** — bundler y entorno de desarrollo
- **JavaScript** — lógica de la aplicación
- **React Router DOM** — navegación y rutas
- **Sass (SCSS)** — estilos por componente y clases globales
- **notistack** — notificaciones toast (éxito/error)
- **Redux Toolkit** + **React Redux** + **Axios** — estado global (`src/Redux/`: auth, categorías; en migración)
- **Context API** — estado global pendiente de migrar (`ProductsContext`, `CartContext`)

La app consume una **API REST** (productos, carrito, órdenes, auth, perfil, admin). Algunos datos de UI siguen en `src/data/` (hero, textos del panel).

## Estructura del proyecto

```
src/
├── layouts/              # Shells de ruta (MainLayout, ProfileAreaLayout, AdminAreaLayout)
├── views/                # Rutas: solo composición, sin estilos repetidos
│   └── admin/            # Vistas del panel de administración
├── components/           # UI por dominio
│   ├── admin/            # Catálogo, stock, descuentos, perfil admin
│   ├── auth/             # Login y registro
│   ├── cart/             # Carrito
│   ├── catalog/          # Catálogo, filtros, detalle de producto
│   ├── checkout/         # Envío, pago y confirmación
│   ├── general/          # Header, footer, sidebar, diálogos, snackbar
│   ├── home/             # Hero, categorías, destacados
│   ├── layout/           # Wrappers de página reutilizables (PageContainer, etc.)
│   └── profile/          # Datos de usuario y órdenes
├── config/               # Configuración de UI (sidebar)
├── Redux/                # Store y slices (auth, categories, ...)
├── context/              # Estado global pendiente (productos, carrito)
├── services/             # Cliente HTTP y llamadas a la API
├── hooks/                # Hooks reutilizables (snackbar, paginación)
├── data/                 # Datos estáticos de UI (no reemplazan la API)
├── utils/                # Validaciones (auth, checkout, perfil)
└── styles/
    ├── theme.js          # Tokens MUI + overrides de componentes
    └── globals.scss      # Clases reutilizables (.surface-card, etc.)
```

### Estado global

#### Redux (`src/Redux/`)

| Slice | Rol |
|-------|-----|
| `authSlice` | Sesión del usuario, login/registro/logout (`useSelector` / `useDispatch`) |
| `categoriesSlice` | Categorías desde `GET /categorias` |

`Provider` de Redux en `main.jsx`. Ver [`src/Redux/README.md`](src/Redux/README.md) para el patrón de nuevos slices.

#### Context API (`src/context/`) — pendiente de migrar

| Contexto | Rol |
|----------|-----|
| `ProductsContext` | Catálogo precargado desde la API (productos + imágenes + stock + descuentos) |
| `CartContext` | Carrito del usuario autenticado (cliente) |

`MainLayout` monta `ProductsProvider` y `CartProvider`.

### Datos estáticos (`src/data/`)

| Archivo | Uso actual |
|---------|------------|
| `categoriesData.js` | Legacy — las categorías vienen de la API vía `categoriesSlice` |
| `heroSlides.js` | Imágenes del carrusel del hero |
| `cartData.js` | Helpers de formato de precio (`formatCartPrice`, `formatCheckoutPrice`) |
| `adminProductsData.js` | Títulos y subtítulos de secciones del panel admin (`adminSectionContent`) |
| `productsData.js` | Legacy — no se importa |
| `orders.js` | Legacy — las órdenes vienen de la API |
| `adminOrders.js` | Legacy — no se importa |

### Configuración (`src/config/`)

| Archivo | Contenido |
|---------|-----------|
| `sidebarItems.jsx` | Ítems de navegación lateral (perfil y admin) |
| `accountUser.js` | Legacy — no se importa |

## Rutas actuales

Todas las rutas viven dentro de `MainLayout` (header + footer + `ProductsProvider` + `CartProvider`).

Las rutas de perfil y admin están protegidas con `ProtectedRoute` (requieren login; `/admin/*` además exige rol `ADMINISTRADOR`).

### Tienda y cuenta

| Ruta | Vista | Descripción |
|------|-------|-------------|
| `/` | HomeView | Inicio, destacados y categorías |
| `/catalogo` | CatalogView | Catálogo (categoría por defecto: `paletas`, sin cambiar la URL) |
| `/catalogo/:categoria` | CatalogView | Catálogo filtrado por categoría |
| `/producto/:id` | ProductDetailView | Detalle de producto |
| `/carrito` | CartView | Carrito de compras |
| `/checkout` | CheckoutView | Envío y pago |
| `/checkout/confirmacion/:orderId` | CheckoutSuccessView | Confirmación de compra |
| `/login` | AuthView | Inicio de sesión |
| `/registro` | AuthView | Registro |
| `/recuperar-contrasena` | ForgotPasswordView | Placeholder (sin endpoint) |
| `/mis-pedidos` | PlaceholderView | Sección pendiente |
| `/sobre-nosotros` | AboutUsView | Información institucional |
| `/politica-de-privacidad` | PrivacyPolicyView | Política de privacidad |
| `/terminos-de-servicio` | TermsOfServiceView | Términos de servicio |

### Área de perfil (`ProfileAreaLayout`) — requiere login

Sidebar lateral + contenido. Rutas anidadas bajo `MainLayout`.

| Ruta | Vista | Descripción |
|------|-------|-------------|
| `/perfil` | ProfileView | Datos y beneficios del usuario |
| `/perfil/ordenes` | OrdersView | Historial de órdenes |

### Área de administración (`AdminAreaLayout`) — requiere login + rol admin

Panel interno con sidebar propio. `/admin` redirige a `/admin/catalogo`.

| Ruta | Vista | Descripción |
|------|-------|-------------|
| `/admin/catalogo` | AdminCatalogView | Gestión del catálogo |
| `/admin/catalogo/editar/:productId` | AdminEditProductView | Edición de producto |
| `/admin/stock` | AdminStockView | Control de stock |
| `/admin/descuentos` | AdminDiscountsView | Gestión de descuentos |
| `/admin/pedidos` | AdminOrdersView | Pedidos recibidos |
| `/admin/perfil` | AdminProfileView | Perfil del administrador |

## Ejecución local

Requisitos: **Node.js**, y el **backend** corriendo (por defecto en `http://localhost:8080`).

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
| `MainLayout` | Shell global: header, footer, `ProductsProvider`, `CartProvider`, scroll al cambiar de ruta |
| `ProfileAreaLayout` | Sidebar de perfil + `PageContainer` estrecho para `/perfil` y `/perfil/ordenes` |
| `AdminAreaLayout` | Sidebar de admin + área de contenido para rutas `/admin/*` |

Las **views no deben repetir** el shell de `MainLayout` (`minHeight`, `bgcolor`, etc.).

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

### 6. Views (`src/views/`)

Solo **composición**: datos, estado de la ruta, y ensamblado de componentes.

- Sin shells duplicados de `MainLayout`
- Sin estilos de card repetidos
- Para columnas (carrito, checkout): `Grid` y `Stack` de MUI **directo en la view**, sin abstracciones extra

Ejemplo:

```jsx
<Grid container spacing={4} alignItems="flex-start">
  <Grid size={{ xs: 12, lg: 8 }}>...</Grid>
  <Grid size={{ xs: 12, lg: 4 }}>...</Grid>
</Grid>
```

### 7. Cuándo usar `sx`

- **Sí:** dentro de layouts compartidos (`PageContainer`, `MainLayout`) o ajustes puntuales difíciles en SCSS
- **No:** layout repetido en cada view, ni el “card shell” que ya cubre `.surface-card`

### Resumen en una frase

> El **theme** define tokens; **globals.scss** define contenedores; **layouts** arman pantallas; cada **componente** estiliza su interior en SCSS; las **views** solo componen bloques.

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

## Variables de entorno

Crear `.env` en la raíz del proyecto (opcional; si no existe, usa `http://localhost:8080`):

```env
VITE_API_URL=http://localhost:8080
```

Las variables del cliente deben usar el prefijo `VITE_`.

## Integración con API

Cliente HTTP: `src/services/apiClient.js`.

- Base URL desde `VITE_API_URL`.
- Header `Authorization: Bearer <token>` cuando la llamada usa `auth: true`.
- El token se lee desde el store de Redux (`state.auth.user.token`). Las llamadas HTTP de auth y categorías se hacen en los slices con Axios; el resto sigue en `services/` mientras se migra.

Notificaciones de éxito/error: **notistack** (`SnackbarProvider` en `main.jsx`, hook `useAppSnackbar`).

### Carga del catálogo

Al iniciar la app, `ProductsContext` ejecuta:

1. `GET /productos`
2. Por cada producto, en paralelo: imágenes, stock y descuentos

Los datos quedan en memoria. Navegar entre home, catálogo y detalle **no vuelve a fetchear** hasta recargar la página.

### Endpoints (`src/services/`)

#### Auth — `src/Redux/authSlice.js`

| Método | Endpoint | Auth |
|--------|----------|------|
| POST | `/api/v1/auth/authenticate` | No |
| POST | `/api/v1/auth/register` | No |

#### Categorías — `src/Redux/categoriesSlice.js`

| Método | Endpoint | Auth |
|--------|----------|------|
| GET | `/categorias` | No |

#### Productos — `productsService.js`

| Método | Endpoint | Auth | Notas |
|--------|----------|------|-------|
| GET | `/productos` | No / Sí | Público en tienda; con auth en admin |
| GET | `/productos/{id}` | No | Definido, no usado en UI |
| GET | `/productos/{id}/imagenes` | No | Imágenes del producto |
| POST | `/productos` | Sí | Crear (admin) |
| PUT | `/productos/{id}` | Sí | Editar (admin) |
| DELETE | `/productos/{id}` | Sí | Eliminar (admin) |

#### Imágenes — `imagenesService.js`

| Método | Endpoint | Auth | Notas |
|--------|----------|------|-------|
| GET | `/imagenes/{id}` | No | Definido, no usado en UI |
| POST | `/imagenes` | Sí | Subir imagen (`FormData`) |
| PUT | `/imagenes/{id}` | Sí | Reemplazar imagen (`FormData`) |

#### Stock — `stocksService.js`

| Método | Endpoint | Auth |
|--------|----------|------|
| GET | `/stocks/producto/{id}` | No |
| PUT | `/stocks/producto/{id}` | Sí |

#### Descuentos — `descuentosService.js`

| Método | Endpoint | Auth |
|--------|----------|------|
| GET | `/descuentos/producto/{id}` | No |
| GET | `/descuentos/{id}` | Sí |
| POST | `/descuentos` | Sí |
| PUT | `/descuentos/{id}` | Sí |
| DELETE | `/descuentos/{id}` | Sí |

#### Carrito — `carritoService.js` (requiere auth)

| Método | Endpoint |
|--------|----------|
| GET | `/usuarios/{id}/carrito` |
| POST | `/usuarios/{id}/carrito/items` |
| PUT | `/usuarios/{id}/carrito/items/{productoId}` |
| DELETE | `/usuarios/{id}/carrito/items/{productoId}` |
| DELETE | `/usuarios/{id}/carrito` |

#### Órdenes — `ordenesService.js` (requiere auth)

| Método | Endpoint | Notas |
|--------|----------|-------|
| GET | `/usuarios/{id}/ordenes` | Mis pedidos |
| GET | `/usuarios/{id}/ordenes/{ordenId}` | Detalle |
| POST | `/usuarios/{id}/ordenes` | Checkout |
| PUT | `/usuarios/{id}/ordenes/{ordenId}/cancelar` | Cancelar |
| GET | `/ordenes` | Todas las órdenes (admin) |

#### Usuarios — `usuariosService.js` (requiere auth)

| Método | Endpoint | Notas |
|--------|----------|-------|
| GET | `/usuarios/{id}` | Perfil |
| PUT | `/usuarios/{id}` | Actualizar perfil |
| GET | `/usuarios` | Definido, no usado en UI |

#### Puntos — `puntosService.js` (requiere auth)

| Método | Endpoint |
|--------|----------|
| GET | `/usuarios/{id}/puntos` |

## Licencia

Proyecto académico — UADE.
