import { createContext, useContext, useState, useMemo } from 'react';
import { INITIAL_CART_ITEMS, mapProductToCartItem } from '../data/cartData';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(INITIAL_CART_ITEMS);
  const [notification, setNotification] = useState({ open: false, message: '' });

  const itemCount = useMemo(() => items.length, [items]);

  const closeNotification = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

  const addItem = (product, quantity = 1) => {
    if (!product?.inStock) return;

    setItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);

      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prev, mapProductToCartItem(product, quantity)];
    });

    setNotification({
      open: true,
      message: `${product.title} agregado al carrito exitosamente.`,
    });
  };

  const updateQuantity = (id, quantity) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider
      value={{ items, itemCount, notification, addItem, updateQuantity, removeItem, closeNotification }}
    >
      {children}
    </CartContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe usarse dentro de CartProvider');
  }
  return context;
};
