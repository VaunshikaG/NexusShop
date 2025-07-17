import { LoginResponseData } from "../../types/auth/loginModels";
import { SignupResponseData } from "../../types/auth/signupModels";

export interface AuthState {
    isLoggedIn: boolean;
    isLoading: boolean;
    apiSuccess: boolean;
    apiError: string | null;
    loginInfo: LoginResponseData | null;
    signupInfo: SignupResponseData | null;
}