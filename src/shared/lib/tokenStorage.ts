interface TokenStorage {
    readonly getAccessToken: () => string | null;
    readonly getRefreshToken: () => string | null;
    readonly setAccessToken: (token: string) => void;
    readonly setRefreshToken: (refresh: string) => void;
    readonly clearTokens: () => void;
}


export const tokenStorage: TokenStorage = Object.freeze({
    getAccessToken: () => localStorage.getItem('token'),
    getRefreshToken: () => localStorage.getItem('refreshToken'),

    setAccessToken: (token: string) => localStorage.setItem('token', token),
    setRefreshToken: (refresh: string) => localStorage.setItem('refreshToken', refresh),

    clearTokens: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
    }
});

