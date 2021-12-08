import React from "react";
import "./SearchLayout.css";

import PrevNext from "./PrevNext.js";
import updateList from "./list/UpdateList.js";
import FavButton from "./list/FavButton.js";
import Player from "./Player.js";
import SelectList from "./list/SelectList.js";
<<<<<<< Updated upstream
import HandleInput from "./searching/HandleInput"
import RelatedVideos from "./searching/RelatedVideo";
import Main from "./routing/Main.js";
=======
import HandleInput from "./searching/HandleInput.js";

import Search from './Search-aaa';
>>>>>>> Stashed changes
import MainScreen from './MainScreen';

class SearchScreen extends React.Component {
    constructor() {
        super();
        this.prevNextState = this.prevNextState.bind(this);
        this.addListState = this.addListState.bind(this);
        this.selectListState = this.selectListState.bind(this);
        this.handleInputState = this.handleInputState.bind(this);
        this.searchState = this.searchState.bind(this);
        this.searchRVidsState = this.searchRVidsState.bind(this);
        this.selectRVidsState = this.selectRVidsState.bind(this);
        this.artistResultsState = this.artistResultsState.bind(this);

        this.state = {
            inputSong: "", // input from song searchbar
            inputArtist: "", // input from artist searchbar
            searchResults: [], // an array of results from searching songs. Includes title and videoId
            artistResults: [], // an array of suggested artists from searching songs
            searchIndex: 0, // index number for searchResult array
            searchTitle: "", // title of selected song
            searchURL: "", // videoId of selected song
            searchArtist: "", // artist of selected song
            favourites: [], // array of favourited items that is synced up to Windows.localStorage("favourites")
            history: [], // array of history items that is synced up to Windows.localStorage("history")
            relatedVids: [], // array of videos related to search result
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
        console.log(this.state.favourites, this.state.history);
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
    handleInputState(output) { // passing in event.target.value
        const setInput = () => output.target === "inputsong" ? this.setState({ inputSong: output.result }) : this.setState({ inputArtist: output.result }); // set this.state.inputSong/inputArtist based on event target id
        setInput();
    }

    // execute after returning search results
    searchState(searchResults) { // passing in searchResults object {title, url}
        this.setState({
            ...this.state,
            inputSong: "",
            inputArtist: "",
            artistSearch: [],
            searchResults,
            searchTitle: searchResults[this.state.searchIndex].title, // setting this.state.searchTitle and searchURL based on searchResults[searchIndex = 0]
            searchURL: searchResults[this.state.searchIndex].url,
            searchArtist: searchResults[this.state.searchIndex].artist,
        })
    }

    // execute after finding related videos to search result
    searchRVidsState(relatedVids) { // passing in searchResults object {title, url, thumbnailurl}
        this.setState({relatedVids})
    }

    // execute after selecting related video to play
    selectRVidsState(video) {
        this.setState({
            ...this.state,
            searchTitle: video.title,
            searchURL: video.url,
        })
    }

    // get an array of suggested artists based on song name in search
    artistResultsState(artistResults) {
        this.setState({artistResults})
    }

    render() {
        const { inputSong } = this.state;
        const { inputArtist } = this.state;
        const { artistResults } = this.state;
        const { searchTitle } = this.state;
        const { searchURL } = this.state;
        const { searchArtist } = this.state;
        const { searchIndex } = this.state;
        const { favourites } = this.state;
        const { history } = this.state;
        const { relatedVids } = this.state;

        return (
            <div className="webpage">
                <div className="topnavbar">
                    {/* Search Bar Input */}
                    <HandleInput
                        inputSong={inputSong}
                        inputArtist={inputArtist}
                        artistResults = {artistResults}
                        handleInputState={this.handleInputState}
                        searchState={this.searchState}
                        searchRVidsState={this.searchRVidsState}
                        artistResultsState = {this.artistResultsState}
                    />
                    {/* Favourites and History Dropdown Lists */}
                    <SelectList
                        selectListState={this.selectListState}
                        favourites={favourites}
                        history={history}
                    />
                </div>
                <div className="searchscreen">
                    <div className="playerbox">
                        <div className="videobox">
                            {/* YouTube Player */}
                            <Player
                                list={history}
                                title={searchTitle}
                                url={searchURL}
                                artist={searchArtist}
                                addListState={this.addListState}
                            />
                            <h3>{searchTitle}</h3>
                            <h3>{searchArtist}</h3>
                        </div>
                        <div className="vidnavbar">
                            {/* Previous and Next Buttons */}
                            <PrevNext
                                prevNextState={this.prevNextState}
                                index={searchIndex}
                            />
                            {/* Add to Favourites Button */}
                            <FavButton
                                list={favourites}
                                title={searchTitle}
                                url={searchURL}
                                artist={searchArtist}
                                addListState={this.addListState}
                            />
                            <button className="lyricbutton">Display Lyrics</button>
                        </div>
                    </div>
                    <div className="lyricbox">
                        <p>This is for Aunt Pyone's lyrics</p>                        
                        <MainScreen />
                    </div>
                    <RelatedVideos
                        rvideos={relatedVids}
                        selectRVidsState={this.selectRVidsState}
                    />
                </div>
            </div>
        )
    }
}

export default SearchScreen;