import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  fetchCart,
  addCartItem,
  updateCartItem,
  removeCartItem,
  clearCart,
  resetCart,
} from '../Redux/cartSlice';
import { buildCartItems, buildCartTotals, buildImageById } from '../utils/cart';
import { notifySuccess, notifyError } from '../utils/appSnackbar';

export const useCart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const raw = useSelector((state) => state.cart.raw);
  const loading = useSelector((state) => state.cart.loading);
  const mutating = useSelector((state) => state.cart.mutating);
  const error = useSelector((state) => state.cart.error);
  const products = useSelector((state) => state.products.items);

  const isAuthenticated = Boolean(user?.token);
  const isAdmin = user?.rol === 'ADMINISTRADOR';
  const isCliente = isAuthenticated && !isAdmin;
  const usuarioId = user?.id;

  const imageById = useMemo(() => buildImageById(products), [products]);

  const items = useMemo(() => buildCartItems(raw, imageById), [raw, imageById]);

  const { subtotal, subtotalOriginal, discountTotal, itemCount } = useMemo(
    () => buildCartTotals(items, raw?.subtotal),
    [items, raw?.subtotal]
  );

  const refresh = useCallback(async () => {
    if (!isCliente || !usuarioId) {
      dispatch(resetCart());
      return;
    }

    const result = await dispatch(fetchCart(usuarioId));

    if (fetchCart.rejected.match(result)) {
      notifyError(result.payload || 'No se pudo cargar el carrito.');
    }
  }, [dispatch, isCliente, usuarioId]);

  const addItem = useCallback(
    async (product, quantity = 1) => {
      if (!isAuthenticated) {
        navigate('/login');
        return;
      }

      if (!isCliente || !usuarioId) return;

      const result = await dispatch(
        addCartItem({ usuarioId, productoId: product.id, cantidad: quantity })
      );

      if (addCartItem.fulfilled.match(result)) {
        notifySuccess(`${product.nombre} Agregado al carrito exitosamente.`);
        return;
      }

      notifyError(result.payload || 'No se pudo agregar el producto al carrito.');
    },
    [dispatch, isAuthenticated, isCliente, usuarioId, navigate]
  );

  const updateQuantity = useCallback(
    async (id, quantity) => {
      if (!isCliente || !usuarioId || quantity < 1) return;

      const result = await dispatch(
        updateCartItem({ usuarioId, productoId: id, cantidad: quantity })
      );

      if (updateCartItem.rejected.match(result)) {
        notifyError(result.payload || 'No se pudo actualizar la cantidad.');
      }
    },
    [dispatch, isCliente, usuarioId]
  );

  const removeItem = useCallback(
    async (id) => {
      if (!isCliente || !usuarioId) return;

      const result = await dispatch(removeCartItem({ usuarioId, productoId: id }));

      if (removeCartItem.rejected.match(result)) {
        notifyError(result.payload || 'No se pudo quitar el producto del carrito.');
      }
    },
    [dispatch, isCliente, usuarioId]
  );

  const clearCartItems = useCallback(async () => {
    if (!isCliente || !usuarioId) return;

    const result = await dispatch(clearCart(usuarioId));

    if (clearCart.rejected.match(result)) {
      notifyError(result.payload || 'No se pudo vaciar el carrito.');
    }
  }, [dispatch, isCliente, usuarioId]);

  return {
    items,
    itemCount,
    subtotal,
    subtotalOriginal,
    discountTotal,
    addItem,
    updateQuantity,
    removeItem,
    clearCart: clearCartItems,
    refresh,
    loading: loading || mutating,
    error,
  };
};
