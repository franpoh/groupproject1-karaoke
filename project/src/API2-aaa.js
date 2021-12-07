import axios from "axios";

const key = "AIzaSyBWydU1tn9HRWSyU0WS3iIWuJV2NxZ6pJI";

const API = axios.create({
    baseURL: "https://www.googleapis.com/youtube/v3",
    params: {
        part: "snippet",
        maxResults: 50,
        key: key,
        type: "video"
    },
    headers: {}
});

export default API;