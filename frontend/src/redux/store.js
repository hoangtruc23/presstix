import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authReducer';
import { persistStore,persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const persistConfig = {
    key: 'auth',
    storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);


const store = configureStore({
    reducer: {
        auth: persistedReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
});

// Tạo persistor
const persistor = persistStore(store);

export { store, persistor };