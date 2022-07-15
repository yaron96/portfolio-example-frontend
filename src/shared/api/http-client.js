import axios from "axios";
import { API_URL } from "shared/lib/config";
import { TokenStorage } from "shared/lib/token";

export class HttpClientService {
    constructor() {
        const service = axios.create({
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
        });

        service.defaults.baseURL = API_URL;
        service.defaults.withCredentials = true;

        service.interceptors.request.use(this.handleRequest);
        service.interceptors.response.use(
            this.handleResponseSuccess,
            this.handleResponseError
        );

        this.service = service;
    }

    handleRequest = (request) => {
        if (TokenStorage.getToken()) {
            request.headers.Authorization = TokenStorage.getBearer();
        }
        return request;
    };

    handleResponseSuccess = (response) => {
        return response;
    };

    handleResponseError = async (error) => {
        console.log('handle error')
        const orirginalRequest = error.config;
        if(error.response.status === 401) {
            try {
                const response = await axios.get(
                    `${API_URL}/auth/refresh`,
                    {withCredentials: true}
                );
                TokenStorage.storeToken(response.data);
                return this.service.request(orirginalRequest);
            } catch (error) {
                console.log('not authorized')
            }
        }
    };

    get(url, params, configs) {
        return this.service
            .request({
                url,
                params,
                method: "GET",
                responseType: "json",
                ...configs,
            })
            .then(this.processResponse);
    }

    patch(url, data, configs) {
        return this.service
            .request({
                url,
                data,
                method: "PATCH",
                responseType: "json",
                ...configs,
            })
            .then(this.processResponse);
    }

    post(url, data, configs) {
        return this.service
            .request({
                url,
                data,
                method: "POST",
                responseType: "json",
                ...configs,
            })
            .then(this.processResponse);
    }

    put(url, data, configs) {
        return this.service
            .request({
                url,
                data,
                method: "PUT",
                responseType: "json",
                ...configs,
            })
            .then(this.processResponse);
    }

    delete(url, configs) {
        return this.service
            .request({
                url,
                method: "DELETE",
                responseType: "json",
                ...configs,
            })
            .then(this.processResponse);
    }

    processResponse = (response) => {
        return response.data;
    };
}

export const httpClient = new HttpClientService();
