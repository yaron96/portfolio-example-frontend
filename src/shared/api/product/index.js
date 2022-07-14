import { httpClient } from "shared/api/http-client"

const getProducts = (params) => {
    return httpClient.get('product', params)
}

const createProduct = (params) => {
    return httpClient.post('product', params)
}

const updateProduct = (params) => {
    return httpClient.put('product', params)
}

export const productApi = {
    getProducts,
    createProduct,
    updateProduct,
}