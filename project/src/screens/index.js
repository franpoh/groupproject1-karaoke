// npm install googleapis
// npm install dotenv
// api key is in .env file in root folder

require("dotenv").config();
console.log(process.env.YOUTUBE_TOKEN);

const { google } = require("googleapis");

google.youtube("v3").search.list({
    key: process.env.YOUTUBE_TOKEN,
    part: "snippet",
    q: "rammstein",
}).then((response) => {
    const { data } = response;
    data.items.forEach((item) => {
        console.log(`Title: ${item.snippet.title}\nURL: https://www.youtube.com/watch?v=${item.id.videoId}`)
    })
}).catch((err) => console.log(err));