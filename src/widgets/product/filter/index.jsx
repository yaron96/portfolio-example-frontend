import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Category } from './Category'

export const ProductFilter = ({setFilter}) => {
    const [category, setCategory] = useState([])

    useEffect(async () => {
        setFilter((filter) => {
            return { ...filter, category}
        })
    }, [category])

    return (
        <Styled className='productfilter'>
            <Category
                setCategory={setCategory}
            ></Category>
        </Styled >

    )
}

const Styled = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    background: #c8eaff;
`