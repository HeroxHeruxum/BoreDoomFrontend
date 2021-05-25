import React, {useMemo} from "react";
import {RouteProps} from "react-router";
import {ToastContainer} from "react-toastify";
import {PageContainer} from "../pageContainer/pageContainer";
import {Media} from "../../components/media/media";


export function MediaPage(props: RouteProps): JSX.Element {
    const isBookmark = useMemo(() => {
        return !!props.location?.pathname.includes("bookmarks")
    }, [props]);
    const title = useMemo(() => {
        return isBookmark ? "Deine Merkliste" : "Ergebnisse deiner Suche"
    }, [isBookmark]);

    return (
        <PageContainer title={title}>
            <ToastContainer/>
            <Media isBookmark={isBookmark}/>
        </PageContainer>
    )
}