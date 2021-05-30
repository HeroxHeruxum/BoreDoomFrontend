import React, {useEffect, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import "./luckyStrike.scss";
import {State} from "../../reducer";
import {fetchLuckyStrike, toggleIsBookmark} from "../media/mediaActions";
import {Visible} from "../visible/visible";
import { MediaElement } from "../mediaElement/mediaElement";


export function LuckyStrike() {
    const {isLoading, media, bookmarkIds} = useSelector((state: State) => ({
        isLoading: state.media.isLoading,
        media: state.media.media,
        bookmarkIds: state.media.bookmarkIds
    }));
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchLuckyStrike())
    }, [dispatch]);


    const mediaTypeTitle = useMemo(() => {
        return media[0]?.mediaType === "BOOK" ? "Buch" : "Film"
    }, [media]);

    return (
        <div className="media">
            <p className="informationText">
                Du weißt überhaupt nicht, wonach dir gerade ist? Dann bist du
                hier genau richtig, denn hier bekommst du zufällig ein Buch
                oder einen Film von uns vorgeschlagen.
            </p>
            <Visible if={isLoading}>
                <p className="loading">
                    lädt Vorschlag...
                </p>
            </Visible>
            <Visible if={!isLoading}>
                <Visible if={media.length === 0}>
                    <p className="noResults">
                        kein Ergebnis gefunden
                    </p>
                </Visible>
                <Visible if={media.length > 0}>
                    <p className="informationText">
                        {`Wie wäre es beispielsweise mit folgendem ${mediaTypeTitle}?`}
                        <br/>
                    </p>
                    <MediaElement {...media[0]}
                                  isBookmarkView={false}
                                  isBookmark={bookmarkIds.includes(media[0]?.id)}
                                  toggleIsBookmark={toggleIsBookmark}/>
                </Visible>
            </Visible>
        </div>
    );
}