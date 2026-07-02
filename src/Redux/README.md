# Redux — README A ELIMINAR UNA VEZ INTEGRADO AL 100% REDUX EN EL PROYECTO. ES SOLO PARA QUE QUIEN TENGA QUE HACER UNA SLICE SIGA ESTA CONVENCION.

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
import { fetchProducts } from '../Redux/productsSlice';
import { fetchProfile } from '../Redux/profileSlice';

const user = useSelector((state) => state.auth.user);
const dispatch = useDispatch();
dispatch(loginUser({ email, password }));
```

## Features

| Slice | Estado |
|-------|--------|
| auth | Listo |
| categories | Listo |
| products | Listo |
| cart | Pendiente (Fran) |
| profile | Listo |
| discounts | Listo |
| orders | Pendiente (Juani) |

> **Nota:** `redux-persist` se agregará al final del TP para persistir la sesión. Por ahora, al recargar la página hay que volver a iniciar sesión.
