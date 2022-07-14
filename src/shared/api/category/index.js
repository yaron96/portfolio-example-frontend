import { httpClient } from "shared/api/http-client"

const getTree = (params) => {
    return httpClient.get('product/category', params)
}

const update = (id, updates) => {
    return httpClient.put(`product/category/${id}`, updates)
}

const create = (params) => {
    return httpClient.post('product/category', params)
}

const remove = (id) => {
    return httpClient.delete(`product/category/${id}`)
}

const move = (id, params) => {
    return httpClient.put(`product/category/${id}/move`, params)
}

export const categoryApi = {
    getTree,
    create,
    remove,
    update,
    move,
}
