// Handle function and return next/previous buttons

import React from "react";

function PrevNext(props) {
    function onSwitch(event) {
        const target = event.target;
        const searchIndex = target.id === "next" ? props.index + 1 : props.index - 1; // passing in this.state.searchIndex value, 'next' will +1, 'prev' will -1 
        props.prevNextState(searchIndex); // pass searchIndex to SearchScreen.js/prevNextState() to set this.state.searchIndex, searchTitle and searchURL
    }

    return (
        <div>
            <button id="prev" name="prev" onClick={onSwitch}>Previous</button>
            <button id="next" name="next" onClick={onSwitch}>Next</button>
        </div>
    )
}

export default PrevNext;