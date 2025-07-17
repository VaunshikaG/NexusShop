import { LoginData } from "../../models/auth/loginModels";

export interface AuthState {
    isLoggedIn: boolean;
    isLoading: boolean;
    apiSuccess: boolean;
    apiError: string | null;
    userData: LoginData | null;
}