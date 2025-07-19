import { ProductData } from "../../models/products/productsModel";

export interface ProductsState {
    data: ProductData | null;
    success: boolean;
    isLoading: boolean;
    apiError: string | null;
}