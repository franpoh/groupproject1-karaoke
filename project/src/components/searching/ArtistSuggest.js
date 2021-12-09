// send event target values and props to SearchArtist.js/searchArtist

import searchArtist from "./SearchArtist";
import "../SearchLayout.css";

function artSuggest(props, event) {
    // update search bar input, pass searchbar input to SearchArtist.js/searchArtist() to generate list of artists associated with song title
    let p = new Promise((resolve, reject) => {
        if (event.target.value === "") {
            reject(console.log("Nothing to Search"))
        } else {
            resolve(event.target.value)
        }
    });

    p.then((res) => {
        searchArtist(props, " ", res, event); // if event target value has a string, execute searchArtist()
        document.getElementById("suggsong").disabled = false;
    }).catch(res => res)
}

export default artSuggest;