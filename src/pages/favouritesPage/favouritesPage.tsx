import React, {useEffect, useState} from 'react';
import {ResultComponent} from "../../components/resultComponent/resultComponent";
import {Result} from "../../misc/types";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from '@material-ui/icons/Delete';
import './favouritesPage.scss'
import {PageContainer} from '../pageContainer/pageContainer';
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export function FavouritesPage() {

    //toastHook
    const notify = (error: any) => {
        toast.error(error)
    }


    let initialData = [];
    const mockResult: Result = {
        id: 1,
        mediaType: "BOOK",
        imgUrl: "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
        producerUrl: "https://www.youtube.com/watch?v=QoLUB0QkUaE",
        title: "Ein Unfassbar langer Titel dfamit ich den overflow TEsten kann und keine Dumme URL verwenden muss",
        genre: "Katzig",

    }
    initialData.push(mockResult)

    const [fetchedData, setFetchedData] = useState(initialData)

    const getData = ()=>{
        axios
            .get("http://localhost:8082/user/favorites/")
            .then((response) => {
                setFetchedData(response.data)
            })
            .catch(() => {
                setFetchedData([])
                notify("Du scheinst nicht angemeldet zu sein!")
            })
    }

    useEffect(() => {
    getData();
    }, [])

    const deleteAsFavourite = (id: number, mediaType:string): void => {
        axios
            .put("http://localhost:8082/user/favorites/deleteMedia?mediaId=" + id + "&mediaType=" + mediaType)
            .then(
                ()=>{toast.info("Erfolgreich");
                getData();
            })
            .catch((e)=>{console.log(e)})
    }

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
                                             <DeleteIcon className={"deleteButton"} onClick={() => {
                                                 deleteAsFavourite(item.id,item.mediaType)
                                             }}/>
                                         </Tooltip>

                                     }
                    />

                ))
                }
            </div>
        );
    }
    return (
        <PageContainer>
            <ToastContainer/>
            {returnResults()}
        </PageContainer>
    );
}