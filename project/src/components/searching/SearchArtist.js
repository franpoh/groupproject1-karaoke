// get data from Shazam API to generate list of artists from search song title 

import ShazamAPI from "../../API/ShazamAPI.js"

async function searchArtist(props, song) {
    let searchResults = await ShazamAPI.get("/search", {
        params: {term: song}, // pass in this.state.inputSong from searchbar
    }).then((response) => { 
        const data = response.data.tracks.hits;
        const result = data.map((item) => {
            return {
                artist: item.track.subtitle // song artist
            }
        })
        return result; // searchResults = {artist}
    })
    props.artistResultsState(searchResults);
}

export default searchArtist;