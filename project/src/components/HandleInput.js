import React from "react";
import search from "./Search";

function HandleInput(props) {
    function setInput(event) {
        props.handleInputState(event.target.value); // pass event.target.value to SearchScreen.js/handleInputState() to set this.state.input
        document.getElementById("searchbutton").disabled = false; // enable search button when event.target.value is not empty
    }

    return (
        <form onSubmit={(event) => search(props, event)}> 
            <input type="text" value={props.input} onChange={setInput}></input>
            <button id="searchbutton" disabled>Search</button>
        </form> // run Search.js/search() upon submission
    )
}

export default HandleInput;