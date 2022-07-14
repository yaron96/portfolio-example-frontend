import { useEffect } from 'react'
import { useEditProductImages } from 'features/product/create-update-delete-product/hooks/useEditProductImages'
import { SliderItems } from './SliderItems'
import { Spin } from 'antd'
import styled from 'styled-components'

export const Slider = ({
    id, 
    selected,
    setSelected,
    images,
}) => {

    const {
        uploadImagesMutation,
        deleteImageMutation,
        sortImagesMutation,
        isLoading
    } = useEditProductImages(id)

    function onUpload(files) {
        uploadImagesMutation.mutateAsync(files)
    }

    function onDelete(link) {
        deleteImageMutation.mutateAsync(link)
    }

    function onSort(sorted) {
        sortImagesMutation.mutateAsync(sorted)
    }

    useEffect(() => {
        if (images) {
            if (!selected) {
                setSelected(images[0])
            }
        }
    }, [images, id])

    return (
        <StyledGallerySlider className='images-gallery-slider'>
            <SliderItems
                images={images}
                selected={selected}
                setSelected={setSelected}
                fetchSorted={onSort}
                fetchUpload={onUpload}
                fetchDelete={onDelete}
            />
            {(isLoading) &&
                <div className='fetching-spin'>
                    <Spin/>
                </div>
            }
            {/* {(sortedError || uploadError || deleteError) &&
                <div>Something wrong... :(</div>
            } */}
        </StyledGallerySlider>
    )
}

const StyledGallerySlider = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;

    .add-button {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        min-width: 6vw;
        background: rgba(0,170,255,0.1);
        border-radius: 8%;

        .anticon {
            font-size: 47px;
            color: #c8eaff;
        }
    }

    .fetching-spin {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        z-index: 1;
        width: 100%;
        height: 100%;
        background: #ffffffdb;
    }
`