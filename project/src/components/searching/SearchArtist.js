// get data from Shazam API to generate list of artists from search song title 

import ShazamAPI from "../../API/ShazamAPI.js"

async function searchArtist(props, song) {
    let searchResults = await ShazamAPI.get("/search", {
        params: { term: song }, // pass in this.state.inputSong from searchbar
    }).then((response) => {
        if (Object.entries(response.data).length === 0) { // if return object has no key-value pairs as a result of not finding an artist
            const result = []; 
            result.unshift({title: "Not Found", artist: "Not Found"}); // return array with artist not found object
            return result;
        } else {
            const data = response.data.tracks.hits;
            const result = data.map((item) => {
                return {
                    title: item.track.title, // song title
                    artist: item.track.subtitle // song artist
                }
            })
            return result; // searchResults = {artist}
        }
    })
    props.artistResultsState(searchResults);
    document.getElementById("suggartist").value = "default";
    document.getElementById("suggsong").value = "default";
    return searchResults;
}

export default searchArtist;              