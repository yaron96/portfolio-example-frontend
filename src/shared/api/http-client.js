import axios, { Axios } from 'axios'
import { API_URL } from '../lib/config'
import { TokenStorage } from '../lib/token'

export const base_url = 'http://localhost:8081/'

export const $api = axios.create({
    withCredentials: true,
    baseURL: base_url
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

export class HttpClientService {

    constructor() {
        const service = axios.create({
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
        });
    
        service.defaults.baseURL = API_URL;
        service.defaults.withCredentials = true;
    
        service.interceptors.request.use(this.handleRequest);
        service.interceptors.response.use(
          this.handleResponseSuccess,
          this.handleResponseError,
        );
    
        this.service = service;
      }

    handleRequest = (request) => {
        if (TokenStorage.getToken()) {
            request.headers.Authorization = TokenStorage.getBearer();
        }
        return request;
    }

    handleResponseSuccess = (response) => {
      return response;
    };

    handleResponseError = (error) => {
      return error;
    };

    get(
      url,
      params,
      configs,
      ) {
        return this.service
            .request({
                url,
                params,
                method: 'GET',
                responseType: 'json',
                ...configs,
            })
            .then(this.processResponse);
    }

    patch(
      url,
      data,
      configs,
    ) {
      return this.service
        .request({
          url,
          data,
          method: 'PATCH',
          responseType: 'json',
          ...configs,
        })
        .then(this.processResponse);
    }

    post(
      url,
      data,
      configs,
    ) {
      return this.service
        .request({
          url,
          data,
          method: 'POST',
          responseType: 'json',
          ...configs,
        })
        .then(this.processResponse);
    }

    put(
      url,
      data,
      configs,
    ) {
      return this.service
        .request({
          url,
          data,
          method: 'PUT',
          responseType: 'json',
          ...configs,
        })
        .then(this.processResponse);
    }
  
    delete(
      url,
      configs,
    ) {
      return this.service
        .request({
          url,
          method: 'DELETE',
          responseType: 'json',
          ...configs,
        })
        .then(this.processResponse);
    }

    processResponse = (response) => {
      return response.data
    }
}

export const httpClient = new HttpClientService()