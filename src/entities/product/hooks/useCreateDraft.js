import { productApi } from '../../../shared/api/product'
import { useQuery } from 'react-query'
import { useEffect, useState } from 'react'

export const useCreateProdDraft = (product_id = null) => {

    const [draft, setDraft] = useState({})
    
    const {
        data,
        isLoading,
        isRefetching,
        refetch 
    } = useQuery(
        'keys1',
        () => {
            console.log('query ' + product_id)
            return productApi.createDraft({product_id})
        },
    )

    useEffect(() => {
        refetch()
    }, [product_id])

    useEffect(() => {
        if (data) {
            setDraft(data)
        }
    }, [data])

    return {
        draft,
        setDraft,
        isLoading,
        isRefetching
    }
}