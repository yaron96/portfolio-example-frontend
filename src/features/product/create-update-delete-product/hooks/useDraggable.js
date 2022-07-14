import { useEffect } from "react"
import { useState } from "react"

export const useDraggable = (images, onSort) => {
    const [sortedImages, setSortedImages] = useState([])
    const [draggableLink, setDraggableLink] = useState(null)
    const [beforeSortLinkArr, setBeforeSortLinks] = useState([])

    useEffect(() => {
        if (images) {
            setSortedImages(images)
        }
    }, [images])

    function dragStart(link) {
        setBeforeSortLinks(sortedImages)
        setDraggableLink(link)
    }

    function dragEnter(targetLink) {
        if (targetLink !== draggableLink)
            sort(draggableLink, targetLink)
    }

    function dragEnd() {
        setDraggableLink(null)
        if (isSorted()){
            console.log('sorted')
            onSort(sortedImages)
        }
    }

    function sort(draggableLink, targetLink) {
        const tempArr = [].concat(sortedImages)
        const draggableIndex = findIndexByLink(draggableLink)
        const targetIndex = findIndexByLink(targetLink)
        const draggable = tempArr.splice(draggableIndex, 1).pop()
        tempArr.splice(targetIndex, 0, draggable)
        setSortedImages(tempArr)
        console.log('sort func')
    }

    const findIndexByLink = (link) =>
        sortedImages.findIndex(i => i === link)

    const isSorted = () =>
        !sortedImages.every(
            (value, index) => value === beforeSortLinkArr[index]
        );

    return {
        sortedImages,
        dragStart,
        dragEnter,
        dragEnd,
        draggableLink,
    }
}