import { isNull } from 'lodash';
import React from 'react';
import API from "../API-aaa";
import '../index.css';
import HandleInput from "./searching/HandleInput.js";
import SearchScreen from './SearchScreen';
import TextToSpeech from './text2speech';



const reactStringReplace = require('react-string-replace');
class OvhLyric extends React.Component {
    constructor(props) {
        super(props);
        this.fetchOvhData = this.fetchOvhData.bind(this);
        this.handleArtist = this.handleArtist.bind(this);
        this.handleSong = this.handleSong.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.state = {
            lyrics: [],
            replacedSlashR: [],
            inputArtist: '',
            inputSong: '',
        };
    }

    componentDidMount() {
        this.fetchOvhData();
    }

    handleArtist(e) {
        this.setState({
            ...this.state,
            inputArtist: e.target.value,
        });
    }

    handleSong(e) {
        this.setState({
            ...this.state,
            inputSong: e.target.value,
        });
    }

    handleFormSubmit(e) {
        e.preventDefault();
        this.fetchOvhData();
    }

    async fetchOvhData() {
        try {
            if (this.state.inputArtist && this.state.inputSong) {
                const response = await API.get(`/${this.state.inputArtist}/${this.state.inputSong}`);
                let lyrics = [];
                if (response.status === 200) {
                    lyrics = response.data.lyrics;
                }
                const replacedSlashR = lyrics.replace(/\r/g, ' ');
                this.setState({
                    ...this.state,
                    lyrics,
                    replacedSlashR,
                });
            } else {
                console.log("Awaiting user input");
            }
        } catch (error) {
            console.log("No lyrics found!");
            return;
        }

    }
    artistResultsState(artistResults) {
        this.setState({ artistResults })
    }


    render() {
        const { inputArtist } = this.state;
        const { inputSong } = this.state;
        const { lyrics } = this.state;
        const { replacedSlashR } = this.state;
        const content = replacedSlashR;
        // console.log(replacedSlashR);
        // console.log(inputSong);
        let submitContent = lyrics;  // G1: need for passing to text2speech
        let formattedLyrics;

        //replace \n with <br />
        formattedLyrics = reactStringReplace(content, '\n', (match, i) => (
            <br />
        ));
        //replace API output header 'Lyrics of the Song' with <p />
        formattedLyrics = reactStringReplace(formattedLyrics, 'Paroles de la chanson', (match, i) => (
            <p />
        ));

        // const conditionalRender = () => {
        //     if (replacedSlashR) {
        //         return formattedLyrics;
        //     } else if (replacedSlashR === null) {
        //         return 'testing';
        //     }
        // }

        return (

            <>
                <form onSubmit={this.handleFormSubmit}>
                    <input type='text' placeholder='artist' onChange={this.handleArtist} value={inputArtist}>
                    </input>
                    <input type='text' placeholder='song' onChange={this.handleSong} value={inputSong}>
                    </input>
                    <input type='submit' value='Add'></input>
                </form>

                <div>
                    <p style={{ textAlign: 'center', padding: '20px' }}>
                        {/* {content ? formattedLyrics : "null"} */}
                        {/* {conditionalRender()} */}
                        {formattedLyrics}
                    </p>
                </div>
                <div className='displayWindow2'>
                    <TextToSpeech sendOutput={submitContent} />
                </div>

            </>
        );
    }
}

export default OvhLyric;


