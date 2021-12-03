import axios from "axios";

const key = "AIzaSyAuefqpfwQMlDKp4jAvVonsW_BCfB9VDI8";

const API = axios.create({
    baseURL: "https://www.googleapis.com/youtube/v3",
    params: {
        part: "snippet",
        maxResults: 5,
        key: key
    },
    headers: {}
});

export default API;