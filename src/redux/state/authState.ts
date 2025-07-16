import { LoginResponseData } from "../../types/auth/loginModels";
import { SignupResponseData } from "../../types/auth/signupModels";

export interface AuthState {
    loading: boolean;
    success: boolean;
    error: string | null;
    loginInfo: LoginResponseData | null;
    signupInfo: SignupResponseData | null;
}

interface SignupAuthState {
    loading: boolean;
    error: string | null;
    userInfo: SignupResponseData["data"]["user"] | null;
    // userInfo: {
    //     id: string;
    //     userName: string;
    //     email: string;
    //     password: string;
    //     forgotPasswordToken: string;
    //     accessToken: string;
    // } | null;
}

interface LoginAuthState {
    loading: boolean;
    error: string | null;
    userInfo: LoginResponseData | null;
    // userInfo: {
    //     id: string;
    //     userName: string;
    //     email: string;
    //     password: string;
    //     forgotPasswordToken: string;
    //     accessToken: string;
    // } | null;
}
