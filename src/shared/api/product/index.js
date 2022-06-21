import axios from 'axios'
import { httpClient } from '../http-client'

const getProducts = (params) => {
    return httpClient.get('product', params)
}

const createProduct = (params) => {
    return httpClient.post('product', params)
}

const createDraft = (params) => {
    return httpClient.post('product/draft', params)
}

const updateProduct = (params) => {
    return httpClient.patch('product', params)
}

const updateDraft = (params) => {
    return httpClient.patch('product/draft', params)
}

export const productApi = {
    getProducts,
    createDraft,
    createProduct,
    updateProduct,
    updateDraft,
}

const MODEL_NAME = 'product'

export class DraftService {

    static async imagesUpload(draft_id, files) {
        const form = new FormData()
        files.map((file) => {
            form.append('files', file)
        })
        const res = await axios({
            method: 'post',
            url: `http://localhost:8081/${MODEL_NAME}/draft/images/upload/${draft_id}`,
            data: form
        })
        return res.data
    }

    static async imagesSort(draft_id, sortedLinks) {
        const res = await axios({
            method: 'post',
            url: `http://localhost:8081/${MODEL_NAME}/draft/images/sort/${draft_id}`,
            data: sortedLinks
        })
        return res.data
    }

    static async imagesDelete(draft_id, image_id) {
        const res = await axios({
            method: 'post',
            url: `http://localhost:8081/${MODEL_NAME}/draft/images/delete/${draft_id}/${image_id}`,
        })
        return res.data
    }
}