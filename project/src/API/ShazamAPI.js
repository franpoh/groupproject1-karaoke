import axios from "axios";

const ShazamAPI = axios.create({
    baseURL: "https://shazam.p.rapidapi.com/",
    params: {offset: '0', limit: '5'},
    headers: {
        'x-rapidapi-host': 'shazam.p.rapidapi.com',
        'x-rapidapi-key': 'f675137ff1msh8ae1e95f53ba9a4p1bb6b2jsnc4fcd0c7649b'
    }
});

export default ShazamAPI;