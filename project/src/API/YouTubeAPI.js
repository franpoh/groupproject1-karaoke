import axios from "axios";

const key = "AIzaSyC4fg8lFBo9e276Qf6Xbw16sP2TarXkb6E"; // generated credentials from Google API and Services

const ytAPI = axios.create({
    baseURL: "https://www.googleapis.com/youtube/v3",
    params: {
        part: "snippet", // The part parameter specifies a comma-separated list of one or more search resource properties that the API response will include. Set the parameter value to snippet as dictated by documentation
        maxResults: 10, // maximum of 20 results
        key: key,
        type: "video", // ensure only videos are returned, instead of channels/playlists
        videoCategoryID: "10", // category for music
    },
    headers: {}
});

export default ytAPI;