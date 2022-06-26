import { httpClient } from '../http-client'

const getAll = (params) => {
    return httpClient.get('category', params)
}

const update = (id, updates) => {
    return httpClient.put(`category/${id}`, updates)
}

const create = (params) => {
    return httpClient.post('category', params)
}

const remove = (id) => {
    return httpClient.delete(`category/${id}`)
}

const move = (id, params) => {
    return httpClient.put(`category/${id}/move`, params)
}

export const categoryApi = {
    getAll,
    create,
    remove,
    update,
    move,
}
