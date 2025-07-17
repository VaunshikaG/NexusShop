import Snackbar from "react-native-snackbar";
import { ApiResponse } from "../types/apiResponse";
import { LoginReqModel, LoginResponseData } from "../types/auth/loginModels";
import { SignupReqModel, SignupResponseData } from "../types/auth/signupModels";
import { Constants } from "../utils/constants";
import { AppUrls } from "../utils/urls";

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
        return data;

    } catch (error: any) {
        console.error('Login API Error:', error);
        throw new Error(error.message || Constants.networkError);
    }
};

export const signupApi = async (reqModel: SignupReqModel): Promise<SignupResponseData> => {
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
        const data: ApiResponse<SignupResponseData> = await response.json();

        if (!response.ok || data.success === false && data.statusCode === 200) {
            Snackbar.show({
                text: data.message || Constants.loginFail,
                duration: Snackbar.LENGTH_SHORT,
            })
        }
        return data.data;

    } catch (error: any) {
        console.error('Register API Error:', error);
        throw new Error(error.message || Constants.networkError);
    }
};

