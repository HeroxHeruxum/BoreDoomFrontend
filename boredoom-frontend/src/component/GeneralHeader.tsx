import React from 'react';
import Button from '@material-ui/core/Button';


export function GeneralHeader(): JSX.Element {
    return (
        <div style={{backgroundColor: "#273661", width: "100%", top: 0, display: "inline-flex"}}>
            <div style={{left:"0px"}}>
                <Button style={{color: "white", height: "50px"}}><h2>BoreDoom</h2></Button>
            </div>
            <div style={{position:"absolute",right: "0px"}}>
                <Button style={{color: "white", height: "50px"}}>Fragenkatalog</Button>
                <Button style={{color: "white", height: "50px"}}>Glückstreffer</Button>
                <Button style={{color: "white", height: "50px"}}>Merkliste</Button>
                <Button style={{color: "white", height: "50px"}}>Login</Button>
            </div>
        </div>
    );
}
