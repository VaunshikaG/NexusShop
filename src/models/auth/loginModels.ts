export interface LoginResponseData {
  statusCode: number;
  data: Data;
  message: string;
  success: boolean;
}

export interface Data {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface User {
  _id: string;
  avatar: Avatar;
  username: string;
  email: string;
  role: string;
  loginType: string;
  isEmailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
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