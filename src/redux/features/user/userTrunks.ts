import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppUrls } from "../../../utils/urls";
import { UserResponseData } from "../../../models/user/userModels";
import { fetchUserApi } from "../../../services/services";

export const fetchUserInfo = createAsyncThunk(
    AppUrls.loginUrl,

    async (_, { rejectWithValue }) => {
        try {
            const data = await fetchUserApi();

            const parsedData: UserResponseData = JSON.parse(data);
            if (parsedData.success === false) {
                console.log("fetchUser parsedData: ", parsedData);
                return rejectWithValue(parsedData.message || 'Fetch failed from API response');
            }
            return parsedData;
        } catch (error: any) {
            console.log('Signup error: ', error);
            return rejectWithValue(error.message || 'Network error during login');
        }
    }
);