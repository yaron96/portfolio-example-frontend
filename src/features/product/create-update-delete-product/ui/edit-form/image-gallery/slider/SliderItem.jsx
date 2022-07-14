import { DeleteOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react"
import { ImageUtil } from "shared/utils/ImageUtil";

export const SliderItem = ({
    index,
    link,
    dragStart,
    dragEnter,
    dragEnd,
    onSelect,
    onDelete,
    opts 
}) => {
    const [classArr, setClassArr] = useState([]);

    useEffect(() => {
        const classArr = ["image-frame"];
        if (opts.main) classArr.push("mainimage");
        if (opts.selected) classArr.push("selected");
        if (opts.draggable) classArr.push("draggable");
        setClassArr(classArr);
    }, [opts]);

    return (
        <div
            className={classArr.join(" ")}
            onDragStart={() => dragStart(link)}
            onDragEnd={() => dragEnd()}
            onDragEnter={() => dragEnter(link)}
            key={index}
        >
            <h1>{index === 0 ? "1 main" : index + 1}</h1>
            <img
                onClick={() => onSelect(link)}
                src={ImageUtil.getUrl(link, true)}
                // alt={link}
            ></img>
            <DeleteOutlined
                onClick={() => onDelete(link)}
                size="large"
            ></DeleteOutlined>
        </div>
    );
};