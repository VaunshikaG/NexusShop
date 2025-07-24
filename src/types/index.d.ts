import { Product } from "../models/products/productsModel";
// import products from "../types/data"

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
