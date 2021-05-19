import React, {useState} from 'react';
import {Header} from "../../components/header/header";
import {Impressum} from "../../components/impressum/impressum";
import {ResultComponent} from "../../components/resultComponent/resultComponent";
import {Result} from "../../misc/types";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from '@material-ui/icons/Delete';
import './favouritesPage.scss'


export function FavouritesPage() {

    const markAsFavourite = (): void => {
        // hier rest Call pls
    }
    let mockData = [];
    const mockResult: Result = {
        id: 1,
        mediaType: "BOOK",
        imgUrl: "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
        producerUrl: "https://www.youtube.com/watch?v=QoLUB0QkUaE",
        title: "Ein Unfassbar langer Titel dfamit ich den overflow TEsten kann und keine Dumme URL verwenden muss",
        genre: "Katzig",

    }
    mockData.push(mockResult)
    mockData.push(mockResult)
    mockData.push(mockResult)
    mockData.push(mockResult)
    mockData.push(mockResult)

    const [fetchedData, setFetchedData] = useState(mockData)
    const returnResults = (): JSX.Element => {
        return (
            <div>
                {fetchedData.map(item => (

                    <ResultComponent imgUrl={item.imgUrl}
                                     producerUrl={item.producerUrl}
                                     title={item.title}
                                     genre={item.genre}
                                     functionalButton={
                                         <Tooltip title={"Löschen"}>
                                             <DeleteIcon className={"deleteButton"} onClick={markAsFavourite}/>
                                         </Tooltip>

                                     }
                    />

                ))
                }
            </div>
        );
    }
    return (
        <>
            <header>
                <Header/>
            </header>
            <body>
            {returnResults()}
            <Impressum/>
            </body>
        </>
    );
}