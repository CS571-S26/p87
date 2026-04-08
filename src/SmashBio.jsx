import { Card, Button } from "react-bootstrap";
import React from "react";

 
export default function SmashBio(props) {

    return <Card style={{margin: "0.5rem", padding: "0.5rem"}}>
        <h2><strong>{props.name}'s bio</strong></h2>
        <br></br>
        <img src={props.image}></img>
        <strong>Character: {props.character}<br></br>Favorite Gamemode: {props.favoriteMode}<br></br></strong>
        <p>Bio: "{props.bio}"</p>
    </Card>

}