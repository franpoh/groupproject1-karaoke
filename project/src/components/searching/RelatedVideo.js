// Return value of selection from related videos / Return related videos element

import React from "react";
import { v4 as uuidv4 } from 'uuid';
import "../SearchLayout.css";

function RelatedVideos(props) {
    function select(event) {
        const target = event.target; 
        const video = props.rvideos.find(item => item.title === target.id); // find the item in array whose song title corresponds with the id of target
        props.selectRVidsState(video) // set this.state.searchTitle/searchURL
    }

    // receive this.state.relatedVids array and map into a column 
    return (
        <div className="relatedvids">
            {props.rvideos.map((item) => {
                return (
                <div key={uuidv4()} id={item.title}>
                    <img className="rvidthumbnail" id={item.title} src={`${item.thumbnailurl}`} onClick={select} alt="music video picture"></img>
                    <p className="rvidtitle">{item.title}</p>
                </div>
            )})}
        </div>
    )
}

export default RelatedVideos;