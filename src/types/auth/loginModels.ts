export interface LoginResponseData {
  statusCode: number;
  data: Data;
  message: string;
  success: boolean;
}

interface Data {
  user: User;
  accessToken: string;
  refreshToken: string;
}

interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
  loginType: string;
  isEmailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  avatar: Avatar;
}

interface Avatar {
  url: string;
  localPath: string;
  _id: string;
}


export interface LoginReqModel {
  email: string;
  password: string;
};