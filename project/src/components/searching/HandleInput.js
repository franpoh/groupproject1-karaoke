// Receive song title and artist search inputs / return search textbox elements and search button

import React from "react";
import { v4 as uuidv4 } from 'uuid';
import debounce from 'lodash.debounce';
import { useCallback } from "react";

import search from "./Search";
import "../SearchLayout.css";
import searchArtist from "./SearchArtist";

function HandleInput(props) {
    function setInput(event) {
        const output = {
            result: event.target.value,
            target: event.target.id,
        }
        props.handleInputState(output); // pass event.target.value to SearchScreen.js/handleInputState() to set this.state.inputSong/inputArtist
        document.getElementById("searchbutton").disabled = false; // enable search button when event.target.value is not empty
    }

    // update search bar input, pass searchbar input to SearchArtist.js/searchArtist() to generate list of artists associated with song title
    function artSuggest(event) { 
        let p = new Promise((resolve, reject) => {
            setInput(event); // execute input event here
            if (event.target.value === "") {
                reject(console.log("Nothing to Search"))
            } else {
                resolve(event.target.value)
            }
        });

        p.then((res) => {
            searchArtist(props, res); // if event target value has a string, execute searchArtist()
        }).catch (res => res)
    }

    const debouncedChangeHandler = useCallback( // a lodash function to call function once after finished typing
        debounce(artSuggest, 300)
        , [props]);

    return (
        <form
            onSubmit={(event) => search(props, event)}
        >
            <input
                type="text"
                placeholder="Enter Song Title Here!"
                id="inputsong"
                onChange={debouncedChangeHandler}
            ></input>

            <select
                id="inputartist"
                onChange={setInput}
                value={props.inputArtist}
            >
                <option value="default" selected disabled>Suggested Artists</option>
                {props.artistResults.map((item) => {
                    return <option key={uuidv4()}>{item.artist}</option>
                })}
            </select>

            <button id="searchbutton" disabled>Search</button>
        </form> // run Search.js/search() upon submission
    )
}

export default HandleInput;