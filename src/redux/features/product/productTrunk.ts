import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppUrls } from "../../../utils/urls";
import { ProductResponseData } from "../../../models/products/productsModel";
import { getProductsApi } from "../../../services/services";

export const fetchProducts = createAsyncThunk(
    AppUrls.productsUrl,

    async (_, { rejectWithValue }) => {
        try {
            const data = await getProductsApi();

            const parsedData: ProductResponseData = JSON.parse(data);
            console.log(parsedData);

            if (!parsedData) {
                console.log('fetchProducts parsedData: ', parsedData)
                return rejectWithValue('Fetch failed from API response')
            }
            return parsedData;
        } catch (error: any) {
            console.log('fetchProducts error: ', error)
            return rejectWithValue(error.message || 'Network error during fetchProducts');
        }
    }
);