import { configureStore } from "@reduxjs/toolkit";
import authReducers from './features/auth/authSlice';
import userReducer from './features/user/userSlice';

export const store = configureStore({
    reducer: {
        authentication: authReducers,
        userInfo: userReducer,
    }
})

// RootState type
export type RootState = ReturnType<typeof store.getState>;
// AppDispatch type
export type AppDispatch = typeof store.dispatch;