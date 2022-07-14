import { httpClient } from "shared/api/http-client"

const registration = (params) => {
    return httpClient.post("auth/registration", params);
};

const login = (params) => {
    return httpClient.post("auth/login", params);
};

const logout = (params) => {
    return httpClient.post("auth/logout", params);
};

export const authApi = {
    registration,
    login,
    logout,
};