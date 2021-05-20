import React from "react";
import "./imprint.scss";


export function Imprint() {
    return (
        <div className="imprint">
            <div className="headline">
                Kontakt
            </div>
            <div className="contentHeadline">
                BoreDoom Service
            </div>
            <a className="content">
                BoreDoom@Services.de
            </a>
            <div className="content">
                Tel: +49 12 34 5678
            </div>
            <div className="contentHeadline">
                FL4SHH GmbH Service
            </div>
            <a className="content">
                FL4SHH@Services.de
            </a>
            <div className="content">
                Tel: +49 12 34 88975
            </div>
            <div className="headline">
                FL4SHH GmbH
            </div>
            <div className="content">
                Stan Falkenrich
            </div>
            <div className="content">
                Lennart Hess
            </div>
            <div className="content">
                Jenny Höfert
            </div>
            <div className="content">
                Franziska Lippert
            </div>
            <div className="content">
                Rica Steffen
            </div>
            <div className="kleingedrucktes">
                BoreDoom© ist ein Produkt der FL4SHH GmbH. Jegliche
                Fremd-/Weiterverwendung der Webseite ist strengstens verboten.
                Zuwiderhandlungen können und werden nach der Industry
                Regulatory Act (Gewerbeordnung) und dem Disclosure Obligation
                According §25 Media Act (Mediengesetz) geahntet.
            </div>
        </div>
    );
}