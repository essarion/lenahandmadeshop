export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponce {
    access: string;
    refresh: string;
}