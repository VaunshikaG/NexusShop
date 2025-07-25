import { Product } from "../models/products/productsModel";
import { CartProduct } from "../models/products/cartModel";
// import product1 from "../types/data"

// type
export type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  Login: undefined
  Signup: undefined;
  ForgotPassword: undefined;
  Details: { data: Product };
  AddToCart: { data: CartProduct[] } | undefined; 
  Favourites: undefined;
  Profile: undefined;
}
