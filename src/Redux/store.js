import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import authReducer from './authSlice';
import categoriesReducer from './categoriesSlice';
import productsReducer from './productsSlice';
import profileReducer from './profileSlice';
import discountsReducer from './discountsSlice';
import ordersReducer from './ordersSlice';
import cartReducer from './cartSlice';
import { authPersistStorage } from './authPersistStorage';

const authPersistConfig = {
  key: 'wepadel_auth',
  storage: authPersistStorage,
  whitelist: ['user'],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    categories: categoriesReducer,
    products: productsReducer,
    profile: profileReducer,
    discounts: discountsReducer,
    orders: ordersReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
