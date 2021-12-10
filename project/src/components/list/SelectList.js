// Return value of selection from lists / generate lists from arrays / return History and Favourites list elements

import React from "react";
import { v4 as uuidv4 } from 'uuid';

import SearchRVids from "../searching/SearchRVids"
import "../SearchLayout.css";

function SelectList(props) {
    function select(event) {
        let p = new Promise((resolve) => {
            const target = event.target;
            const video = target.id === "favourites" ? props.favourites.find(item => item.vtitle === target.value) : props.history.find(item => item.vtitle === target.value);
            // based on event target id, find the item in array whose song title corresponds with the value of target

            SearchRVids(props, video.url);
            resolve(video);
        })

        p.then((video) => {
            props.selectListState(video) // pass the item to SearchScreen.js/selectListState() to set state for this.state.searchTitle and searchURL

            document.getElementById("favourites").value = "default"
            document.getElementById("history").value = "default"
        })
    }

    return (
        // options are generated from the favourites and history array by .map()
        <div>
            <select className="dropdown" id="favourites" onChange={select}>
                <option value="default" selected disabled>Favourites</option>
                {props.favourites.map((item) => {
                    return <option key={uuidv4()}>{item.vtitle}</option>
                })}
            </select>
            <select className="dropdown" id="history" onChange={select}>
                <option value="default" selected disabled>History</option>
                {props.history.map((item) => {
                    return <option key={uuidv4()}>{item.vtitle}</option>
                })}
            </select>
        </div>
    )
}

export default SelectList;