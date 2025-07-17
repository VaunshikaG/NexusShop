export interface AuthState {
    isLoggedIn: boolean;
    isLoading: boolean;
    apiSuccess: boolean;
    apiError: string | null;
    token: string | null;
}