import axios from "axios";

const ShazamAPI = axios.create({
    baseURL: "https://shazam.p.rapidapi.com/",
    params: {offset: '0', limit: '5'},
    headers: {
        'x-rapidapi-host': 'shazam.p.rapidapi.com',
        'x-rapidapi-key': '66f75eb6ebmshb919ecdbb43a32ep1f9ed5jsnd03f0d01f882'
    }
});

export default ShazamAPI;