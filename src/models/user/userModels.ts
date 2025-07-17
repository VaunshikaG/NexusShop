export interface UserResponseData {
    statusCode: number;
    data: UserData;
    message: string;
    success: boolean;
}

export interface UserData {
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
