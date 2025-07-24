// import { Product } from "../models/products/productsModel";
// import product1 from "../types/data"
import Product from "./productsData"

// type
export type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  Login: undefined
  Signup: undefined;
  ForgotPassword: undefined;
  Details: {data: Product};
  AddToCart: undefined;
  Favourites: undefined;
  Profile: undefined;
}
