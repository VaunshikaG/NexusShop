export interface SignupResponseData {
    statusCode: number;
    data: Data;
    message: string;
    success: boolean;
}
export interface Data {
    user: User;
}
export interface User {
    _id: string;
    username: string;
    email: string;
    // role: string;
    // loginType: string;
    // isEmailVerified: boolean;
    // createdAt: Date;
    // updatedAt: Date;
    // __v: number;
    // avatar: Avatar;
}

export interface Avatar {
    url: string;
    localPath: string;
    _id: string;
}

export interface SignupReqModel {
    username: string;
    email: string;
    password: string;
};