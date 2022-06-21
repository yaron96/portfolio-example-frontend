import { productApi } from '../../../shared/api/product'
import { useQuery } from 'react-query'
import { usePagination } from '../../../shared/lib/hooks/usePagination'
import { productKeys } from '../query-keys'

export const useProductList = () => {

    const pagination = usePagination()

    const params = { take: pagination.take, page: pagination.page }

    const query = useQuery(
        productKeys.list(params),
        () => productApi.getProducts(params),
        {
            onSuccess: (data) => {
                pagination.setMeta(data.meta)
            }
        }
    )

    return { query, pagination }
}