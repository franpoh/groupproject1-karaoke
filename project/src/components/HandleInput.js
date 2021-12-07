import React from "react";
import search from "./Search";

function HandleInput(props) {
    function setInput(event) {
        const input = {
            result: event.target.value,
            target: event.target.id,
        }
        props.handleInputState(input); // pass event.target.value to SearchScreen.js/handleInputState() to set this.state.input/inputArtist
        document.getElementById("searchbutton").disabled = false; // enable search button when event.target.value is not empty
    }

    return (
        <form onSubmit={(event) => search(props, event)}> 
            <input type="text" id="input" value={props.input} onChange={setInput}></input>
            <input type="text" id="inputartist" value={props.inputArtist} onChange={setInput}></input>
            <button id="searchbutton" disabled>Search</button>
        </form> // run Search.js/search() upon submission
    )
}

export default HandleInput;