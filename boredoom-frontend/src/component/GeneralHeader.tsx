import React from 'react';
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';


export function GeneralHeader(): JSX.Element {
    let history = useHistory();

    return (
        <div style={{backgroundColor: "#273661", width: "100%", top: 0, display: "inline-flex"}}>
            <div style={{left:"0px"}}>
                <Button style={{color: "white", height: "50px"}}><h2>BoreDoom</h2></Button>
                <Button style={{color: "white", height: "50px"}} onClick={()=>{history.push('/fragenkatalog')}}>Fragenkatalog</Button>
                <Button style={{color: "white", height: "50px"}} onClick={()=>{history.push('/glueckstreffer')}}>Glückstreffer</Button>
                <Button style={{color: "white", height: "50px"}} onClick={()=>{history.push('/merkliste')}}>Merkliste</Button>
            </div>
            <div style={{position:"absolute",right: "0px"}}>
                <Button style={{color: "white", height: "50px"}} onClick={()=>{history.push('/login')}}>Login</Button>
            </div>
        </div>
    );
}
