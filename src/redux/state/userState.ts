import { UserData } from "../../models/user/userModels";

export interface UserInfoState {
      data: UserData | null;
      success: boolean;
      isLoading: boolean;
      apiError: string | null;
}