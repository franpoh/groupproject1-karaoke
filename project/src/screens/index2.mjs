import API from "../API.mjs";

function test() {
    API.get("/search", {
        params: {
            q: "rammstein"
        }
    }).then(response => {
        const { data } = response;
        data.items.forEach((item) => {
            console.log(`Title: ${item.snippet.title}\nURL: https://www.youtube.com/watch?v=${item.id.videoId}`)
        })
    }).catch((err) => console.log(err));
}

test();