import { useProductList } from 'entities/product/hooks/useProductList'
import { ProductFilter } from "features/product/filter"
import { ProductSort } from 'features/product/sort'
import { ProductList } from 'widgets/product/list'
import styled from 'styled-components'

export const ProductsPage = () => {

    const {
        query,
        pagination,
        setFilter,
        setSort 
    } = useProductList()

    return (
        <Styled className='products-page'>
            <ProductFilter
                setFilter={setFilter}
            />
            <ProductList
                products={query.data?.data}
                pagination={pagination}
                isLoading={query.isLoading}
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
    width: 1320px;

`