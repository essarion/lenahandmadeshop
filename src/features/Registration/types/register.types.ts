export interface UserData {
    id: string;
    username: string;
    email: string;
};

export interface RegisterUserResponse {
    user: UserData;
    refresh: string;
    access: string;
};

export interface RegisterUserRequest {
    username: string;
    email: string;
    password: string;
};