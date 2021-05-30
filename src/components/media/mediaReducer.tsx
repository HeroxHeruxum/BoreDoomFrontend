import {ActionType, MediaObject} from "../../misc/types";


export type MediaState = {
    isLoading: boolean,
    media: MediaObject[],
    bookmarkIds: number[]
}

const defaultState: MediaState = {
    isLoading: false,
    media: [],
    bookmarkIds: []
}

export const mediaReducer = (state = defaultState, {type, payload}: ActionType) => {
    switch (type) {
        case "SET_ISLOADING_MEDIA": {
            return {
                ...state,
                isLoading: payload
            }
        }
        case "SET_MEDIA": {
            return {
                ...state,
                media: payload
            }
        }
        case "SET_BOOKMARKIDS": {
            return {
                ...state,
                bookmarkIds: payload
            }
        }
        case "TOGGLE_BOOKMARKID": {
            if (state.bookmarkIds.includes(payload)) {
                return {
                    ...state,
                    bookmarkIds: state.bookmarkIds.filter(id => id !== payload)
                }
            } else {
                return {
                    ...state,
                    bookmarkIds: [...state.bookmarkIds, payload]
                }
            }
        }
        case "LOCATION_CHANGE": {
            return state
        }
        default: {
            return state
        }
    }
 }