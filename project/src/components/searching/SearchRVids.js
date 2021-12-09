// Use search result to get related songs from Get data from Youtube Data API, and generate song title, url and thumbnail url

import ytAPI from "../../API/YouTubeAPI.js"

async function SearchRVids(props, searchResult) {
    let rVideos = await ytAPI.get("/search", {
        params: {
            relatedToVideoId: searchResult, // pass in search result videoId from Search.js/search()
        }
    }).then((response) => {
        const { data } = response;

        const filterSnippet = data.items.filter((item) => { // not all results have snippet for title and thumbnails, as the videos are unavailable
            return item.snippet != null;
        })

        const result = filterSnippet.map((item) => {
            return {
                vtitle: item.snippet.title, // title of video
                url: item.id.videoId, // video url
                thumbnailurl: item.snippet.thumbnails.default.url // url of thumbnail picture
            }
        })
        return result; // searchResults = {title, url, thumbnailurl}
    })

    props.searchRVidsState(rVideos) // pass searchResults to SearchScreen.js/searchState() to set this.state.relatedVideos
    document.getElementById("suggartist").value = "default";
    document.getElementById("suggsong").value = "default";
    document.getElementById("searchbutton").disabled = true; // disable search button
}

export default SearchRVids;