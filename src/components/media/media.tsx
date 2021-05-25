import React, {useEffect, useCallback, useMemo, useState} from "react";
import {useSelector} from "react-redux";
import "./media.scss";
import axios from "axios";
import {MediaObject} from "../../misc/types";
import {ReducerState} from "../../reducer";
import {showNotification} from "../notification/notificationActions";
import {Visible} from "../visible/visible";
import {MediaTypeElement} from "../mediaTypeElement/mediaTypeElement";


interface MediaProps {
    isBookmarkView: boolean
}

export function Media(props: MediaProps) {
    const {isBookmarkView} = props;

    const {isLoggedIn, answers} = useSelector((state: ReducerState) => ({
        isLoggedIn: !!state.login.loggedInUsername,
        answers: state.questions.answers
    }));

    const [isLoading, setIsLoading] = useState(false);
    const [fetchedData, setFetchedData] = useState<MediaObject[]>([]);
    const [bookmarkIds, setBookmarkIds] = useState<number[]>([]);
    
    const mockData = useMemo(() => {
        const mockMedia: MediaObject = {
            id: 1,
            mediaType: "BOOK",
            imageUrl: "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
            name: "Ein Unfassbar langer Titel damit ich den overflow testen kann und keine dumme URL verwenden muss",
            description: "Katzig",
            producerUrl: "https://www.youtube.com/watch?v=QoLUB0QkUaE"
        };
        return [{...mockMedia, mediaType: "MOVIE"}, {...mockMedia, id: 2}, {...mockMedia, id: 3}, {...mockMedia, id: 4}]
    }, []);

    useEffect(() => {
        //setFetchedData(mockData)
        //setBookmarkIds([1, 2])
        if (isBookmarkView && isLoggedIn) {
            setIsLoading(true);
            axios.get(`http://localhost:8082/user/favorites/`)
                .then((response) => {
                    setIsLoading(false);
                    setFetchedData(response.data);
                    setBookmarkIds(response.data.map((media: MediaObject) => media.id))
                })
                .catch(() => {
                    setIsLoading(false);
                    showNotification("activity", "Beschaffen der Daten")
                })
        } else if (!isBookmarkView) {
            setIsLoading(true);
            let firstPostReady = false;
            axios.post(`http://localhost:8082/getResults`, answers)
                .then((response) => {
                    firstPostReady ? setIsLoading(false) : firstPostReady = true;
                    setFetchedData(response.data)
                })
                .catch(() => {
                    firstPostReady ? setIsLoading(false) : firstPostReady = true;
                    showNotification("activity", "Beschaffen der Daten")
                });
            axios.get(`http://localhost:8082/user/favorites/`)
                .then((response) => {
                    firstPostReady ? setIsLoading(false) : firstPostReady = true;
                    setBookmarkIds(response.data.map((media: MediaObject) => media.id))
                })
                .catch(() => {
                    firstPostReady ? setIsLoading(false) : firstPostReady = true;
                    showNotification("activity", "Beschaffen der Daten")
                });
        }
    }, [isBookmarkView, isLoggedIn, answers, setIsLoading, setFetchedData, setBookmarkIds]);


    const addBookmark = useCallback((id: number, mediaType: string) => {
        axios.put(`http://localhost:8082/user/favorites/saveMedia?mediaId=${id}&mediaType=${mediaType}`)
            .then(() => {
                const updatedBookmarkIds = [...bookmarkIds, id];
                setBookmarkIds(updatedBookmarkIds)
            })
            .catch(() => showNotification("activity", "Hinzufügen zur Merkliste"))
    }, [bookmarkIds, setBookmarkIds]);

    const deleteBookmark = useCallback((id: number, mediaType: string) => {
        axios.put(`http://localhost:8082/user/favorites/deleteMedia?mediaId=${id}&mediaType=${mediaType}`)
            .then(() => {
                const updatedBookmarkIds = bookmarkIds.filter(bookmarkId => bookmarkId !== id);
                setBookmarkIds(updatedBookmarkIds)
            })
            .catch(() => showNotification("activity", "Entfernen von der Merkliste"))
    }, [bookmarkIds, setBookmarkIds]);

    const toggleIsBookmark = useCallback((id: number, mediaType: string) => {
        const isBookmark = bookmarkIds.includes(id);
        return isBookmark ? deleteBookmark(id, mediaType) : addBookmark(id, mediaType)
    }, [bookmarkIds, addBookmark, deleteBookmark]);


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

    const mediaTypesFetchData = useMemo(() => {
        return fetchedData
            .filter(media => !isBookmarkView || bookmarkIds.includes(media.id))
            .reduce((acc, curr) => {
                const previousTypeMedia = acc[curr.mediaType] || [];
                return {...acc, [curr.mediaType]: [...previousTypeMedia, curr]}
            }, {} as { [mediaType: string]: MediaObject[] })
    }, [isBookmarkView, fetchedData, bookmarkIds]);

    const mediaTypeElements = useMemo(() => {
        return Object.entries(mediaTypesFetchData)
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
    }, [mediaTypesFetchData, getMediaTypeTitle, isBookmarkView, bookmarkIds, toggleIsBookmark]);

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
                    <Visible if={fetchedData.length === 0}>
                        {emptyElement}
                    </Visible>
                    <Visible if={fetchedData.length > 0}>
                        {mediaTypeElements}
                    </Visible>
                </Visible>
            </Visible>
        </div>
    );
}