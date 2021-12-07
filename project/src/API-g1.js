import axios from 'axios';

const API = axios.create({
    baseURL: 'https://voicerss-text-to-speech.p.rapidapi.com',
    headers: {
        'x-rapidapi-host': 'voicerss-text-to-speech.p.rapidapi.com',
        'x-rapidapi-key': 'bd52c7831bmsh885f8cdd1f00f06p13ec79jsn09e6320cff58'
    }
});

export default API;