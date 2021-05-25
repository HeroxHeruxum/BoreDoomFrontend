import React, {useMemo} from "react";
import "./mediaTypeElement.scss";
import {MediaObject} from "../../misc/types";
import {MediaElement} from "../mediaElement/mediaElement";


interface MediaTypeElementProps {
    title: string,
    media: MediaObject[],
    isBookmark: boolean,
    toggleIsBookmark: (id: number, mediaType: string) => void
}

export function MediaTypeElement(props: MediaTypeElementProps) {
    const {title, media, isBookmark, toggleIsBookmark} = props;

    const mediaElements = useMemo(() => {
        return media.map(medium => {
            return <MediaElement {...medium} isBookmark={isBookmark}
                                  toggleIsBookmark={toggleIsBookmark}/>
        })
    }, [media, isBookmark, toggleIsBookmark]);


    return (
        <div className="mediaTypeElement">
            <div className="mediaTypeTitle">
                {title}
            </div>
            {mediaElements}
        </div>
    );

}