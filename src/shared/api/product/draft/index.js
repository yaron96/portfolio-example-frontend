import { httpClient } from 'shared/api/http-client'

const createDraft = (params) => {
    return httpClient.post('product/draft', params)
}

const updateDraft = (id, params) => {
    return httpClient.put(`product/draft/${id}`, params)
}

const imagesUpload = (id, files) => {
    const form = new FormData();
    files.map((file) => {
        form.append('files', file)
    })

    return httpClient.post(`product/draft/${id}/images`, form)
}

const imageDelete = (id, link) => {
    return httpClient.delete(`product/draft/${id}/images/${link}`)
}

const imagesSort = (id, sorted) => {
    return httpClient.put(`product/draft/${id}/images`, sorted)
}

export const draftApi = {
    createDraft,
    updateDraft,
    imagesUpload,
    imageDelete,
    imagesSort,
}

const MODEL_NAME = 'product'