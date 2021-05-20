import React from "react";
import {PageContainer} from "../pageContainer/pageContainer";
import {Imprint} from "../../components/imprint/imprint";


export function ImprintPage(): JSX.Element {
    return (
        <PageContainer title="Impressum">
            <Imprint/>
        </PageContainer>
    );
}