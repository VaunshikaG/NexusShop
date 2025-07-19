import Snackbar from "react-native-snackbar";
import { LoginReqModel, LoginResponseData } from "../models/auth/loginModels";
import { SignupReqModel, SignupResponseData } from "../models/auth/signupModels";
import { Constants } from "../utils/constants";
import { AppUrls } from "../utils/urls";
import AsyncStorage from "@react-native-async-storage/async-storage";

// export const loginApi = async (reqModel: LoginReqModel): Promise<LoginResponseData> => {
export const loginApi = async (reqModel: LoginReqModel): Promise<string> => {
    const url = AppUrls.appUrl + AppUrls.loginUrl;

    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
        },
        body: JSON.stringify(reqModel),
    };

    try {
        const response = await fetch(url, options);
        // const data: ApiResponse<LoginResponseData> = await response.json();
        const data = await response.text();

        // return data.data;
        // console.log('api_data: ', data);
        
        return data;

    } catch (error: any) {
        console.error('Login API Error:', error);
        throw new Error(error.message || Constants.networkError);
    }
};

export const signupApi = async (reqModel: SignupReqModel): Promise<string> => {
    const url = AppUrls.appUrl + AppUrls.signupUrl;
    console.log(url);

    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
        },
        body: JSON.stringify(reqModel),
    };

    try {
        const response = await fetch(url, options);
        const data = await response.text();

        return data;

    } catch (error: any) {
        console.error('Register API Error:', error);
        throw new Error(error.message || Constants.networkError);
    }
};

export const fetchUserApi = async (): Promise<string> => {
    const url = AppUrls.appUrl + AppUrls.getUser;

    const token = await AsyncStorage.getItem(Constants.token);
    if (!token) throw new Error('No auth token found');

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            'Authorization': token,
        },
    };

    try {
        const response = await fetch(url, options);
        const data = await response.text();
        return data;

    } catch (error: any) {
        console.error('Register API Error:', error);
        throw new Error(error.message || Constants.networkError);
    }
};

export const getProductsApi = async (): Promise<string> => {
    const url = AppUrls.appUrl + AppUrls.productsUrl + '?page=1&limit=15&inc=all&query=all';

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
        }
    }

    try {
        const response = await fetch(url, options);
        const data = await response.text()
        return data;
    } catch (error: any) {
        console.error('Register API Error:', error);
        throw new Error(error.message || Constants.networkError);
    }
}