// import { LoginResponseData } from "../../types/auth/loginModels";
// import { SignupResponseData } from "../../types/auth/signupModels";
import { UserInfo } from "../../types/auth/userModel";

export interface AuthState {
    isLoggedIn: boolean;
    isLoading: boolean;
    apiSuccess: boolean;
    apiError: string | null;
    userInfo: UserInfo | null;
    apiMessage: string | null;
    // loginInfo: LoginResponseData | null;
    // signupInfo: SignupResponseData | null;
}