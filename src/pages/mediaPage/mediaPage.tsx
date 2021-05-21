import React, {useCallback, useEffect, useMemo, useState} from "react";
import {RouteProps} from "react-router";
import "./mediaPage.scss";
import {Answer, AnswerState, Media} from "../../misc/types";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import {PageContainer} from "../pageContainer/pageContainer";
import {Visible} from "../../components/visible/visible";
import {MediaTypeElement} from "../../components/mediaTypeElement/mediaTypeElement";
import {useSelector} from "react-redux";


export function MediaPage(props: RouteProps): JSX.Element {
    const isBookmark = !!props.location?.pathname.includes("bookmarks");
    const title = useMemo(() => {
        return isBookmark ? "Deine Merkliste" : "Ergebnisse deiner Suche"
    }, [isBookmark]);
    const emptyElement = useMemo(() => {
        return isBookmark
            ? <p>
                Es befinden sich keine Medien auf deiner Merkliste. Zum Hinzufügen
                drücke bei den Ergebnissen deiner Suche auf den Stern oben rechts.
            </p>
            : <p className="noResults">
                keine Ergebnisse gefunden
            </p>
    }, [isBookmark]);

    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [fetchedData, setFetchedData] = useState<Media[]>([]);
    const mockData = useMemo(() => {
        const mockMedia: Media = {
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
        setIsLoading(false);
    }, [setIsLoading]);


    const showNotification = useCallback((message: string) => {
        toast.error(message)
    }, [toast]);


    const Answers: Answer[] = [{questionId: 1, choices: [4]}, {questionId: 2, choices: [8]}, {
        questionId: 3,
        choices: [12]
    }, {questionId: 4, choices: [16]}
        , {questionId: 5, choices: [20]}, {questionId: 6, choices: [24]}, {questionId: 7, choices: [28]}]

    useEffect(() => {
        if (isBookmark) {
            setIsLoading(true)
            axios.get(`http://localhost:8082/user/favorites/`
            )
                .then((response) => {
                    setFetchedData(response.data);
                    setIsLoading(false);
                })
                .catch(error => {
                    showNotification(`Fehler bei der Datenbeschaffung: ${error.toString()}`);
                    setIsLoading(false);
                })

        } else {
            setIsLoading(true)
            axios.post(`http://localhost:8082/getResults`, Answers
            )
                .then((response) => {
                    setFetchedData(response.data);
                    setIsLoading(false);
                })
                .catch(error => {
                    showNotification(`Fehler bei der Datenbeschaffung: ${error.toString()}`);
                    setIsLoading(false);
                })
        }
    }, [axios, showNotification,isBookmark,setIsLoading]);


    const addBookmark = useCallback((id: number, mediaType: string) => {
        axios.put(`http://localhost:8082/user/favorites/saveMedia?mediaId=${id}&mediaType=${mediaType}`)
            .then()
            .catch(error => showNotification(`Fehler bei der Datenbeschaffung: ${error.toString()}`))
    }, [axios, showNotification]);

    const deleteBookmark = useCallback((id: number, mediaType: string) => {
        axios.put(`http://localhost:8082/user/favorites/deleteMedia?mediaId=${id}&mediaType=${mediaType}`)
            .then()
            .catch(error => showNotification(`Fehler beim löschen: ${error.toString()}`))
    }, [axios, showNotification]);

    const toggleIsBookmark = useMemo(() => {
        return isBookmark ? deleteBookmark : addBookmark
    }, [isBookmark, addBookmark, deleteBookmark]);

    const mediaTypesFetchData = useMemo(() => {
        return fetchedData.reduce((acc, curr) => {
            const previousTypeMedia = acc[curr.mediaType] || [];
            return {...acc, [curr.mediaType]: [...previousTypeMedia, curr]}
        }, {} as { [mediaType: string]: Media[] })
    }, [fetchedData]);


    const getMediaTypeTitle = useCallback((mediaType: string) => {
        return mediaType === "BOOK" ? "Bücher" : "Filme"
    }, []);

    const mediaTypeElements = useMemo(() => {
        return Object.entries(mediaTypesFetchData)
            .map(([mediaType, media]) => {
                const title = getMediaTypeTitle(mediaType);
                return [title, media] as [string, Media[]]
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
        <PageContainer title={title}>
            <ToastContainer/>
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
        </PageContainer>
    );
}