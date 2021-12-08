import axios from 'axios';

const API = axios.create({
    baseURL: "https://api.lyrics.ovh/v1/",
});


export default API;