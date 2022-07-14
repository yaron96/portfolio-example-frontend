import { httpClient } from "shared/api/http-client";

const getCurrentUser = () => {
    return httpClient.get("user/me");
};

export const userApi = {
    getCurrentUser,
};