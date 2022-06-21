import { useState, useEffect } from 'react'
import { ImageUtil } from '../../../shared/utils/ImageUtil'
import styled from 'styled-components'

export const ListItemImage = ({image_id}) => {

    const [url, setUrl] = useState('')

    useEffect(() => {
        if (image_id) {
            const isThumb = true
            setUrl(ImageUtil.imagesGetUrl(image_id, isThumb))
        }
    }, [image_id])

    return (
        <Styled className='item-image'>
            <div>
                {image_id
                    ?
                    <img
                        alt="logo"
                        src={url}
                    ></img>
                    :
                    <h1>No image</h1>
                }
            </div>
        </Styled>
    )
}

const Styled = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 270px;
    padding: 10px;
    background: rgb(204 242 255);

    img {
        width: 100%;
    }

    h1 {
        margin: 0;
    }
`