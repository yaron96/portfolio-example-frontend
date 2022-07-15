import { httpClient } from "shared/api/http-client"

const getProducts = (params) => {
    return httpClient.get('product', params)
}

const createProduct = (draftId) => {
    return httpClient.post(`product/${draftId}`)
}

const updateProduct = (draftId) => {
    return httpClient.put(`product/${draftId}`)
}

const deleteProduct = (productId) => {
    return httpClient.delete(`product/${productId}`)
}

export const productApi = {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
}