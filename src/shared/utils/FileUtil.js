export class FileService {
    
    static async getAsDataUrl(file) {
        const reader = new FileReader()
        return new Promise((resolve, reject) => {
            reader.onerror = () => {
                reader.abort()
                reject('file reader problem')
            }
            reader.onload = () => 
                resolve(reader.result)
            reader.readAsDataURL(file)
        })
    }

}
