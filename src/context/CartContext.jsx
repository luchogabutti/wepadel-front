import { createContext, useContext, useState, useMemo, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useProducts } from './ProductsContext';
import * as carritoService from '../services/carritoService';
import { PLACEHOLDER_IMG } from '../services/productMapper';
import { notifySuccess, notifyError } from '../utils/appSnackbar';
import { getApiErrorMessage } from '../services/apiClient';

const CartContext = createContext(null);

const mapItem = (carritoItem, imageById) => {
  const producto = carritoItem.producto ?? {};
  const originalUnitPrice = Number(producto.precio ?? 0);
  const unitPrice = Number(carritoItem.precioUnitarioConDescuento ?? producto.precio ?? 0);
  return {
    id: producto.id,
    name: producto.nombre,
    description: producto.categoria,
    unitPrice,
    originalUnitPrice,
    hasDiscount: originalUnitPrice > unitPrice,
    quantity: carritoItem.cantidad,
    image: imageById.get(producto.id) || PLACEHOLDER_IMG,
  };
};

export const CartProvider = ({ children }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = Boolean(user?.token);
  const isAdmin = user?.rol === 'ADMINISTRADOR';
  const { products } = useProducts();

  const usuarioId = user?.id;
  const isCliente = isAuthenticated && !isAdmin;

  const [carrito, setCarrito] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  const subtotalOriginal = useMemo(
    () => items.reduce((sum, item) => sum + item.originalUnitPrice * item.quantity, 0),
    [items]
  );

  const discountTotal = Math.max(0, subtotalOriginal - subtotal);

  const refresh = useCallback(async () => {
    if (!isCliente || !usuarioId) {
      setCarrito(null);
      setLoading(false);
      setError(null);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await carritoService.getCarrito(usuarioId);
      setCarrito(data);
    } catch (err) {
      setError(err);
      setCarrito(null);
      notifyError(getApiErrorMessage(err, 'No se pudo cargar el carrito.'));
    } finally {
      setLoading(false);
    }
  }, [isCliente, usuarioId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

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
        notifySuccess(`${product.nombre} Agregado al carrito exitosamente.`);
      } catch (error) {
        notifyError(getApiErrorMessage(error, 'No se pudo agregar el producto al carrito.'));
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
        notifyError(getApiErrorMessage(error, 'No se pudo actualizar la cantidad.'));
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
        notifyError(getApiErrorMessage(error, 'No se pudo quitar el producto del carrito.'));
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
      notifyError(getApiErrorMessage(error, 'No se pudo vaciar el carrito.'));
    }
  }, [isCliente, usuarioId, refresh]);

  const value = {
    items,
    itemCount,
    subtotal,
    subtotalOriginal,
    discountTotal,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    refresh,
    loading,
    error,
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
