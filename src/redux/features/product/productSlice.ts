import { createSlice } from "@reduxjs/toolkit";
import { ProductsState } from "../../state/productsState";
import { fetchProducts } from "./productTrunk";
import { Constants } from "../../../utils/constants";

const initialState: ProductsState = {
    productsData: null,
    apiError: null,
    isLoading: false,
    success: false,
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        clearProducts: state => initialState,
    },
    extraReducers(builder) {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.isLoading = true;
                state.success = false;
                state.apiError = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.productsData = action.payload.products;
                state.isLoading = false;
                state.success = true;
                state.apiError = null;
                console.log('get_products fulfilled: ', action.payload);
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.success = false;
                state.apiError = (action.payload as string) || action.error.message || Constants.error;
                console.log('get_products reject: ', state.apiError)
            });
    }
});

export const { clearProducts } = productSlice.actions;
export default productSlice.reducer;