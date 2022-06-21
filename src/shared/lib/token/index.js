import { API_URL } from '../config'

export class TokenStorage {
    static LOCAL_STORAGE_ACCESS_TOKEN = 'access_token'
    static LOCAL_STORAGE_REFRESH_TOKEN = 'refresh_token'
    static LOCAL_STORAGE_TOKEN_EXP = 'token_expires_in'

    static refreshToken() {
        return new Promise((resolve, reject) => {
        return fetch(
            `${API_URL}auth/refresh?token=${TokenStorage.getRefreshToken()}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                },
            },
        )
        .then((response) => response.json())
            .then((tokens) => {
                if (tokens) {
                    TokenStorage.storeToken(tokens);
                    resolve(tokens.access_token);
                } else {
                    reject()
                }
            })
            .catch((error) => {
                reject(error)
            })
        })
  }

    static storeToken(token) {
        localStorage.setItem(
        TokenStorage.LOCAL_STORAGE_ACCESS_TOKEN,
        token.access_token,
    )
        localStorage.setItem(
            TokenStorage.LOCAL_STORAGE_REFRESH_TOKEN,
            token.refresh_token,
    )
  }

    static clear() {
        localStorage.removeItem(TokenStorage.LOCAL_STORAGE_ACCESS_TOKEN);
        localStorage.removeItem(TokenStorage.LOCAL_STORAGE_REFRESH_TOKEN);
        return null;
    }

    static getToken() {
        return localStorage.getItem(TokenStorage.LOCAL_STORAGE_ACCESS_TOKEN);
    }

    static getRefreshToken() {
        return localStorage.getItem(TokenStorage.LOCAL_STORAGE_REFRESH_TOKEN);
    }

    static getBearer(){
        return `Bearer ${TokenStorage.getToken()}`;
    }

    static getTokenExpires() {
        return localStorage.getItem(TokenStorage.LOCAL_STORAGE_TOKEN_EXP);
    }
}