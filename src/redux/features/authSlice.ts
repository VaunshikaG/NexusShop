import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppUrls } from "../../utils/urls";
import { loginApi, signupApi } from "../../services/services";
import { LoginReqModel } from "../../types/auth/loginModels";
import { SignupReqModel } from "../../types/auth/signupModels";
import { AuthState } from "../state/authState";
import { signupUser, loginUser } from "./authTrunks";

const initialState: AuthState = {
    isLoggedIn: false,
    isLoading: false,
    apiSuccess: false,
    apiError: null,
    userInfo: null,
    apiMessage: null,
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
            state.userInfo = null;
            state.apiMessage = null;
        },
        resetAll: state => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(signupUser.pending, (state) => {
                state.isLoading = true;
                state.apiError = null;
                state.apiSuccess = false;
                state.isLoggedIn = false;
                state.apiMessage = null;
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.apiSuccess = true;
                state.isLoggedIn = true;
                state.apiMessage = action.payload.message;
                state.userInfo = action.payload;
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.isLoading = false;
                state.apiError = action.payload as string;
                state.apiSuccess = false;
                state.isLoggedIn = false;
                state.apiMessage = action.payload as string;
                console.error('Registration failed:', action.payload);
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.apiError = null;
                state.apiSuccess = false;
                state.isLoggedIn = false;
                state.apiMessage = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.apiSuccess = true;
                state.isLoggedIn = true;
                state.apiMessage = action.payload.message;
                state.userInfo = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.apiError = action.payload as string;
                state.apiSuccess = false;
                state.isLoggedIn = false;
                state.apiMessage = action.payload as string;
                console.error('login failed:', action.payload);
            })
    },
});

export const { logout, resetAll } = authSlice.actions;

export default authSlice.reducer;