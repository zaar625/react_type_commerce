import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../redux/theme';
import cartItemReducer from '../redux/cartItem';
import userCartItemsReducer from '../redux/logincartIems';
import loginReducer from '../redux/login';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    cartItem: cartItemReducer,
    userCartItem: userCartItemsReducer,
    login: loginReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
