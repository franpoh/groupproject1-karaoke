// get data from Shazam API to generate list of artists from search song title 

import ShazamAPI from "../../API/ShazamAPI.js"

function searchArtist(props, video, song, event) {

    let outerP = new Promise((resolve) => {

        let innerP = new Promise(async (resolve, reject) => {
            let notFound = [{ title: "Not Found", artist: "Not Found" }];
            let found = await ShazamAPI.get("/search", {
                params: { term: song }, // pass in this.state.inputSong from searchbar
            })
            if (Object.entries(found.data).length >= 2) {
                resolve(found);
            } else {
                reject(notFound);
            }
        })

        let response = innerP.then((found) => {
            const data = found.data.tracks.hits;
            const result = data.map((item) => {
                return {
                    title: item.track.title, // song title
                    artist: item.track.subtitle // song artist
                }
            })
            return result; // searchResults = {artist}
        }).catch((error) => {
            console.log('Shazam error 429!');
            return error;
        });

        resolve(response);
    });

    outerP.then((res) => {
        props.artistResultsState(res);
        if (event.target.id === song) { // this is for RelatedVideo.js/select()
            props.selectRVidsState(video, res); // set state for searchTitle, searchURL, searchVTitle, searchArtist
        }
        document.getElementById("suggartist").value = "default";
        document.getElementById("suggsong").value = "default";
        return res;
    })
}

export default searchArtist;              