import axios from "axios";
import {MediaObject} from "../../misc/types";
import {State} from "../../reducer";
import {showNotification} from "../notification/notificationActions";
import {ThunkAction} from "redux-thunk";


function setIsLoading(isLoading: boolean) {
    return {
        type: "SET_ISLOADING_MEDIA",
        payload: isLoading
    }
}

function setMedia(media: MediaObject[]) {
    return {
        type: "SET_MEDIA",
        payload: media
    }
}

function setBookmarkIds(bookmarkIds: number[]) {
    return {
        type: "SET_BOOKMARKIDS",
        payload: bookmarkIds
    }
}

function toggleBookmarkId(bookmarkId: number) {
    return {
        type: "TOGGLE_BOOKMARKID",
        payload: bookmarkId
    }
}

    
const getMockData = () => {
    const mockMedia: MediaObject = {
        id: 1,
        mediaType: "BOOK",
        imageUrl: "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
        name: "Ein Unfassbar langer Titel damit ich den overflow testen kann und keine dumme URL verwenden muss",
        description: "Katzig",
        producerUrl: "https://www.youtube.com/watch?v=QoLUB0QkUaE"
    };
    return [{...mockMedia, mediaType: "MOVIE"}, {...mockMedia, id: 2}, {...mockMedia, id: 3}, {...mockMedia, id: 4}]
}

export function fetchResults(): ThunkAction<Promise<any>, State, any, any> {
    return async (dispatch: any, getState: () => State) => {
        //dispatch(setMedia(getMockData()))
        //dispatch(setBookmarkIds([1, 2]))
        dispatch(setIsLoading(true));
        const answers = getState().questions.answers;
        let firstCallReady = false;
        axios.post(`http://localhost:8082/getResults`, answers)
            .then(response => {
                dispatch(setMedia(response.data));
                firstCallReady ? dispatch(setIsLoading(false)) : firstCallReady = true
            })
            .catch(() => {
                showNotification("activity", "Beschaffen der Daten");
                firstCallReady ? dispatch(setIsLoading(false)) : firstCallReady = true
            });
        axios.get(`http://localhost:8082/user/favorites/`)
            .then(response => {
                const media = response.data as MediaObject[];
                dispatch(setBookmarkIds(media.map(({id}) => id)));
                firstCallReady ? dispatch(setIsLoading(false)) : firstCallReady = true
            })
            .catch(() => {
                showNotification("activity", "Beschaffen der Daten");
                firstCallReady ? dispatch(setIsLoading(false)) : firstCallReady = true
            })
    }
}

export function fetchLuckyStrike(): ThunkAction<Promise<any>, State, any, any> {
    return async (dispatch: any) => {
        //dispatch(setMedia([getMockData()[0]]))
        //dispatch(setBookmarkIds([1]))
        dispatch(setIsLoading(true));
        let firstCallReady = false;
        axios.get(`http://localhost:8082/random`)
            .then(response => {
                dispatch(setMedia([response.data]));
                firstCallReady ? dispatch(setIsLoading(false)) : firstCallReady = true
            })
            .catch(() => {
                showNotification("activity", "Beschaffen der Daten");
                firstCallReady ? dispatch(setIsLoading(false)) : firstCallReady = true
            });
        axios.get(`http://localhost:8082/user/favorites/`)
            .then(response => {
                const media = response.data as MediaObject[];
                dispatch(setBookmarkIds(media.map(({id}) => id)));
                firstCallReady ? dispatch(setIsLoading(false)) : firstCallReady = true
            })
            .catch(() => {
                showNotification("activity", "Beschaffen der Daten");
                firstCallReady ? dispatch(setIsLoading(false)) : firstCallReady = true
            })
    }
}

export function fetchBookmarks(): ThunkAction<Promise<any>, State, any, any> {
    return async (dispatch: any) => {
        //dispatch(setMedia(getMockData()))
        //dispatch(setBookmarkIds([1, 2]))
        dispatch(setIsLoading(true));
        axios.get(`http://localhost:8082/user/favorites/`)
            .then(response => {
                const media = response.data as MediaObject[];
                dispatch(setMedia(media));
                dispatch(setBookmarkIds(media.map(({id}) => id)));
                dispatch(setIsLoading(false))
            })
            .catch(() => {
                showNotification("activity", "Beschaffen der Daten");
                dispatch(setIsLoading(false))
            })
    }
}

export function toggleIsBookmark(id: number, mediaType: string) {
    return async (dispatch: any, getState: () => State) => {
        const bookmarkIds = getState().media.bookmarkIds;
        const isBookmark = bookmarkIds.includes(id);
        if (isBookmark) {
            axios.put(`http://localhost:8082/user/favorites/deleteMedia?mediaId=${id}&mediaType=${mediaType}`)
            .then(() => dispatch(toggleBookmarkId(id)))
            .catch(() => showNotification("activity", "Entfernen von der Merkliste"))    
        } else {
            axios.put(`http://localhost:8082/user/favorites/saveMedia?mediaId=${id}&mediaType=${mediaType}`)
            .then(() => dispatch(toggleBookmarkId(id)))
            .catch(() => showNotification("activity", "Hinzufügen zur Merkliste"))    
        }
    }
}