import { createContext, useContext, useState, useMemo, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useProducts } from './ProductsContext';
import * as carritoService from '../services/carritoService';
import { PLACEHOLDER_IMG } from '../services/productMapper';

const CartContext = createContext(null);

const mapItem = (carritoItem, imageById) => {
  const producto = carritoItem.producto ?? {};
  return {
    id: producto.id,
    name: producto.nombre,
    description: producto.categoria,
    unitPrice: Number(carritoItem.precioUnitarioConDescuento ?? producto.precio ?? 0),
    quantity: carritoItem.cantidad,
    image: imageById.get(producto.id) || PLACEHOLDER_IMG,
  };
};

export const CartProvider = ({ children }) => {
  const navigate = useNavigate();
  const { user, isAuthenticated, isAdmin } = useAuth();
  const { products } = useProducts();

  const usuarioId = user?.id;
  const isCliente = isAuthenticated && !isAdmin;

  const [carrito, setCarrito] = useState(null);
  const [notification, setNotification] = useState({ open: false, message: '' });

  const imageById = useMemo(() => {
    const map = new Map();
    products.forEach((producto) => map.set(producto.id, producto.imagen));
    return map;
  }, [products]);

  const items = useMemo(
    () => (carrito?.items ?? []).map((item) => mapItem(item, imageById)),
    [carrito, imageById]
  );

  const subtotal = Number(carrito?.subtotal ?? 0);
  const itemCount = items.length;

  const refresh = useCallback(async () => {
    if (!isCliente || !usuarioId) {
      setCarrito(null);
      return;
    }
    try {
      const data = await carritoService.getCarrito(usuarioId);
      setCarrito(data);
    } catch (error) {
      console.error('Error al cargar el carrito:', error);
      setCarrito(null);
    }
  }, [isCliente, usuarioId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const closeNotification = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

  const addItem = useCallback(
    async (product, quantity = 1) => {
      if (!isAuthenticated) {
        navigate('/login');
        return;
      }
      if (!isCliente || !usuarioId) return;

      try {
        await carritoService.addItem(usuarioId, product.id, quantity);
        await refresh();
        setNotification({
          open: true,
          message: `${product.nombre} agregado al carrito exitosamente.`,
        });
      } catch (error) {
        console.error('Error al agregar al carrito:', error);
        setNotification({ open: true, message: 'No se pudo agregar el producto al carrito.' });
      }
    },
    [isAuthenticated, isCliente, usuarioId, navigate, refresh]
  );

  const updateQuantity = useCallback(
    async (id, quantity) => {
      if (!isCliente || !usuarioId || quantity < 1) return;
      try {
        await carritoService.updateItem(usuarioId, id, quantity);
        await refresh();
      } catch (error) {
        console.error('Error al actualizar la cantidad:', error);
      }
    },
    [isCliente, usuarioId, refresh]
  );

  const removeItem = useCallback(
    async (id) => {
      if (!isCliente || !usuarioId) return;
      try {
        await carritoService.removeItem(usuarioId, id);
        await refresh();
      } catch (error) {
        console.error('Error al quitar el producto:', error);
      }
    },
    [isCliente, usuarioId, refresh]
  );

  const clearCart = useCallback(async () => {
    if (!isCliente || !usuarioId) return;
    try {
      await carritoService.vaciarCarrito(usuarioId);
      await refresh();
    } catch (error) {
      console.error('Error al vaciar el carrito:', error);
    }
  }, [isCliente, usuarioId, refresh]);

  const value = {
    items,
    itemCount,
    subtotal,
    notification,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    refresh,
    closeNotification,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe usarse dentro de CartProvider');
  }
  return context;
};
