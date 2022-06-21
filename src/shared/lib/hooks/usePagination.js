import React from 'react'
import { useState } from 'react'

export const usePagination = (params = {}) => {

    const { initialPage = 1, initialTake = 10 } = params

    const [page, setPage] = useState(initialPage)
    const [take, setTake] = useState(initialTake)
    const [total, setTotal] = useState(0)

    const setMeta = React.useCallback((meta) => {
        setPage(meta.page)
        setTake(meta.take)
        setTotal(meta.itemCount)
    }, [])

    const totalPages = Math.ceil(total / take)

    return { page, take, setMeta, total, totalPages, setPage };
}