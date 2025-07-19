import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppUrls } from "../../../utils/urls";
import { ProductResponseData } from "../../../models/products/productsModel";
import { getProductsApi } from "../../../services/services";

export const fetchProducts = createAsyncThunk(
    AppUrls.productsUrl,

    async (page: number, { rejectWithValue }) => {
        try {
            const data = await getProductsApi(page);

            const parsedData: ProductResponseData = JSON.parse(data);

            if (parsedData.success === false) {
                console.log('fetchProducts parsedData: ', parsedData)
                return rejectWithValue(parsedData.message || 'Fetch failed from API response')
            }
            return parsedData;
        } catch (error: any) {
            console.log('fetchProducts error: ', error)
            return rejectWithValue(error.message || 'Network error during fetchProducts');
        }
    }
);