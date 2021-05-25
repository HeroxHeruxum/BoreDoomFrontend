import React from "react";
import "./mainPage.scss";
import {PageContainer} from "../pageContainer/pageContainer";
import {Button} from "../../components/button/button";


export function MainPage() {
    return (
        <PageContainer title="Was ist BoreDoom?">
            <p className="mainPageDescription">
                Durch den aktuellen Lockdown werden wir alle vermehrt mit den
                Problemen aufkommender Langeweile konfrontiert. Anfangs war es
                einfach, sich in so einer Situation für einen spannenden Film
                oder ein Buch zu entscheiden, doch irgendwann fällt auch das
                nicht mehr so leicht. Und genau aus diesem Grund haben wir es
                uns zum Ziel gesetzt, der Langeweile entgegenzuwirken - sie
                praktisch dem Untergang zu weihen!
                <br/><br/>
                Beantworte uns nur wenige Fragen und wir machen dir Vorschläge
                zu deiner individuellen Freizeitgestaltung. Bist du bei uns
                registriert, kannst du einzelne Medien in deiner ganz
                persönlichen Merkliste speichern und sie so jederzeit
                wiederfinden!
                <br/><br/>
                Unabhängig davon, ob du allein bist oder in einer größeren
                Gruppe, ob dir gerade nach einem Klassiker oder ganz etwas
                Ausgefallenem ist: wir liefern dir die perfekt auf dich
                zugeschnittene Auswahl an Medien.
            </p>
            <div className="startButtonWrapper">
                <Button type="standard" title="Start" href="/questions"/>
            </div>
        </PageContainer> 
    );
}