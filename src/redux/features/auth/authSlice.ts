import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../../state/authState";
import { loadUserFromStorage, loginUser, clearStorage, signupUser } from "./authTrunks";
import { Constants } from "../../../utils/constants";

const initialState: AuthState = {
    isLoading: false,
    apiError: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError: (state) => {
            state.apiError = null;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        logout: state => initialState,
    },
    extraReducers: (builder) => {
        builder
            // Login cases
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.apiError = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = true;
                state.apiError = null;
                console.log('login fulfilled:', action.payload);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.apiError = (action.payload as string) || action.error.message || Constants.error;
                console.log('login reject:', state.apiError);
            })
            // Register cases
            .addCase(signupUser.pending, (state) => {
                state.isLoading = true;
                state.apiError = null;
            })
            .addCase(signupUser.fulfilled, (state) => {
                state.isLoading = false;
                state.apiError = null;
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.isLoading = false;
                state.apiError = (action.payload as string) || action.error.message || Constants.error;
                console.log('signup reject:', state.apiError);
            })
            // Load from storage cases
            .addCase(loadUserFromStorage.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loadUserFromStorage.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = true;
                console.log('storage: ' , action.payload)
            })
            .addCase(loadUserFromStorage.rejected, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.apiError = (action.payload as string) || action.error.message || Constants.error;
                console.log('storage reject:', state.apiError);
            })
            // Logout cases
            .addCase(clearStorage.fulfilled, (state) => {
                state.isAuthenticated = false;
                state.apiError = null;
            });
    },
});

export const { clearError, setLoading, logout } = authSlice.actions;
export default authSlice.reducer;