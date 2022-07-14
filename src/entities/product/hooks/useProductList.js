import { useState } from 'react'
import { useQuery } from 'react-query'
import { usePagination } from 'shared/lib/hooks/usePagination'
import { productKeys } from "entities/product/query-keys"
import { productApi } from 'shared/api/product'
import { SORT_BY } from 'shared/lib/constants'

export const useProductList = () => {
    const [filter, setFilter] = useState({})
    const [sort, setSort] = useState(SORT_BY.CREATED_AT_DESC)

    const pagination = usePagination()

    const params = {
        take: pagination.take,
        page: pagination.page,
        ...filter,
        sort,
    }

    const query = useQuery(
        productKeys.list(params),
        () => productApi.getProducts(params),
        {
            onSuccess: (data) => {
                pagination.setMeta(data.meta)
            }
        }
    )

    return {
        query,
        pagination,
        setFilter,
        setSort,
    }
}

