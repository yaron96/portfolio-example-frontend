import { useState } from 'react'
import { CurrentView } from './current-view'
import { Slider } from './slider'
import styled from 'styled-components'

export const DraftFormGallery = ({ id, images }) => {
    const [selected, setSelected] = useState(false)

    return (
        <Styled className='images-gallery'>
            <div className='images-gallery-form'>
                <CurrentView
                    image={selected}
                ></CurrentView>
                <Slider
                    id={id}
                    images={images}
                    selected={selected}
                    setSelected={setSelected}
                ></Slider>
            </div>
        </Styled>
    )
}

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


