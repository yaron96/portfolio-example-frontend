import { ListItemImage } from './ListItemImage.jsx'
import { List } from 'antd'
import styled from 'styled-components'

const Styled = styled(List.Item)`
    .price-row {
        display: flex;
        align-items: center;

        span {
            margin: 2px;
        }
    }
`

export const ListItem = ({product, onClick}) => {

    return (
        <Styled
            className='productlist-item'
            key={product._id}
            onClick={onClick}
            extra={
            <ListItemImage
                image_id={product.images[0]}
            ></ListItemImage>
            }
        >
            <List.Item.Meta
                title={product.title}
                description={product.description}
            ></List.Item.Meta>
            <div className='price-row'>
                <span>Price:</span>
                <span>{product.price}</span>
            </div>
        </Styled>
    )
}
