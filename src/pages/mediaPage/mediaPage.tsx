import React, {useCallback, useMemo, useState} from "react";
import {RouteProps} from "react-router";
import {Media} from "../../misc/types";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import {PageContainer} from "../pageContainer/pageContainer";
import {MediaTypeElement} from "../../components/mediaTypeElement/mediaTypeElement";


export function MediaPage(props: RouteProps):JSX.Element {
    const isBookmark = !!props.location?.pathname.includes("bookmarks");
    const title = useMemo(() => {
        return isBookmark ? "Deine Merkliste" : "Ergebnisse deiner Suche"
    }, [isBookmark]);

    const mockData = useMemo(() => {
        const mockMedia: Media = {
            id: 28,
            mediaType: "BOOK",
            imgUrl: "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
            title: "Ein Unfassbar langer Titel damit ich den overflow testen kann und keine dumme URL verwenden muss",
            genre: "Katzig",
            producerUrl: "https://www.youtube.com/watch?v=QoLUB0QkUaE"
        };
        return [{...mockMedia, mediaType: "MOVIE"}, mockMedia, mockMedia, mockMedia, mockMedia]
    }, []);

    const [fetchedData, setFetchedData] = useState(mockData);

    const showNotification = useCallback((message: string) => {
        toast.error(message)
    }, [toast]);

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
            {mediaTypeElements as any}
        </PageContainer>
    );
}