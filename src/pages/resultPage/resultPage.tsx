import React, {useState} from 'react';
import {Header} from "../../components/header/header";
import {Impressum} from "../../components/impressum/impressum";
import {ResultComponent} from "../../components/resultComponent/resultComponent";
import {Result} from "../../misc/types";
import Tooltip from "@material-ui/core/Tooltip";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export function ResultPage() {

    //toastHook
    const notify = (error: any) => {
        toast.error(error)
    }
    const markAsFavourite = (id: number, mediaType: string): void => {
        axios.put("http://localhost:8082/user/favorites/saveMedia?mediaId=" + id + "&mediaType=" + mediaType)
            .catch((error => {
                notify("Fehler bei der Datenbeschaffung: "+error.toString())
            }));
    }

    let mockData = [];
    const mockResult: Result = {
        id: 5,
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
                                         <Tooltip title={"Zu Favouriten hinzufügen"}>
                                             <StarBorderIcon className={"starButton"}
                                                             onClick={() => markAsFavourite(item.id, item.mediaType)}>
                                             </StarBorderIcon>
                                         </Tooltip>}
                    />

                ))
                }
            </div>
        );
    };
    return (
        <>
            <header>
                <Header/>
            </header>
            <body>
            <ToastContainer/>
            {returnResults()}
            <Impressum/>
            </body>
        </>
    );
}