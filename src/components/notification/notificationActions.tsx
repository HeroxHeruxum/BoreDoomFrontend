import {toast} from "react-toastify";
import {NotificationType} from "../../misc/types";


export function showNotification(type: NotificationType, value: string) {
    switch (type) {
        case "message":
            toast.error(value);
            break
        case "activity":
            toast.error(`Es ist ein Fehler beim ${value} aufgetreten! Bitte versuche es später erneut.`);
            break
    }
}