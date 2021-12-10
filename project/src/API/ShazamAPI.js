import axios from "axios";

const ShazamAPI = axios.create({
    baseURL: "https://shazam.p.rapidapi.com/",
    params: {offset: '0', limit: '5'},
    headers: {
        'x-rapidapi-host': 'shazam.p.rapidapi.com',
        'x-rapidapi-key': '8f6a805d32msh0745f29a4cf83a2p134cadjsnb38ffe05207e'
    }
});

// Spare API Key: 8f6a805d32msh0745f29a4cf83a2p134cadjsnb38ffe05207e
// Spare API Key: 66f75eb6ebmshb919ecdbb43a32ep1f9ed5jsnd03f0d01f882
// key 429 @ 9.30pm 9 Dec: bd52c7831bmsh885f8cdd1f00f06p13ec79jsn09e6320cff58

export default ShazamAPI;