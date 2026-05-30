# WePadel

E-commerce de productos de pádel desarrollado como proyecto universitario en **UADE** (Universidad Argentina de la Empresa). Permite explorar el catálogo, gestionar el carrito, realizar compras y administrar productos y pedidos según el rol del usuario.

## Stack tecnológico

- **React** — interfaz de usuario
- **Material UI (MUI)** — sistema de diseño y componentes (theme configurado en `src/styles/theme.ts`)
- **Vite** — bundler y entorno de desarrollo
- **JavaScript / TypeScript** — lógica de la aplicación
- **React Router DOM** — navegación y rutas
- **Redux Toolkit** — estado global
- **Axios** — comunicación con la API REST

## Roles de usuario

| Rol | Identificador | Descripción |
|-----|---------------|-------------|
| Invitado | — | Navega el catálogo, arma el carrito y puede registrarse o iniciar sesión |
| Cliente | `CLIENTE` | Compra productos, gestiona su perfil y consulta sus pedidos |
| Administrador | `ADMINISTRADOR` | Administra productos, pedidos y usuarios desde el panel de administración |

## Rutas

### Públicas (invitado)

| Ruta | Descripción |
|------|-------------|
| `/` | Página de inicio y productos destacados |
| `/productos` | Catálogo completo con filtros |
| `/productos/:id` | Detalle de un producto |
| `/carrito` | Carrito de compras |
| `/login` | Inicio de sesión |
| `/registro` | Alta de nuevo cliente |

### Cliente (`CLIENTE`)

| Ruta | Descripción |
|------|-------------|
| `/perfil` | Datos personales del usuario |
| `/mis-pedidos` | Historial y estado de pedidos |
| `/checkout` | Confirmación y pago del pedido |

### Administrador (`ADMINISTRADOR`)

| Ruta | Descripción |
|------|-------------|
| `/admin` | Panel principal de administración |
| `/admin/productos` | Alta, edición y baja de productos |
| `/admin/pedidos` | Gestión y seguimiento de pedidos |
| `/admin/usuarios` | Gestión de cuentas de usuario |

## Ejecución local

```bash
npm install
npm run dev
```

La aplicación queda disponible en la URL que indique Vite (por defecto `http://localhost:5173`).

Otros scripts útiles:

```bash
npm run build    # build de producción
npm run preview  # vista previa del build
npm run lint     # ESLint
```

## Variables de entorno

Creá un archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL=http://localhost:8080
```

`VITE_API_URL` apunta al backend REST. Todas las variables expuestas al cliente deben usar el prefijo `VITE_` para que Vite las incluya en el bundle.

## Sistema de diseño

La aplicación utiliza **Material UI (MUI)** como motor de estilos y componentes principales. La configuración global del tema se encuentra centralizada en `src/styles/theme.ts`.

### Convenciones de Estilos

Para garantizar consistencia y modularidad en toda la app, se deben seguir estas reglas:
- **No usar archivos `.css`:** Evitar la creación de hojas de estilo separadas.
- **Usar la propiedad `sx`:** Para estilos y ajustes puntuales, utilizar la propiedad `sx` directamente sobre los componentes de MUI (o el componente `<Box>`).
- **Consumir el Tema Global:** Los colores, tipografías y márgenes deben provenir del tema configurado en lugar de usar valores hardcodeados (ej: usar `color: 'primary.main'` en lugar de `#0066FF`).

**Tipografía:** [Outfit](https://fonts.google.com/specimen/Outfit) (Google Fonts).

**Paleta de colores (Mapeada en el Theme):**

| Token | Valor | Uso (en MUI) |
|-------|-------|-----|
| Primary | `#0066FF` | `primary.main` |
| Secondary | `#141C24` | `secondary.main` o `background.paper` |
| Tertiary/Success | `#00CC99` | `success.main` |
| Background | `#0C0B12` | `background.default` |
| Text primary | `#FFFFFF` | `text.primary` |
| Text secondary | `#A0AEC0` | `text.secondary` |
| Error | `#FF4444` | `error.main` |

## Licencia

Proyecto académico — UADE.
