import { ProductData } from "../../models/products/productsModel";

export interface ProductsState {
    productsData: ProductData | null;
    success: boolean;
    isLoading: boolean;
    apiError: string | null;
}