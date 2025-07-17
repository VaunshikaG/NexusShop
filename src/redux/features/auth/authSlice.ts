import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../../state/authState";
import { signupUser, loginUser } from "./authTrunks";
import { Constants } from "../../../utils/constants";

const initialState: AuthState = {
    isLoggedIn: false,
    isLoading: false,
    apiSuccess: false,
    apiError: null,
    token: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.isLoggedIn = false;
            state.apiSuccess = false;
            state.isLoading = false;
            state.apiError = null;
            state.token = null;
        },
        resetAll: state => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(signupUser.pending, (state) => {
                state.isLoading = true;
                state.apiSuccess = false;
                state.isLoggedIn = false;
                state.apiError = null;
                state.token = null;
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.apiSuccess = true;
                state.isLoggedIn = true;
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.isLoading = false;
                state.apiSuccess = false;
                state.isLoggedIn = false;
                state.token = null;
                state.apiError = (action.payload as string) || action.error.message || Constants.error;
                console.error('Registration failed:', action.payload);
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.apiSuccess = false;
                state.isLoggedIn = false;
                state.apiError = null;
                state.token = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.apiSuccess = true;
                state.isLoggedIn = true;
                state.apiError = null;
                state.token = action.payload.data.data.accessToken;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.apiSuccess = false;
                state.isLoggedIn = false;
                state.token = null;
                state.apiError = (action.payload as string) || action.error.message || Constants.error;
                console.error('login failed:', action.payload);
            })
    },
});

export const { logout, resetAll } = authSlice.actions;

export default authSlice.reducer;