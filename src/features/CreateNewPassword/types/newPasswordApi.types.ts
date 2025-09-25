export interface DoNewPasswordRequest {
    email: string;
};

export interface ConfirmNewPasswordRequest {
    uidb64: string;
    token: string;
    new_password: string;
}