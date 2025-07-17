import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi, signupApi } from "../../../services/services";
import { LoginReqModel, LoginResponseData } from "../../../models/auth/loginModels";
import { SignupReqModel } from "../../../models/auth/signupModels";
import { AppUrls } from "../../../utils/urls";
import { ApiResponse } from "../../../types/apiResponse";
import { AppDispatch } from "../../store";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../userSlice";

const dispatch: AppDispatch = useDispatch()

export const loginUser = createAsyncThunk(
    AppUrls.loginUrl,

    async (reqModel: LoginReqModel, { rejectWithValue }) => {
        try {
            const data = await loginApi(reqModel);

            const parsedData: ApiResponse<LoginResponseData> = JSON.parse(data);
            if (parsedData.success === false) {
                return rejectWithValue(parsedData.message || 'Login failed from API response');
            }
            dispatch(setUserInfo(parsedData.data.data));
            return parsedData;
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
