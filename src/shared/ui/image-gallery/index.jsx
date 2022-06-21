import { useCallback, useEffect, useState } from 'react'
import { ImageSlider } from './ImageSlider.jsx'
import styled from 'styled-components'
import { ImageUtil } from '../../utils/ImageUtil'

const Styled = styled.div`

    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 12vh;

    .images-gallery-form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-items: center;
        width: 100%;

        .image-currentview {
            margin-bottom: 10px;
        }
    }
`

export const DraftFormGallery = ({ id, images, onChange }) => {

    const [selected, setSelected] = useState(false)

    return (
        <Styled className='images-gallery'>
            <div className='images-gallery-form'>
                <CurrentView
                    id={id}
                    image={selected}
                ></CurrentView>
                <ImageSlider
                    images={images}
                    onChange={onChange}
                    id={id}
                    selected={{get: selected, set: setSelected}}
                ></ImageSlider>
            </div>
        </Styled>
    )
}

const StyledCurrentView = styled.div`
        display: flex;
        align-items: center;
        justify-content: center;
        width: 90%;

        .image-area {
            display: flex;
            justify-content: center;
            width: 100%;
            height: 100%;

            img {
                max-width: 100%;
                max-height: 100%;
                border-radius: 2%;
            }

            .blured {
                filter: blur(0.25rem)
            }
        }
    `
const CurrentView = ({image}) => {

    const [src, setSrc] = useState('')
    const [blur, setBlur] = useState(true)

    const fetch = useCallback(() => {
        const img = new Image()
        img.src = ImageUtil.imagesGetUrl(image.link)
        img.addEventListener(
            'load',
            () => {
                setSrc(img.src)
                setBlur(false)
            },
            false
        )
    })

    useEffect(() => {
        if (!blur)
            setBlur(true)
        if (image) {
            setSrc(image.url)
            fetch()
        }
    }, [image])

    return (
        <StyledCurrentView className='image-currentview'
            style={image ? {height: '40vh'} : {}}
        >
            {image
                ?
                <div className='image-area'>
                    <img
                        className={blur ? 'image blured' : 'image'}
                        src={src}
                    ></img>
                </div>
                :
                <h1>no image</h1> 
        }
        </StyledCurrentView>
    )
}
