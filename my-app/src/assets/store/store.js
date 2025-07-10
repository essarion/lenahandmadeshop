import { configureStore } from '@reduxjs/toolkit';
import itemsCartReducer from './cart/createSlice';

export const storeCart = configureStore({
    reducer: {
        itemsCart: itemsCartReducer,
    },
});