import React, {useMemo} from "react";
import {RouteProps} from "react-router";
import {PageContainer} from "../pageContainer/pageContainer";
import {Media} from "../../components/media/media";


export function MediaPage(props: RouteProps): JSX.Element {
    const isBookmarkView = useMemo(() => {
        return !!props.location?.pathname.includes("bookmarks")
    }, [props]);
    const title = useMemo(() => {
        return isBookmarkView ? "Deine Merkliste" : "Ergebnisse deiner Suche"
    }, [isBookmarkView]);

    return (
        <PageContainer title={title}>
            <Media isBookmarkView={isBookmarkView}/>
        </PageContainer>
    )
}