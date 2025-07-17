import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppUrls } from "../../../utils/urls";
import { UserResponseData } from "../../../models/user/userModels";
import { ApiResponse } from "../../../types/apiResponse";
import { fetchUserApi } from "../../../services/services";

export const fetchUserInfo = createAsyncThunk(
    AppUrls.loginUrl,

    async (_, { rejectWithValue }) => {
        try {
            const data = await fetchUserApi();

            const parsedData: ApiResponse<UserResponseData> = JSON.parse(data);
            if (parsedData.success === false) {
                return rejectWithValue(parsedData.message || 'Login failed from API response');
            }
            return parsedData;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Network error during login');
        }
    }
);