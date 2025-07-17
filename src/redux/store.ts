import { configureStore } from "@reduxjs/toolkit";
import authReducers from './slice/authSlice';

export const store = configureStore({
    reducer: {
        authentication: authReducers,
    }
})

// RootState type
export type RootState = ReturnType<typeof store.getState>;
// AppDispatch type
export type AppDispatch = typeof store.dispatch;