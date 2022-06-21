import { useEffect, useState } from 'react'
import { useFetching } from '../../../hooks/useFetching.js'
import { DraftService } from '../../api/product'
import { ImageUtil } from '../../utils/ImageUtil'
import { SliderItems } from './SliderItems'
import { Spin } from 'antd'
import styled from 'styled-components'

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

export const ImageSlider = ({id,  selected, images, onChange}) => {

    const [imageObjArr, setImageObjArr] = useState([])

    useEffect(() => {
        if (!imageObjArr.length) selected.set(false)
        else {
            if (!selected.get || !imageObjArr.find(img => img.link == selected.get.link))
                selected.set(imageObjArr[0])
        }
    }, [imageObjArr])

    useEffect(async() => {
        if (images) {
            const imageObjs = (images.map((link) => {
                const isThumb = true
                const url = ImageUtil.imagesGetUrl(link, isThumb)
                return {link, url}
            }))
            setImageObjArr(imageObjs)
        }
    }, [images])

    const {
        fetch: fetchSorted,
        data: sortData,
        isLoading: isSortedLoading,
        error: sortedError
    } = useFetching(() => DraftService.imagesSort(
            id, imageObjArr.map(image => image.link)))

    useEffect(() => {
        if (sortData) onChange(sortData)
    },[sortData])

    const {
        fetch: fetchUpload,
        data: uploadData,
        isLoading: isUploadLoading,
        error: uploadError
    } = useFetching((files) => DraftService.imagesUpload(id,files))

    useEffect(async() => {
        if (uploadData) onChange([...images, uploadData])
    }, [uploadData])

    const {
        fetch: fetchDelete,
        data: deleteData,
        isLoading: isDeleteLoading,
        error: deleteError
    } = useFetching((link) => DraftService.imagesDelete(id, link))

    useEffect(async() => {
        if (deleteData) onChange(images.filter(image => image != deleteData))
    }, [deleteData])

    return (
        <StyledGallerySlider className='images-gallery-slider'>
            <SliderItems
                images={{get: imageObjArr, set: setImageObjArr}}
                selected={selected}
                fetchSorted={fetchSorted}
                fetchUpload={fetchUpload}
                fetchDelete={fetchDelete}
            />
            {(isSortedLoading || isUploadLoading || isDeleteLoading) &&
                <div className='fetching-spin'>
                    <Spin/>
                </div>
            }
            {(sortedError || uploadError || deleteError) &&
                <div>Something wrong... :(</div>
            }
        </StyledGallerySlider>
    )
}
