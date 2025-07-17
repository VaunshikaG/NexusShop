import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppUrls } from "../../utils/urls";
import { loginApi, signupApi } from "../../services/services";
import { LoginReqModel } from "../../types/auth/loginModels";
import { SignupReqModel } from "../../types/auth/signupModels";
import { AuthState } from "../state/authState";

const initialState: AuthState = {
    isLoggedIn: false,
    isLoading: false,
    apiSuccess: false,
    apiError: null,
    loginInfo: null,
    signupInfo: null,
};

export const loginUser = createAsyncThunk(
    AppUrls.loginUrl,

    async (reqModel: LoginReqModel, { rejectWithValue }) => {
        try {
            const data = await loginApi(reqModel);
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Network error during login');
        }
    }
);

export const signupUser = createAsyncThunk(
    AppUrls.signupUrl,

    async (reqModel: SignupReqModel, { rejectWithValue }) => {
        try {
            const data = await signupApi(reqModel);
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Network error during registration');
        }
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.loginInfo = action.payload;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.apiSuccess = false;
            state.isLoading = false;
            state.apiError = null;
            state.loginInfo = null;
            state.signupInfo = null;
        },
        resetSignup: (state) => {
            state.isLoggedIn = false;
            state.apiSuccess = false;
            state.isLoading = false;
            state.apiError = null;
            state.loginInfo = null;
            state.signupInfo = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signupUser.pending, (state) => {
                state.isLoading = true;
                state.apiError = null;
                state.apiSuccess = false;
                state.isLoggedIn = false;
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.apiSuccess = true;
                state.isLoggedIn = true;
                state.signupInfo = action.payload;
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.isLoading = false;
                state.apiError = action.payload as string;
                state.apiSuccess = false;
                state.isLoggedIn = false;
                console.error('Registration failed:', action.payload);
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.apiError = null;
                state.apiSuccess = false;
                state.isLoggedIn = false;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.apiSuccess = true;
                state.isLoggedIn = true;
                state.loginInfo = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.apiError = action.payload as string;
                state.apiSuccess = false;
                state.isLoggedIn = false;
                console.error('login failed:', action.payload);
            })
    },
});

export const { login, logout, resetSignup } = authSlice.actions;

export default authSlice.reducer;