// Return value of selection from lists / generate lists from arrays / return History and Favourites list elements

import React from "react";
import { v4 as uuidv4 } from 'uuid';
import "../SearchLayout.css";

function SelectList(props) {
    function select(event) {
        const target = event.target; 
        const video = target.id === "favourites" ? props.favourites.find(item => item.title === target.value) : props.history.find(item => item.title === target.value);
        // based on event target id, find the item in array whose song title corresponds with the value of target

        props.selectListState(video) // pass the item to SearchScreen.js/selectListState() to set state for this.state.searchTitle and searchURL
    }

    return (
        // options are generated from the favourites and history array by .map()
        <div>
            <select id="favourites" onChange={select}>
                <option selected disabled>Favourites</option>
                {props.favourites.map((item) => {
                    return <option key={uuidv4()}>{item.title}</option>
                })}
            </select>
            <select id="history" onChange={select}>
                <option selected disabled>History</option>
                {props.history.map((item) => {
                    return <option key={uuidv4()}>{item.title}</option>
                })}
            </select>
        </div>
    )
}

export default SelectList;