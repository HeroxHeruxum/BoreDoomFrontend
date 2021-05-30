import React, {useEffect, useCallback, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import "./media.scss";
import {MediaObject} from "../../misc/types";
import {State} from "../../reducer";
import {fetchBookmarks, fetchResults, toggleIsBookmark} from "./mediaActions";
import {Visible} from "../visible/visible";
import {MediaTypeElement} from "../mediaTypeElement/mediaTypeElement";


interface MediaProps {
    isBookmarkView: boolean
}

export function Media(props: MediaProps) {
    const {isBookmarkView} = props;
    const {isLoggedIn, isLoading, media, bookmarkIds} = useSelector((state: State) => ({
        isLoggedIn: !!state.login.loggedInUsername,
        isLoading: state.media.isLoading,
        media: state.media.media,
        bookmarkIds: state.media.bookmarkIds
    }));
    const dispatch = useDispatch();

    useEffect(() => {
        if (isBookmarkView && isLoggedIn) {
            fetchBookmarks()
        } else if (!isBookmarkView) {
            dispatch(fetchResults())
        }
    }, [isBookmarkView, isLoggedIn, dispatch]);


    const emptyElement = useMemo(() => {
        if (isBookmarkView) {
            return <p className="emptyElement">
                Es befinden sich keine Medien auf deiner Merkliste. Zum
                Hinzufügen drücke bei den Ergebnissen deiner Suche auf den
                Stern oben rechts.
            </p>
        } else {
            return <p className="noResults">
                keine Ergebnisse gefunden
            </p>
        }
    }, [isBookmarkView]);

    const getMediaTypeTitle = useCallback((mediaType: string) => {
        return mediaType === "BOOK" ? "Bücher" : "Filme"
    }, []);

    const mediaTypesMedia = useMemo(() => {
        return media
            .filter(m => !isBookmarkView || bookmarkIds.includes(m.id))
            .reduce((acc, curr) => {
                const previousTypeMedia = acc[curr.mediaType] || [];
                return {...acc, [curr.mediaType]: [...previousTypeMedia, curr]}
            }, {} as { [mediaType: string]: MediaObject[] })
    }, [isBookmarkView, media, bookmarkIds]);

    const mediaTypeElements = useMemo(() => {
        return Object.entries(mediaTypesMedia)
            .map(([mediaType, media]) => {
                const title = getMediaTypeTitle(mediaType);
                return [title, media] as [string, MediaObject[]]
            })
            .sort(([title1, _1], [title2, _2]) => {
                return title1.toLowerCase < title2.toLowerCase ? 1 : -1
            })
            .map(([title, media]) => {
                return <MediaTypeElement title={title} media={media}
                                         isBookmarkView={isBookmarkView}
                                         bookmarkIds={bookmarkIds}
                                         toggleIsBookmark={toggleIsBookmark}/>
            })
    }, [mediaTypesMedia, getMediaTypeTitle, isBookmarkView, bookmarkIds, toggleIsBookmark]);

    return (
        <div className="media">
            <Visible if={!isLoggedIn && isBookmarkView}>
                <p className="informationText">
                    Registrierte Nutzer können Medien aus den Ergebnissen
                    ihrer Suchen zu ihrer Merkliste hinzufügen und sich hier
                    wieder ansehen. Zum Anmelden oder Registrieren drück
                    bitte oben rechts.
                </p>
            </Visible>
            <Visible if={isLoggedIn || !isBookmarkView}>
                <Visible if={isLoading}>
                    <p className="loading">
                        lädt Ergebnisse...
                    </p>
                </Visible>
                <Visible if={!isLoading}>
                    <Visible if={media.length === 0}>
                        {emptyElement}
                    </Visible>
                    <Visible if={media.length > 0}>
                        {mediaTypeElements}
                    </Visible>
                </Visible>
            </Visible>
        </div>
    )
}