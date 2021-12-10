import React from "react";
import "./SearchLayout.css";

import PrevNext from "./PrevNext.js";
import updateList from "./list/UpdateList.js";
import FavButton from "./list/FavButton.js";
import Player from "./Player.js";
import SelectList from "./list/SelectList.js";
import HandleInput from "./searching/HandleInput"
import RelatedVideos from "./searching/RelatedVideo";
import Main from "./routing/Main.js";
import MainScreen from './MainScreen';
import DarkMode from "./DarkMode";

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
            searchVTitle: "",
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
    }

    // going to the next or previous item on this.state.searchResults array
    prevNextState(searchIndex) { // passing in a number value to pass in as array index number
        this.setState({
            ...this.state,
            searchIndex,
            searchTitle: this.state.searchResults[searchIndex].title,
            searchURL: this.state.searchResults[searchIndex].url,
            searchArtist: this.state.searchResults[searchIndex].artist,
            searchVTitle: this.state.searchResults[searchIndex].vtitle,
        })
    }

    // select something from this.state.favourites/history array to play
    selectListState(video) { // passing in selected video's title, url
        this.setState({
            ...this.state,
            searchTitle: video.title,
            searchVTitle: video.vtitle,
            searchURL: video.url,
            searchArtist: video.artist,
            searchIndex: 0, // reset searchIndex
            searchResults: this.state.relatedVids,
        })
    }

    // updating input after typing in searchbar
    handleInputState(output) { // passing in event.target.value
        if (output.target === "suggsong") {
            this.setState({ inputSong: output.result })
            document.getElementById("suggartist").disabled = false;
        } else {
            this.setState({ inputArtist: output.result });
            document.getElementById("searchbutton").disabled = false; // enable search button when searchbar is not empty
        }
    }

    // execute after returning search results
    searchState(searchResults) { // passing in searchResults object {title, url}
        this.setState({
            ...this.state,
            artistSearch: [],
            searchResults,
            searchTitle: searchResults[this.state.searchIndex].title, // setting this.state.searchTitle, searchVTitle and searchURL based on searchResults[searchIndex = 0]
            searchVTitle: searchResults[this.state.searchIndex].vtitle,
            searchURL: searchResults[this.state.searchIndex].url,
            searchArtist: searchResults[this.state.searchIndex].artist,
        })
    }

    // execute after finding related videos to search result
    searchRVidsState(relatedVids) { // passing in searchResults object {title, url, thumbnailurl}
        this.setState({ relatedVids })
    }

    // execute after selecting related video to play
    selectRVidsState(video, res) {
        this.setState({
            ...this.state,
            searchTitle: res[0].title,
            searchVTitle: video.vtitle,
            searchURL: video.url,
            searchArtist: res[0].artist,
        })
    }

    // get an array of suggested artists based on song name in search
    artistResultsState(artistResults) {
        this.setState({ artistResults });
    }

    render() {
        const { inputSong } = this.state;
        const { inputArtist } = this.state;
        const { artistResults } = this.state;
        const { searchTitle } = this.state;
        const { searchVTitle } = this.state;
        const { searchURL } = this.state;
        const { searchArtist } = this.state;
        const { searchIndex } = this.state;
        const { favourites } = this.state;
        const { history } = this.state;
        const { relatedVids } = this.state;

        return (
            <div id="mainbody" className="webpage">
                <div className="topnavbar">
                    {/* Search Bar Input */}
                    <HandleInput
                        inputSong={inputSong}
                        inputArtist={inputArtist}
                        artistResults={artistResults}
                        handleInputState={this.handleInputState}
                        searchState={this.searchState}
                        searchRVidsState={this.searchRVidsState}
                        artistResultsState={this.artistResultsState}
                    />
                    {/* Favourites and History Dropdown Lists */}
                    <SelectList
                        selectListState={this.selectListState}
                        searchRVidsState={this.searchRVidsState}
                        favourites={favourites}
                        history={history}
                    />
                    <DarkMode />
                </div>
                <div className="searchscreen">
                    <div className="playerbox">
                        <div className="videobox">
                            {/* YouTube Player */}
                            <Player
                                list={history}
                                title={searchTitle}
                                vtitle={searchVTitle}
                                url={searchURL}
                                artist={searchArtist}
                                addListState={this.addListState}
                            />
                        </div>
                        <div className="vidnavbar">
                            {/* Previous and Next Buttons */}
                            <PrevNext
                                prevNextState={this.prevNextState}
                                index={searchIndex} array={this.state.searchResults}
                            />
                            {/* <PrevNext
                                prevNextState={this.prevNextState}
                                index={searchIndex}
                            /> */}
                            {/* Add to Favourites Button */}
                            <FavButton
                                list={favourites}
                                title={searchTitle}
                                vtitle={searchVTitle}
                                url={searchURL}
                                artist={searchArtist}
                                addListState={this.addListState}
                            />
                            {/* <button className="lyricbutton">Display Lyrics</button> */}
                        </div>
                        <div>
                            <h3 className="videoinfo" id="videotitle">{searchVTitle}</h3>
                            <p>If lyrics cannot be found, please refine your search again!</p>
                        </div>
                    </div>
                    <MainScreen
                        inputArtist={searchArtist}
                        inputSong={searchTitle}
                    />
                    <RelatedVideos
                        rvideos={relatedVids}
                        artistResults={artistResults}
                        selectRVidsState={this.selectRVidsState}
                        artistResultsState={this.artistResultsState}
                    />
                </div>
            </div>
        )
    }
}

export default SearchScreen;