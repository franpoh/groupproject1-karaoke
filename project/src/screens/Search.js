import React from "react";
import API from "../API.js";

class YouSearch extends React.Component {
    constructor() {
        super();
        this.search = this.search.bind(this);
        this.state = {
            searchtitle: "",
            searchurl: ""
        }
    }

    async search(event) {
        event.preventDefault();

        const res = await API.get("/search", {
            params: {
                q: "burn"
            }
        });

        let searchtitle = "";
        let searchurl = "";

        if (res.status === 200){
            const search = res.data.items[0];
            searchtitle = search.snippet.title
            searchurl = search.id.videoId
        }

        this.setState({
            searchtitle,
            searchurl
        });
    }

    render() {
        const { searchtitle } = this.state;
        const { searchurl } = this.state;

        return (
            <div>
                <form onSubmit={this.search}>
                    <input></input>
                    <button>Search</button>
                </form>
                <iframe
                    title={searchtitle}
                    src={`https://www.youtube.com/embed/${searchurl}`}
                />
            </div>
        )
    }
}

export default YouSearch;