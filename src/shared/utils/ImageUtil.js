export class ImageUtil {

    static imagesGetUrl(image_id, thumb = false) {
        const head = 'http://localhost:8081/image'
        const tail = `/${image_id}`
        if (!thumb) return head + tail
        else return head + '/thumb' + tail
    }
}
