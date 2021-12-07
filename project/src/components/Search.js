import API from './API.js'

async function search(props, event) {
    event.preventDefault(); 

    let searchResults = await API.get("/search", {
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
        console.log("TEST! ", props.inputSong, " ", props.inputArtist);
        return result; // searchResults = {title, url}
    })

    props.searchState(searchResults) // pass searchResults to SearchScreen.js/searchState() to set this.state.searchResults, searchTitle and searchURL
    document.getElementById("searchbutton").disabled = true; // disable search button
}

export default search;