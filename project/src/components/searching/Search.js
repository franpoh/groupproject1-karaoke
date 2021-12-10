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
                vtitle: item.snippet.title, // video title
                title: props.inputSong, // song title
                url: item.id.videoId, // song id
                artist: props.inputArtist, // song artist
            }
        })
        return result; // searchResults = {vtitle, title, url, artist}
    })
    props.searchState(searchResults) // pass searchResults to SearchScreen.js/searchState() to set this.state.searchResults, searchTitle, searchVTitle and searchURL
    SearchRVids(props, searchResults[0].url);
    document.getElementById("suggartist").value = "default";
    document.getElementById("suggsong").value = "default";
    document.getElementById("inputsong").value = "";
}

export default search;