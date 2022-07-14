import { useDraggable } from 'features/product/create-update-delete-product/hooks/useDraggable'
import { SliderItem } from './SliderItem'
import { PlusCircleOutlined } from '@ant-design/icons'
import styled from 'styled-components'

export const SliderItems = ({
    images,
    selected,
    setSelected,
    fetchSorted,
    fetchUpload,
    fetchDelete
}) => {
    const {
        sortedImages,
        dragStart,
        dragEnter,
        dragEnd,
        draggableLink,
    } = useDraggable(images, fetchSorted)

    async function handleFileInput(e) {
        fetchUpload([...e.target.files])
    }

    function onSelect(value) {
        setSelected(value)
    }

    return (
        <Styled className='images-gallery-slider-items'>
            {sortedImages.map((link, index) =>
                <SliderItem
                    key={index}
                    index={index}
                    link={link}
                    dragStart={dragStart}
                    dragEnd={dragEnd}
                    dragEnter={dragEnter}
                    onSelect={onSelect}
                    onDelete={fetchDelete}
                    opts=
                    {{
                        selected: selected === link ? true : false,
                        main: index === 0,
                        draggable: link.link === draggableLink
                    }}
                ></SliderItem>
            )}
            <label className='add-button'>
                <input
                    style={{display: 'none'}}
                    type='file'
                    multiple
                    onChange={handleFileInput}
                ></input>
                <PlusCircleOutlined/>
            </label>
        </Styled>
    )
}

const Styled = styled.div`
    display: flex;
    width: fit-content;
    overflow-x: auto;
    height: 10vh;

    .image-frame {
        position: relative;
        height: 100%;
        min-width: 6vw;
        width: fit-content;
        margin-right: 8px;
        border-radius: 8%;

        img {
            transition-duration: 0.4s;
            height: 100%;
            border-radius: 8%;
        }

        h1 {
            background-color: white;
            position: absolute;
            top: 0px;
        }

        span {
            position: absolute;
            top: 0px;
            right: 0px;
            font-size: 26px;
            background-color: white;
        }
    }

    .selected {

        img {
            opacity: 0.25;
        }
    }

    .draggable {
        border: 5px dotted violet;
    }
`