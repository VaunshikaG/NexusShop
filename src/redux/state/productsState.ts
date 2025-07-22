import { Product } from "../../models/products/productsModel";

export interface ProductsState {
    productsData: Product[] | null;
    success: boolean;
    isLoading: boolean;
    apiError: string | null;
}