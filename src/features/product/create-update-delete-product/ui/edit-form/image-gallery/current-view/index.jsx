import { Image as ImageAntd } from "antd";
import { useState, useEffect, useCallback } from "react";
import { ImageUtil } from "shared/utils/ImageUtil";
import styled from "styled-components";

export const CurrentView = ({ image }) => {
    const [src, setSrc] = useState("");
    const [blur, setBlur] = useState(true);

    const fetch = useCallback(() => {
        const img = new Image();
        img.src = ImageUtil.getUrl(image, false);
        img.addEventListener(
            "load",
            () => {
                setSrc(img.src);
                setBlur(false);
            },
            false
        );
    });

    useEffect(() => {
        if (!blur) setBlur(true);
        if (image) {
            setSrc(image.url);
            fetch();
        }
    }, [image]);

    return (
        <Styled
            className="image-currentview"
            style={image ? { height: "40vh" } : {}}
        >
            {image ? (
                <div className="image-area">
                    <ImageAntd
                        className={blur ? "image blured" : "image"}
                        src={src}
                    ></ImageAntd>
                </div>
            ) : (
                <h1>no image</h1>
            )}
        </Styled>
    );
};

const Styled = styled.div`
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
            filter: blur(0.25rem);
        }

        .fullscreen {
            //position: absolute;
            width: 100%;
            height: 100%;
            background: black;
        }
    }
`;
