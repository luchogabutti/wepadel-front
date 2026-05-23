# WePadel

E-commerce de productos de pádel desarrollado como proyecto universitario en **UADE** (Universidad Argentina de la Empresa). Permite explorar el catálogo, gestionar el carrito, realizar compras y administrar productos y pedidos según el rol del usuario.

## Stack tecnológico

- **React** — interfaz de usuario
- **Vite** — bundler y entorno de desarrollo
- **JavaScript** — lógica de la aplicación (tokens de diseño en `src/styles/theme.ts`)
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

Los tokens viven en `src/styles/theme.ts`.

**Tipografía:** [Outfit](https://fonts.google.com/specimen/Outfit) (Google Fonts).

**Paleta de colores:**

| Token | Valor | Uso |
|-------|-------|-----|
| Primary | `#0066FF` | Acciones principales, CTAs |
| Secondary | `#141C24` | Superficies y tarjetas |
| Tertiary | `#00CC99` | Acentos y highlights |
| Background | `#0C0B12` | Fondo general |
| Text primary | `#FFFFFF` | Texto principal |
| Text secondary | `#A0AEC0` | Texto secundario |
| Error | `#FF4444` | Mensajes de error |

## Licencia

Proyecto académico — UADE.
