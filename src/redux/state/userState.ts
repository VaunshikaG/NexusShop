import { UserData } from "../../models/user/userModels";

export interface UserInfoState {
      statusCode: number | null;
      data: UserData | null;
      success: boolean;
      isLoading: boolean;
      apiError: string | null;
      message: string | null;
}