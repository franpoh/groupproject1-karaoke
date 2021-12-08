// Get data from Youtube Data API to generate song title and url / activate search for related video function

import ytAPI from "../../API/YouTubeAPI.js"
import SearchRVids from "./SearchRVids.js"

async function search(props, event) {
    event.preventDefault(); 
    
    let searchResults = await ytAPI.get("/search", {
        params: {
            q: props.inputSong + " " + props.inputArtist, // pass in this.state.inputSong/inputArtist from searchbar
        }
    }).then((response) => { 
        const { data } = response;
        const result = data.items.map((item) => {
            return {
                title: item.snippet.title, // song title
                url: item.id.videoId, // song id
            }
        })
        return result; // searchResults = {title, url}
    })

    props.searchState(searchResults) // pass searchResults to SearchScreen.js/searchState() to set this.state.searchResults, searchTitle and searchURL
    SearchRVids(props, searchResults[0].url);
    document.getElementById("searchbutton").disabled = true; // disable search button
}

export default search;