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
    isBookmark: boolean
}

export function Media(props: MediaProps) {
    const {isBookmark} = props;

    const {isLoggedIn, answers} = useSelector((state: ReducerState) => ({
        isLoggedIn: !!state.login.loggedInUsername,
        answers: state.questions.answers
    }));

    const [isLoading, setIsLoading] = useState(false);
    const [fetchedData, setFetchedData] = useState<MediaObject[]>([]);
    
    const mockData = useMemo(() => {
        const mockMedia: MediaObject = {
            id: 28,
            mediaType: "BOOK",
            imageUrl: "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
            name: "Ein Unfassbar langer Titel damit ich den overflow testen kann und keine dumme URL verwenden muss",
            description: "Katzig",
            producerUrl: "https://www.youtube.com/watch?v=QoLUB0QkUaE"
        };
        return [{...mockMedia, mediaType: "MOVIE"}, mockMedia, mockMedia, mockMedia, mockMedia]
    }, []);

    useEffect(() => {
        //setFetchedData(mockData)
        if (isBookmark && isLoggedIn) {
            setIsLoading(true);
            axios.get(`http://localhost:8082/user/favorites/`)
                .then((response) => {
                    setIsLoading(false);
                    setFetchedData(response.data)
                })
                .catch(() => {
                    setIsLoading(false);
                    showNotification("activity", "Beschaffen der Daten")
                })
        } else if (!isBookmark) {
            setIsLoading(true);
            axios.post(`http://localhost:8082/getResults`, answers)
                .then((response) => {
                    setIsLoading(false);
                    setFetchedData(response.data)
                })
                .catch(() => {
                    setIsLoading(false);
                    showNotification("activity", "Beschaffen der Daten")
                })
        }
    }, [isBookmark, isLoggedIn, answers, setIsLoading]);


    const addBookmark = useCallback((id: number, mediaType: string) => {
        axios.put(`http://localhost:8082/user/favorites/saveMedia?mediaId=${id}&mediaType=${mediaType}`)
            .then()
            .catch(() => showNotification("activity", "Hinzufügen zur Merkliste"))
    }, []);

    const deleteBookmark = useCallback((id: number, mediaType: string) => {
        axios.put(`http://localhost:8082/user/favorites/deleteMedia?mediaId=${id}&mediaType=${mediaType}`)
            .then()
            .catch(() => showNotification("activity", "Entfernen von der Merkliste"))
    }, []);

    const toggleIsBookmark = useMemo(() => {
        return isBookmark ? deleteBookmark : addBookmark
    }, [isBookmark, addBookmark, deleteBookmark]);


    const emptyElement = useMemo(() => {
        if (isBookmark) {
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
    }, [isBookmark]);

    const getMediaTypeTitle = useCallback((mediaType: string) => {
        return mediaType === "BOOK" ? "Bücher" : "Filme"
    }, []);

    const mediaTypesFetchData = useMemo(() => {
        return fetchedData.reduce((acc, curr) => {
            const previousTypeMedia = acc[curr.mediaType] || [];
            return {...acc, [curr.mediaType]: [...previousTypeMedia, curr]}
        }, {} as { [mediaType: string]: MediaObject[] })
    }, [fetchedData]);

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
                                         isBookmark={isBookmark}
                                         toggleIsBookmark={toggleIsBookmark}/>
            })
    }, [mediaTypesFetchData, getMediaTypeTitle, isBookmark, toggleIsBookmark]);

    return (
        <div className="media">
            <Visible if={!isLoggedIn && isBookmark}>
                <p className="informationText">
                    Registrierte Nutzer können Medien aus den Ergebnissen
                    ihrer Suchen zu ihrer Merkliste hinzufügen und sich hier
                    wieder ansehen. Zum Anmelden oder Registrieren drück
                    bitte oben rechts.
                </p>
            </Visible>
            <Visible if={isLoggedIn || !isBookmark}>
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