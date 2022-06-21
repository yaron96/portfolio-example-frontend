import { useEffect, useState, useRef } from 'react'

import styled from 'styled-components'
import { PlusCircleOutlined, DeleteOutlined } from '@ant-design/icons'

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

export const SliderItems = ({
    images,
    selected,
    fetchSorted,
    fetchUpload,
    fetchDelete
}) => {

    const slider = useRef()

    const [draggableLink, setDraggableLink] = useState(null)
    const [beforeSortLinkArr, setBeforeSortLinks] = useState([])

    async function handleFileInput(e) {
        fetchUpload([...e.target.files])
    }

    function dragStart(link) {
        setBeforeSortLinks(images.get.map(i => i.link))
        setDraggableLink(link)
    }

    function dragEnter(link) {
        if (link !== draggableLink)
            sort(draggableLink, link)
    }

    function dragEnd() {
        setDraggableLink(null)
        if (isSorted()) fetchSorted()
    }

    function selectImage(value) {
        selected.set(value)
    }

    function sort(draggableLink, targetLink) {
        const tempArr = [].concat(images.get)
        const draggableIndex = findIndexByLink(draggableLink)
        const targetIndex = findIndexByLink(targetLink)
        const draggable = tempArr.splice(draggableIndex, 1).pop()
        tempArr.splice(targetIndex, 0, draggable)
        images.set(tempArr)
    }

    const findIndexByLink = (link) =>
        images.get.findIndex(i => i.link === link)

    const isSorted = () =>
        !images.get.every(
            (val, index) => val.link === beforeSortLinkArr[index])

    return (
        <Styled className='images-gallery-slider-items' ref={slider}>
            {images.get.map((value, index) =>
                <SliderItem
                    key={index}
                    iterable={{index: index, value: value}}
                    drag={{start: dragStart, end: dragEnd, enter: dragEnter}}
                    func={{select: selectImage, delete: fetchDelete}}
                    opts=
                    {{
                        selected: selected.get.link === value.link ? true : false,
                        main: index===0,
                        draggable: value.link === draggableLink
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

const SliderItem = ({iterable, drag, func, opts}) => {

    const [classArr, setClassArr] = useState([])

    useEffect(() => {
        const classArr = ['image-frame']
        if (opts.main) classArr.push('mainimage')
        if (opts.selected) classArr.push('selected')
        if (opts.draggable) classArr.push('draggable')
        setClassArr(classArr)
    }, [opts])

    return (
        <div className={classArr.join(' ')}
            onDragStart={() => drag.start(iterable.value.link)}
            onDragEnd={() => drag.end()}
            onDragEnter={() => drag.enter(iterable.value.link)}
            key={iterable.index}
        >
            <h1>{iterable.index === 0 ? '1 main' : iterable.index+1}</h1>
            <img
                onClick={() => func.select(iterable.value)}
                src={iterable.value.url}
                alt={iterable.value.url}
            ></img>
            <DeleteOutlined
                onClick={() => func.delete(iterable.value.link)}
                size='large'
            ></DeleteOutlined>
        </div>
    )
}
