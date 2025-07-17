import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi, signupApi } from "../../../services/services";
import { LoginReqModel, LoginResponseData } from "../../../models/auth/loginModels";
import { SignupReqModel } from "../../../models/auth/signupModels";
import { AppUrls } from "../../../utils/urls";
import { ApiResponse } from "../../../types/apiResponse";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Constants } from "../../../utils/constants";

export const loginUser = createAsyncThunk(
    AppUrls.loginUrl,

    async (reqModel: LoginReqModel, { rejectWithValue }) => {
        try {
            const data = await loginApi(reqModel);

            const parsedData: ApiResponse<LoginResponseData> = JSON.parse(data);
            if (parsedData.success === false) {
                return rejectWithValue(parsedData.message || 'Login failed from API response');
            }

            if (!parsedData.data) {
                console.error("login parsedData:", parsedData);
                return rejectWithValue('Invalid login response: data is missing.');
            }

            const token = parsedData.data.data.accessToken;
            console.log(token)
            // await AsyncStorage.setItem(Constants.token, token);
            // await AsyncStorage.setItem(Constants.isLoggedIn, 'true');
            return parsedData;

        } catch (error: any) {
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
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Network error during registration');
        }
    }
);
