import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { cartSlice } from './Slices/CartSlice';

const { reducer: cartReducer } = cartSlice;

const store = configureStore({
    reducer: {
        cart: cartReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
