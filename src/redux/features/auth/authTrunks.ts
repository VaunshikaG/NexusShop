import { createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Constants } from "../../../utils/constants";
import { LoginReqModel, LoginResponseData } from "../../../models/auth/loginModels";
import { SignupReqModel, SignupResponseData } from "../../../models/auth/signupModels";
import { loginApi, signupApi } from "../../../services/services";
import { AppUrls } from "../../../utils/urls";

export const loginUser = createAsyncThunk(
    AppUrls.loginUrl,
    async (reqModel: LoginReqModel, { rejectWithValue }) => {
        try {
            const data = await loginApi(reqModel);
            // console.log('Raw API response:', data);

            const parsedData: LoginResponseData = JSON.parse(data);
            // console.log('Parsed API response:', parsedData.data.data.accessToken);


            if (parsedData.success === false) {
                return rejectWithValue(parsedData.message || 'Login failed from API response');
            }

            if (!parsedData.data) {
                console.error("login parsedData:", parsedData);
                return rejectWithValue('Invalid login response: data is missing.');
            }

            // Check if the access token exists in the response
            if (!parsedData.data || !parsedData.data.accessToken) {
                console.error("Access token not found in response:", parsedData);
                return rejectWithValue('Access token not found in response');
            }

            const token = parsedData.data.accessToken;
            const userData = parsedData.data;

            console.log('Access token:', token);
            console.log('User data:', userData);

            // Store token and user data in AsyncStorage
            try {
                await AsyncStorage.setItem(Constants.token, token);
                await AsyncStorage.setItem(Constants.isLoggedIn, 'true');
                console.log('Token and user data stored successfully');
            } catch (storageError) {
                console.error('Failed to store token/user data:', storageError);
            }

            return parsedData;

        } catch (error: any) {
            console.error('Login error:', error);
            if (error instanceof SyntaxError) {
                return rejectWithValue('Failed to parse API response. Invalid JSON.');
            }
            return rejectWithValue(error.message || 'Network error during login');
        }
    }
);

export const signupUser = createAsyncThunk(
    AppUrls.signupUrl,
    async (reqModel: SignupReqModel, { rejectWithValue }) => {
        try {
            const data = await signupApi(reqModel);
            const parsedData: SignupResponseData = JSON.parse(data);
            console.log('Parsed API response:', parsedData.data);

            if (parsedData.success === false) {
                return rejectWithValue(parsedData.message || 'Signup failed from API response');
            }

            if (!parsedData.data) {
                console.error("login parsedData:", parsedData);
                return rejectWithValue('Invalid signup response: data is missing.');
            }

            return data;
        } catch (error: any) {
            console.error('Signup error:', error);
            return rejectWithValue(error.message || 'Network error during registration');
        }
    }
);

// Load user from storage
export const loadUserFromStorage = createAsyncThunk(
    'auth/loadFromStorage',
    async (_, { rejectWithValue }) => {
        try {
            const accessToken = await AsyncStorage.getItem(Constants.token);
            const isLoggedIn = await AsyncStorage.getItem(Constants.isLoggedIn);

              if (!accessToken) {
                return rejectWithValue('No token found');
              }

              if (!isLoggedIn) {
                return rejectWithValue('Please login.');
              }

            return {
                accessToken,
                isLoggedIn,
            };
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to load user');
        }
    }
);

// Logout async thunk
export const clearStorage = createAsyncThunk(
    'auth/clear_storage',
    async (_, { rejectWithValue }) => {
        try {
            await AsyncStorage.removeItem(Constants.token);
            await AsyncStorage.removeItem(Constants.isLoggedIn);
            return null;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Logout failed');
        }
    }
);