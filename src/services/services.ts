import { ApiResponse } from "../types/apiResponse";
import { LoginReqModel, LoginResponseData } from "../types/auth/loginModels";
import { SignupReqModel, SignupResponseData } from "../types/auth/signupModels";
import { AppUrls } from "../utils/urls";

export const loginApi = async (reqModel: LoginReqModel): Promise<LoginResponseData> => {
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
        const data: ApiResponse<LoginResponseData> = await response.json();

        if (!response.ok || data.success === false) {
            throw new Error(data.message || 'Login failed');
        }
        return data.data;

    } catch (error: any) {
        console.error('Login API Error:', error);
        throw new Error(error.message || 'Network error during login');
    }
};

export const signupApi = async (reqModel: SignupReqModel): Promise<SignupResponseData> => {
    const url = AppUrls.appUrl + AppUrls.signupUrl;
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
        const data: ApiResponse<SignupResponseData> = await response.json();

        if (!response.ok || data.success === false) {
            throw new Error(data.message || 'Registration failed');
        }
        return data.data;

    } catch (error: any) {
        console.error('Register API Error:', error);
        throw new Error(error.message || 'Network error during registration');
    }
};

