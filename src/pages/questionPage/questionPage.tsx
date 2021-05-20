import React from 'react';
import "../mainPage/mainPage.scss"
import {QuestionSlideContainer} from "../../components/questionComponents/questionSlideContainer";
import {PageContainer} from '../pageContainer/pageContainer';


export function QuestionPage(): JSX.Element {
    return (
        <PageContainer>
            <QuestionSlideContainer/>
        </PageContainer>
    );
}