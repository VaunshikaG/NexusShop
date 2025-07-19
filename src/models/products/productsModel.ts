export interface ProductResponseData {
    statusCode: number;
    data: ProductData;
    message: string;
    success: boolean;
}

export interface ProductData {
    products: Product[];
    totalProducts: number;
    limit: number;
    page: number;
    totalPages: number;
    serialNumberStartFrom: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: null;
    nextPage: null;
}

export interface Product {
    _id: string;
    category: string;
    description: string;
    mainImage: Image;
    name: string;
    owner: string;
    price: number;
    stock: number;
    subImages: Image[];
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

export interface Image {
    url: string;
    localPath: string;
    _id: string;
}
