import React from "react";
import API from "../API-aaa";
import "./SearchLayout.css";
import TextToSpeech from "./text2speech";
// const reactStringReplace = require('react-string-replace');

class OvhLyric extends React.Component {
    constructor(props) {
        super();
        this.fetchOvhData = this.fetchOvhData.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.state = {
            // lyricsAltFormat: [],
            // replacedSlashR: [],
            lyrics: [],
            inputArtist: "",
            inputSong: "",
            displayErrorMsg: "",
        };
    }

    componentDidMount() {
        console.log("^This above is my first render");
        this.fetchOvhData();
    }

    handleFormSubmit(e) {
        e.preventDefault();

        const p = new Promise((resolve) => {
            const cleanArtist = this.props.inputArtist.replace(
                /[.,\/#!$%\^&\*;:{}=\-_`~()]/g,
                ""
            );
            const cleanSong = this.props.inputSong.replace(
                /[.,\/#!$%\^&\*;:{}=\-_`~()]/g,
                ""
            );

            this.setState({
                ...this.state,
                inputArtist: cleanArtist,
                inputSong: cleanSong,
            });

            console.log("TEST! ", this.state.inputArtist);
            console.log("TEST! ", this.state.inputSong);
            resolve("SUCCESS");
        });

        p.then((res) => {
            console.log(res);
            this.fetchOvhData();
        });
    }

    async fetchOvhData() {
        console.log("TEST1! ", this.state.inputArtist);
        console.log("TEST1! ", this.state.inputSong);
        try {
            if (this.state.inputArtist && this.state.inputSong) {
                const response = await API.get(
                    `/${this.state.inputArtist}/${this.state.inputSong}`
                );
                let lyrics = [];
                if (response.status === 200) {
                    lyrics = response.data.lyrics;
                }
                // console.log("Full API data: ", response);
                // const replacedSlashR = lyrics.replace(/Paroles de la chanson/g, 'he');
                // console.log("lyrics  format: ", replacedSlashR);

                this.setState({
                    ...this.state,
                    lyrics,
                    // replacedSlashR,
                });
            }
        } catch (error) {
            this.setState({
                ...this.state,
                lyrics: "Lyrics not found...",
                // displayErrorMsg: "Lyrics not found...",
            });
        }
    }

    render() {
        // const { inputSong } = this.state;
        // const { inputArtist } = this.state;
        // const { replacedSlashR } = this.state;
        // console.log('Hello printing lyric: ', lyrics); //this console logs formatted version but format disappears when rendered to HTML
        const { displayErrorMsg } = this.state;
        const { lyrics } = this.state;
        let submitContent = lyrics; // G1: need for passing to text2speech

        // const content = replacedSlashR;
        // let formattedLyrics;
        // formattedLyrics = reactStringReplace(content, '\n', (match, i) => ( //replace \n
        //     <br />                    // with <br />
        // ));

        // formattedLyrics = reactStringReplace(formattedLyrics, 'Paroles de la chanson', (match, i) => (
        //     <p></p>
        // ));

        // formattedLyrics = reactStringReplace(formattedLyrics, 'par', (match, i) => (
        //     <i> by </i>
        // ));
        return (
            <div className="lyricbox">
                <form onSubmit={this.handleFormSubmit}>
                    <input className="button" type="submit" value="Display Lyrics"></input>
                </form>
                <div className="displayWindow2">
                    <TextToSpeech sendOutput={submitContent} />
                </div>
                <div className="displayWindow2" style={{ display: lyrics.length === 0 ? 'none' : 'inline' }}>
                    <textarea
                        readOnly
                        placeholder="incoming lyrics data"
                        value={lyrics}
                        rows="30"
                        cols="52"
                    />
                    {displayErrorMsg}
                </div>
            </div>
        );
    }
}
export default OvhLyric;
