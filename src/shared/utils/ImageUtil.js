export class ImageUtil {

    static getUrl(imageId, thumb = true) {
        const head = 'http://localhost:8081/image'
        const tail = `/${imageId}`
        if (!thumb) return head + tail
        else return head + '/thumb' + tail
    }
}
