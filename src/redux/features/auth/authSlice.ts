import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "../../state/authState";
import { signupUser, loginUser } from "./authTrunks";
import { Constants } from "../../../utils/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState: AuthState = {
    isLoggedIn: false,
    isLoading: false,
    apiSuccess: false,
    apiError: null,
    userData: null,
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
            state.userData = null;
            AsyncStorage.removeItem(Constants.token);
            AsyncStorage.removeItem(Constants.isLoggedIn);
        },
        resetAll: state => {
            return initialState;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signupUser.pending, (state) => {
                state.isLoading = true;
                state.apiSuccess = false;
                state.apiError = null;
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.apiSuccess = true;
                state.isLoggedIn = false;
                state.apiError = null;
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.isLoading = false;
                state.apiSuccess = false;
                state.isLoggedIn = false;
                state.apiError = (action.payload as string) || action.error.message || Constants.error;
                console.error('Registration failed:', action.payload);
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.apiSuccess = false;
                state.isLoggedIn = false;
                state.apiError = null;
                state.userData = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.apiSuccess = true;
                state.isLoggedIn = true;
                state.apiError = null;
                state.userData = action.payload.data.data;
                console.log('login: ' , action.payload)
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.apiSuccess = false;
                state.isLoggedIn = false;
                state.userData = null;
                state.apiError = (action.payload as string) || action.error.message || Constants.error;
                console.error('login failed:', state.apiError);
            })
    },
});

export const { logout, resetAll } = authSlice.actions;

export default authSlice.reducer;