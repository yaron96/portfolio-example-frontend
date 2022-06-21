import axios from 'axios'
import { httpClient } from '../../http-client'

const getAll = (params) => {
    return httpClient.get('category', params)
}

const update = (id, updates) => {
    return httpClient.patch(`category/${id}`, updates)
}

const create = (params) => {
    return httpClient.post('category', params)
}

const remove = (id) => {
    return httpClient.delete(`category/${id}`)
}

export const categoryApi = {
    getAll,
    create,
    remove,
    update,
}
