import React, {useMemo} from "react";
import "./mediaTypeElement.scss";
import {MediaObject} from "../../misc/types";
import {MediaElement} from "../mediaElement/mediaElement";


interface MediaTypeElementProps {
    title: string,
    media: MediaObject[],
    isBookmarkView: boolean,
    bookmarkIds: number[],
    toggleIsBookmark: (id: number, mediaType: string) => void
}

export function MediaTypeElement(props: MediaTypeElementProps) {
    const {title, media, isBookmarkView, bookmarkIds,toggleIsBookmark} = props;

    const mediaElements = useMemo(() => {
        return media.map(medium => {
            const isBookmark = bookmarkIds.includes(medium.id);
            return <MediaElement {...medium} isBookmarkView={isBookmarkView}
                                 isBookmark={isBookmark}
                                 toggleIsBookmark={toggleIsBookmark}
                                 />
        })
    },[]);


    return (
        <div className="mediaTypeElement">
            <div className="mediaTypeTitle">
                {title}
            </div>
            {mediaElements}
        </div>
    );

}