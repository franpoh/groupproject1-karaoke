import React from "react";
import PrevNext from "./PrevNext.js";
import updateList from "./list/UpdateList.js";
import FavButton from "./list/FavButton.js";
import Player from "./Player.js";
import SelectList from "./list/SelectList.js";
import HandleInput from "./HandleInput.js";
import Main from "./routing/Main.js";



class SearchScreen extends React.Component {
    constructor() {
        super();
        this.prevNextState = this.prevNextState.bind(this);
        this.addListState = this.addListState.bind(this);
        this.selectListState = this.selectListState.bind(this);
        this.handleInputState = this.handleInputState.bind(this);
        this.searchState = this.searchState.bind(this);
        this.state = {
            input: "", // input from searchbar
            searchResults: [], // an array of 20 results from searching. Includes title and videoId
            searchIndex: 0, // index number for searchResult array
            searchTitle: "", // title of selected song
            searchURL: "", // videoId of selected song
            favourites: [], // array of favourited items that is synced up to Windows.localStorage("favourites")
            history: [], // array of history items that is synced up to Windows.localStorage("history")
        }
    }

    async componentDidMount() {
        let favourites = await updateList("favourites"); // updating favourites/history from Windows.localStorage("favourites"/"history")
        let history = await updateList("history"); 

        this.setState({ // and setting this.state.history/favourites
            ...this.state,
            favourites,
            history,
        })
    }

    // based on event target id, after adding to favourites/history list, set this.state.history/favourites and sync with Windows.localStorage("favourites"/"history")
    addListState(res) { // passing in list object {title, url}, as well as event.target.id
        if (res.target === "addfav") {
            this.setState({ favourites: res.list });
            localStorage.setItem("favourites", JSON.stringify(this.state.favourites));
        } else {
            this.setState({ history: res.list });
            localStorage.setItem("history", JSON.stringify(this.state.history));
        }
    }

    // going to the next or previous item on this.state.searchResults array
    prevNextState(searchIndex) { // passing in a number value to pass in as array index number
        this.setState({
            ...this.state,
            searchIndex,
            searchTitle: this.state.searchResults[searchIndex].title,
            searchURL: this.state.searchResults[searchIndex].url,
        })
    }

    // select something from this.state.favourites/history array to play
    selectListState(video) { // passing in selected video's title, url
        this.setState({
            ...this.state,
            searchTitle: video.title,
            searchURL: video.url,
            searchIndex: 0, // reset searchIndex
        })
    }

    // updating input after typing in searchbar
    handleInputState(input) { // passing in event.target.value
        this.setState({ input });
    }

    // setting states after returning search results
    searchState(searchResults) { // passing in searchResults object {title, url}
        this.setState({
            ...this.state,
            input: "",
            searchResults,
            searchTitle: searchResults[this.state.searchIndex].title, // setting this.state.searchTitle and searchURL based on searchResults[searchIndex = 0]
            searchURL: searchResults[this.state.searchIndex].url,
        })
    }

    render() {
        const { input } = this.state;
        const { searchTitle } = this.state;
        const { searchURL } = this.state;
        const { searchIndex } = this.state;
        const { favourites } = this.state;
        const { history } = this.state;

        return (
            <>
                <div>
                    <Main/>
                    <div className = "navbar">
                        {/* Search Bar Input */}
                        <HandleInput 
                            input = {input}    
                            handleInputState = {this.handleInputState}
                            searchState = {this.searchState}
                        />
                        {/* Favourites and History Dropdown Lists */}
                        <SelectList 
                            selectListState = {this.selectListState}
                            favourites = {favourites}
                            history = {history}
                        />
                    </div>
                    <div className = "videobox">
                        {/* YouTube Player */}
                        <Player 
                            list = {history}
                            title = {searchTitle}
                            url = {searchURL}
                            addListState = {this.addListState}
                        />
                        <h3>{searchTitle}</h3>
                        <div>
                            {/* Previous and Next Buttons */}
                            <PrevNext
                                prevNextState = {this.prevNextState}
                                index = {searchIndex}
                            />
                            {/* Add to Favourites Button */}
                            <FavButton
                                list = {favourites}
                                title = {searchTitle}
                                url = {searchURL}
                                addListState = {this.addListState}
                            />
                        </div>
                        <div>
                            <select className = "ttsconfig"></select>
                            <button className = "tts">Activate Text-to-Speech</button>
                        </div>
                    </div>
                    <div className = "lyricbox"></div>
                    {/* This is for Aunt Pyone's lyrics */}
                    <div className = "relatedvids"></div>
                </div>
            </>
        )
    }
}

export default SearchScreen;