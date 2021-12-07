import React from "react";
import search from "./Search";

function HandleInput(props) {
    function setInput(event) {
        const output = {
            result: event.target.value,
            target: event.target.id,
        }
        props.handleInputState(output); // pass event.target.value to SearchScreen.js/handleInputState() to set this.state.inputSong/inputArtist
        document.getElementById("searchbutton").disabled = false; // enable search button when event.target.value is not empty
    }

    return (
        <form onSubmit={(event) => search(props, event)}> 
            <input type="text" placeholder="Enter Song Title Here!" id="inputsong" value={props.inputSong} onChange={setInput}></input>
            <input type="text" placeholder="Enter Artist Name Here!" id="inputartist" value={props.inputArtist} onChange={setInput}></input>
            <button id="searchbutton" disabled>Search</button>
        </form> // run Search.js/search() upon submission
    )
}

export default HandleInput;