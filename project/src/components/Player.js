// return YouTube Player

import React from 'react';
import YouTube from 'react-youtube';

import addList from './list/AddList';
import "./SearchLayout.css";

function Player(props) {
    const opts = { // setting optional parameters for player
        height: '390',
        width: '640',
    };

    return (
        <YouTube
            opts={opts}
            videoId={props.url} // passing this.state.searchURL
            onPlay={() => {
                addList(props, "player"); // pass props and event target id to AddList.js/addList()
            }} // setting id in element was not working (even though documentation says it should), so id is set in argument
        />
    )
}

export default Player;