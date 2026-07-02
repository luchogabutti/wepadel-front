import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import categoriesReducer from './categoriesSlice';
import productsReducer from './productsSlice';
import profileReducer from './profileSlice';
import discountsReducer from './discountsSlice';
import ordersReducer from './ordersSlice';
import cartReducer from './cartSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoriesReducer,
    products: productsReducer,
    profile: profileReducer,
    discounts: discountsReducer,
    orders: ordersReducer,
    cart: cartReducer,
  },
});
