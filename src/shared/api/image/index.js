import axios from 'axios'

export class ImageService {

    static async load(model, imgId) {
        const res = await axios({
            url: `http://localhost:8081/image/${model.name}/${model.id}/${imgId}`,
            method: 'GET',
            responseType: 'blob'
        })
        res.data.name = imgId
        return res.data
    }
}
