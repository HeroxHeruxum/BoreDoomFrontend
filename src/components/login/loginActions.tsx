export function setLoggedInUsername(loggedInUsername: string) {
    return {
        type: "SET_LOGGEDIN_USERNAME",
        payload: loggedInUsername
    }
}

export function setUsername(username: string) {
    return {
        type: "SET_USERNAME",
        payload: username
    }
}

export function setEmail(email: string) {
    return {
        type: "SET_EMAIL",
        payload: email
    }
}

export function setPassword(password: string) {
    return {
        type: "SET_PASSWORD",
        payload: password
    }
}

export function setConfirmPassword(password: string) {
    return {
        type: "SET_CONFIRM_PASSWORD",
        payload: password
    }
}