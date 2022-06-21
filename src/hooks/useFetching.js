import { useState } from "react"

export const useFetching = (callback) => {

    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const fetch = async (args) => {
        try {
            setIsLoading(true)
            const result = await callback(args)
            setData(result)
        } catch(e) {
            setError(e.message)
        } finally {
            setIsLoading(false)
        }
    }

    return {
        fetch,
        data,
        isLoading,
        error
    }
}
