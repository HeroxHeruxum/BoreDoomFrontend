import React from "react";
import {PageContainer} from "../pageContainer/pageContainer";
import {LuckyStrike} from "../../components/luckyStrike/luckyStrike";


export function LuckyStrikePage(): JSX.Element {
    return (
        <PageContainer title="Glückstreffer">
            <LuckyStrike/>
        </PageContainer>
    )
}