export interface LoginResponseData {
  statusCode: number;
  data: LoginData;
  message: string;
  success: boolean;
}

export interface LoginData {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface User {
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

export interface Avatar {
  url: string;
  localPath: string;
  _id: string;
}


export interface LoginReqModel {
  username: string;
  password: string;
};