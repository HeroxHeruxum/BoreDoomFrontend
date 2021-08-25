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


export function fetchResults(): ThunkAction<Promise<any>, State, any, any> {
    return async (dispatch: any, getState: () => State) => {
        try {
            dispatch(setIsLoading(true));
            const answers = getState().questions.answers;
            const mediaResponse = await axios.post(`http://localhost:8082/getResults`, answers);
            const bookmarksResponse = await axios.get(`http://localhost:8082/user/favorites/`);
            const bookmarks = bookmarksResponse.data as MediaObject[];
            dispatch(setMedia(mediaResponse.data));
            dispatch(setBookmarkIds(bookmarks.map(({id}) => id)));
            dispatch(setIsLoading(false))
        } catch {
            showNotification("activity", "Beschaffen der Daten");
            dispatch(setIsLoading(false))
        }
    }
}

export function fetchLuckyStrike(): ThunkAction<Promise<any>, State, any, any> {
    return async (dispatch: any) => {
        try {
            dispatch(setIsLoading(true));
            const randomResponse = await axios.get(`http://localhost:8082/random`);
            const bookmarksResponse = await axios.get(`http://localhost:8082/user/favorites/`);
            const bookmarks = bookmarksResponse.data as MediaObject[];
            dispatch(setMedia([randomResponse.data]));
            dispatch(setBookmarkIds(bookmarks.map(({id}) => id)));
            dispatch(setIsLoading(false))
        } catch {
            showNotification("activity", "Beschaffen der Daten");
            dispatch(setIsLoading(false))
        }
    }
}

export function fetchBookmarks(): ThunkAction<Promise<any>, State, any, any> {
    return async (dispatch: any) => {
        try {
            dispatch(setIsLoading(true));
            const response = await axios.get(`http://localhost:8082/user/favorites/`);
            const bookmarks = response.data as MediaObject[];
            dispatch(setMedia(bookmarks));
            dispatch(setBookmarkIds(bookmarks.map(({id}) => id)));
            dispatch(setIsLoading(false))
        } catch {
            showNotification("activity", "Beschaffen der Daten");
            dispatch(setIsLoading(false))
        }
    }
}

export function toggleIsBookmark(id: number, mediaType: string) {
    return async (dispatch: any, getState: () => State) => {
        const bookmarkIds = getState().media.bookmarkIds;
        const isBookmark = bookmarkIds.includes(id);
        dispatch(setIsLoading(true));
        try {
            if (isBookmark) {
                await axios.put(`http://localhost:8082/user/favorites/deleteMedia?mediaId=${id}&mediaType=${mediaType}`)
            } else {
                await axios.put(`http://localhost:8082/user/favorites/saveMedia?mediaId=${id}&mediaType=${mediaType}`)
            }
            dispatch(toggleBookmarkId(id))
        } catch {
            showNotification("activity", `${isBookmark ? "Entfernen von der" : "Hinzufügen zur"} Merkliste`)
        }
        dispatch(setIsLoading(false));
    }
}