import { Datum } from "../models/products/productsModel";

// type
export type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  Login: undefined
  Signup: undefined;
  ForgotPassword: undefined;
  Details: {data: Datum};
  AddToCart: undefined;
  Favourites: undefined;
  Profile: undefined;
}
