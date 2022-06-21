import { useState } from 'react'
import styled from 'styled-components'
import { useProductList } from '../../entities/product/hooks/useProductList'
import { ProductFilter } from '../../widgets/product/filter'
import { ProductList } from '../../widgets/product/list'
import { ProductSort } from '../../widgets/product/sort'

export const ProductsPage = () => {

    const { query, pagination } = useProductList()

    const [filter, setFilter] = useState({})
    const [sort, setSort] = useState({})

    return (
        <Styled className='products-page'>
            <ProductFilter
                setFilter={setFilter}
            />
            <ProductList
                products={query.data?.data}
                isLoading={query.isLoading}
                filter={filter}
                sort={sort}
            />
            <ProductSort
                setSort={setSort}
            />
        </Styled>
    )
}

const Styled = styled.div`
    display: grid;
    grid-template-columns: minmax(0,0.7fr) minmax(0,2.5fr) minmax(0,15rem);
    grid-gap: 3rem;
    flex: 1 1 auto;
    width: 100%;

`