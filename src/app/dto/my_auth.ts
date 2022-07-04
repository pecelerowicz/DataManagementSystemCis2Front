export interface ChangePasswordRequest {
    newPassword: string;
}

export interface ChangePasswordResponse {
    message: string;
}

export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    authenticationToken: string;
    expiresAt: Date;
    refreshToken: string;
    username: string;
}