import { InputNumber } from 'antd'
import { useEffect, useState } from 'react';
import styled from 'styled-components'

export const Price = ({setFilter}) => {
    const [min, setMin] = useState(false)
    const [max, setMax] = useState(false)

    useEffect(() => {
        setFilter((filter) => {
            if (min) {
                return {
                    ...filter,
                    minPrice: min
                    
                }
            } else {
                delete filter.minPrice
                return {...filter}
            }
        })
    }, [min])

    useEffect(() => {
        setFilter((filter) => {
            if (max) {
                return {
                    ...filter,
                    maxPrice: max
                    
                }
            } else {
                delete filter.maxPrice
                return {...filter}
            }
        })
    }, [max])

    return (
        <Styled>
            <div className="price-range">
                <h3 className="title">Price:</h3>
                <div className="form">
                    <InputNumber
                        value={min}
                        onChange={setMin}
                        min={0}
                        controls={false}
                    ></InputNumber>
                    <h3>-</h3>
                    <InputNumber
                        value={max ? max : ''}
                        onChange={setMax}
                        min={0}
                        controls={false}
                    ></InputNumber>
                </div>
            </div>
        </Styled>
    );
}

const Styled = styled.div`
    width: 100%;

    .form {
        display: flex;
        flex-direction: row;
    }
`