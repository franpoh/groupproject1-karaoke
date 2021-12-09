// send event target values and props to SearchArtist.js/searchArtist

import searchArtist from "./SearchArtist";
import setInput from "./SetInput";
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
        searchArtist(props, res); // if event target value has a string, execute searchArtist()
    }).catch(res => res)
}

export default artSuggest;