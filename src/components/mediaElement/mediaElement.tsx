import React, { useCallback, useMemo } from "react";
import "./mediaElement.scss";
import {Media} from "../../misc/types";
import {Visible} from "../visible/visible";
import {Button} from "../button/button";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import StarBorderIcon from "@material-ui/icons/StarBorder";


interface MediaElementProps extends Media {
    isBookmark: boolean,
    toggleIsBookmark: (id: number, mediaType: string) => void
}

export function MediaElement(props: MediaElementProps) {
    const {
        id,
        mediaType,
        imgUrl,
        title,
        genre,
        producerUrl,
        isBookmark,
        toggleIsBookmark
    } = props;

    const bookmarkIconTitle = useMemo(() => {
        return isBookmark ? "Aus Merkliste entfernen" : "Zur Merkliste hinzufügen"
    }, [isBookmark]);
    const onClickBookmarkIcon = useCallback(() => {
        return toggleIsBookmark(id, mediaType)
    }, [id, mediaType, toggleIsBookmark]);

    return (
        <div className="mediaElement">
            <img className="mediaImage" alt="new" src={imgUrl}/>
            <div className="mediaContent">
                <div className="mediaTitle">
                    {title}
                </div>
                <div className="mediaGenre">
                    {genre}
                </div>
                <div className="linkButtonWrapper">
                    <Button type="link" title="Zum Hersteller" href={producerUrl}/>
                </div>
            </div>
            <div className="bookmarkIconWrapper">
                <Tooltip title={bookmarkIconTitle}>
                    <div className="bookmarkIcon">
                        <Visible if={isBookmark}>
                            <DeleteIcon className="deleteIcon"
                                        onClick={onClickBookmarkIcon}/>
                        </Visible>
                        <Visible if={!isBookmark}>
                            <StarBorderIcon className="addIcon"
                                            onClick={onClickBookmarkIcon}/>
                        </Visible>
                    </div>
                </Tooltip>
            </div>
        </div>
    );

}