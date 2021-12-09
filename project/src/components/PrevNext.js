// Handle function and return next/previous buttons

import React from "react";
import "./SearchLayout.css";

function PrevNext(props) {
    function onSwitch(event) {
        const target = event.target;
        // G1: have to change below from const to let in order for error catch to set value to index 0
        let searchIndex = target.id === "next" ? props.index + 1 : props.index - 1; // passing in this.state.searchIndex value, 'next' will +1, 'prev' will -1        
        if (props.array.length === 0) {
            return; // G1: in event of empty searchResults
        }
        if (searchIndex < 0 || searchIndex > (props.array.length - 1) ) {            
            searchIndex = 0;
        } // G1: set index to 0 when -1 or exceed 9
        
        props.prevNextState(searchIndex); // pass searchIndex to SearchScreen.js/prevNextState() to set this.state.searchIndex, searchTitle and searchURL
    }

    return (
        <div>
            <button className="button" id="prev" name="prev" onClick={onSwitch}>Previous</button>
            <button className="button" id="next" name="next" onClick={onSwitch}>Next</button>
        </div>
    )
}

export default PrevNext;