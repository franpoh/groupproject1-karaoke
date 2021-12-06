import axios from "axios";

const key = "AIzaSyBWydU1tn9HRWSyU0WS3iIWuJV2NxZ6pJI"; // generated credentials from Google API and Services

const API = axios.create({
    baseURL: "https://www.googleapis.com/youtube/v3",
    params: {
        part: "snippet", // The part parameter specifies a comma-separated list of one or more search resource properties that the API response will include. Set the parameter value to snippet as dictated by documentation
        maxResults: 20, // maximum of 20 results
        key: key,
        type: "video" // ensure only videos are returned, instead of channels/playlists
    },
    headers: {}
});

export default API;