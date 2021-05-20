import React from "react";
import {PageContainer} from '../pageContainer/pageContainer';
import './imprintPage.scss'

export function ImprintPage(): JSX.Element {
    return (
        <PageContainer>
            <div className={"impressumHeader"}>
                Impressum
            </div>
            <div className={"mainCaption"}>
                Kontakt
            </div>
            <div className={"subCaption"}>
                Seiten Service
            </div>
            <a href={"Flash@mail.com"} className={"content"}>
                FL4SH@BoreDoom.de
            </a>
            <div className={"content"}>
                Tel: +49 12 34 5678
            </div>
            <div className={"subCaption"}>
                FL4SH GmbH Service
            </div>
            <a href={"Flash@mail.com"} className={"content"}>
                FL4SH@Services.de
            </a>
            <div className={"content"}>
                Tel: +49 12 34 88975
            </div>
            <div className={"mainCaption"}>
                FL4SH GmbH.
            </div>
            <div className={"content"}>
                Tel: +49 12 34 88975
            </div>
            <div className={"content"}>
                Tel: +49 12 34 88975
            </div>
            <div className={"content"}>
                Tel: +49 12 34 88975
            </div>
            <div className={"content"}>
                Tel: +49 12 34 88975
            </div>
            <div className={"content"}>
                Tel: +49 12 34 88975
            </div>
            <div className={"mainCaption"}>
                BoreDoom© ist ein Produkt der FL4SH GmbH. Jegliche Femd/-weiterverwendung der Webseite ist strengstens verboten.
                Und kann nach Industry Regulatory Act (Gewerbeordnung) and Disclosure Obligation according to §25 Media Act (Mediengesetz) geahntet werden.
            </div>

        </PageContainer>
    );
}