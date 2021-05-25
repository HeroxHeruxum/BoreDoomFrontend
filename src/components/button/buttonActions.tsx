//action to fix missing location change action from router
export function changeLocation(location: string) {
    return {
        type: "LOCATION_CHANGE",
        payload: {location}
    }
}