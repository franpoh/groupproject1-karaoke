import React from "react";
import API from "../API2-aaa";
import YouTube from 'react-youtube';
import { v4 as uuidv4 } from 'uuid';

class YouSearch extends React.Component {
    constructor() {
        super();
        this.handleInput = this.handleInput.bind(this);
        this.search = this.search.bind(this);
        this.handleSwitch = this.handleSwitch.bind(this);
        this.addFavourites = this.addFavourites.bind(this);
        this.addHistory = this.addHistory.bind(this);
        this.select = this.select.bind(this);
        this.state = {
            input: "",
            searchResults: [],
            searchIndex: 0,
            searchTitle: "",
            searchURL: "",
            favourites: [],
            history: [],
        }
    }

    async componentDidMount() {
        let favourites = await (() => {
            if (JSON.parse(localStorage.getItem("favourites")) === null) {
                return [];
            } else {
                return JSON.parse(localStorage.getItem("favourites"));
            }
        })();

        let history = await (() => {
            if (JSON.parse(localStorage.getItem("history")) === null) {
                return [];
            } else {
                return JSON.parse(localStorage.getItem("history"));
            }
        })();

        this.setState({
            ...this.state,
            favourites,
            history,
        })
    }

    addFavourites() {
        const p = new Promise((resolve) => {
            let favourites = (() => {
                if (JSON.parse(localStorage.getItem("favourites")) === null) {
                    return [];
                } else {
                    return JSON.parse(localStorage.getItem("favourites"));
                }
            })();
            const favouriteItem = {
                title: this.state.searchTitle,
                url: this.state.searchURL,
            }

            favourites.push(favouriteItem);
            resolve(favourites);
        })

        p.then((res) => {
            this.setState({
                ...this.state,
                favourites: res,
            })
            localStorage.setItem("favourites", JSON.stringify(this.state.favourites))
        })
    }

    addHistory() {
        const p = new Promise((resolve) => {
            let history = (() => {
                if (JSON.parse(localStorage.getItem("history")) === null) {
                    return [];
                } else {
                    return JSON.parse(localStorage.getItem("history"));
                }
            })();
            const historyItem = {
                title: this.state.searchTitle,
                url: this.state.searchURL,
            }

            history.push(historyItem);
            resolve(history);
        })

        p.then((res) => {
            this.setState({
                ...this.state,
                history: res,
            })
            localStorage.setItem("history", JSON.stringify(this.state.history))
        })
    }

    select(event) {
        const target = event.target;
        const video = target.id === "favourites" ? this.state.favourites.find(item => item.title === target.value) : this.state.history.find(item => item.title === target.value);

        this.setState({
            ...this.state,
            searchTitle: video.title,
            searchURL: video.url,
        })
        target.selectedIndex = 0;
    }

    async search(event) {
        event.preventDefault();

        let searchResults = await API.get("/search", {
            params: {
                q: this.state.input,
            }
        }).then((response) => {
            const { data } = response;
            const result = data.items.map((item) => {
                return {
                    title: item.snippet.title,
                    url: item.id.videoId
                }
            })
            return result;
        })

        this.setState({
            ...this.state,
            searchResults,
            searchTitle: searchResults[this.state.searchIndex].title,
            searchURL: searchResults[this.state.searchIndex].url,
        })
    }

    handleSwitch(event) {
        const target = event.target;
        const searchIndex = target.id === "next" ? this.state.searchIndex + 1 : this.state.searchIndex - 1;
        this.setState({
            ...this.state,
            searchIndex,
            searchTitle: this.state.searchResults[searchIndex].title,
            searchURL: this.state.searchResults[searchIndex].url,
        })
    }

    handleInput(event) {
        this.setState({ input: event.target.value });
        document.getElementById("searchbutton").disabled = false;
    }

    render() {
        const { searchTitle } = this.state;
        const { searchURL } = this.state;
        const { favourites } = this.state;
        const { history } = this.state;

        const opts = {
            height: '390',
            width: '640',
        };

        return (
            <div>
                <h1>The Karaoke Website</h1>
                <div className="navbar">
                    <form onSubmit={this.search}>
                        <label for="suggestions">Choose from our curated playlist:</label>
                        <input type="text" list='suggestions' value={this.state.input} onChange={this.handleInput}></input>
                        <datalist id='suggestions'>
                            <li>TOP 10</li>
                            <option value='Blinding Lights'>Most Popular!!</option>
                            <option>Missed you</option>
                            <option>Save Your Tears</option>
                            <option>Flashlights</option>
                            <option>Firework</option>
                            <option>Yellow</option>
                            <option>Peaches</option>
                            <option>Replay</option>
                            <option>Eternal Love</option>
                            <option>Spoiled by your love</option>
                        </datalist>
                        <button id="searchbutton" disabled>Search</button>
                    </form>
                    <div>
                        <select id="favourites" onChange={this.select}>
                            <option selected disabled>Favourites</option>
                            {favourites.map((item) => {
                                return <option key={uuidv4()}>{item.title}</option>
                            })}
                        </select>
                        <select id="history" onChange={this.select}>
                            <option selected disabled>History</option>
                            {history.map((item) => {
                                return <option key={uuidv4()}>{item.title}</option>
                            })}
                        </select>
                    </div>
                </div>
                <div className="videobox">
                    <YouTube
                        id="player"
                        opts={opts}
                        videoId={searchURL}
                        onPlay={this.addHistory}
                    />
                    <h1>{searchTitle}</h1>
                    <div>
                        <button id="prev" name="prev" onClick={this.handleSwitch}>Previous</button>
                        <button id="next" name="next" onClick={this.handleSwitch}>Next</button>
                        <button id="addfav" onClick={this.addFavourites}>Add to Favourites</button>
                    </div>
                    <div>
                        <select className="ttsconfig"></select>
                        <button className="tts">Activate Text-to-Speech</button>
                    </div>
                </div>
                <div className="lyricbox">

                </div>
                <div className="relatedvids">

                </div>
            </div>
        )
    }
}

export default YouSearch;