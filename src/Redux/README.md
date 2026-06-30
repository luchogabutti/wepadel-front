# Redux — WePadel

Estructura simple (como en clase):

```
src/Redux/
├── store.js
├── authSlice.js
├── categoriesSlice.js
└── ... (productsSlice, cartSlice, etc.)
```

## Patrón de cada slice

1. `createAsyncThunk` arriba (llamadas HTTP con axios)
2. `createSlice` con `extraReducers` (pending / fulfilled / rejected)
3. Exportar el reducer como default
4. Registrar en `store.js`

## En los componentes

```jsx
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../Redux/authSlice';
import { fetchCategorias } from '../Redux/categoriesSlice';

const user = useSelector((state) => state.auth.user);
const dispatch = useDispatch();
dispatch(loginUser({ email, password }));
```

## Features

| Slice | Estado |
|-------|--------|
| auth | Listo |
| categories | Listo |
| products | Pendiente (Juani) |
| cart | Pendiente (Fran) |
| profile | Pendiente (Tino) |
| discounts | Pendiente (Palo) |
| orders | Pendiente (Juani) |

> **Nota:** `redux-persist` se agregará al final del TP para persistir la sesión. Por ahora, al recargar la página hay que volver a iniciar sesión.
