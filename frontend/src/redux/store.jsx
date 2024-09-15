import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../services/apiService';

export const store = configureStore({
    reducer: {
        auth: authSlice,
    },
});