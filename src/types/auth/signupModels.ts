export interface SignupResponseData {
    statusCode: number;
    data: Data;
    message: string;
    success: boolean;
}
interface Data {
    user: User;
}
interface User {
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

interface Avatar {
    url: string;
    localPath: string;
    _id: string;
}

export interface SignupReqModel {
    userName: string;
    email: string;
    password: string;
};