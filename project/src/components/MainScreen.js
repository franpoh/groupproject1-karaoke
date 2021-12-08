import React from "react";
import API from "../API-aaa";
import '../index.css';
import TextToSpeech from './text2speech';
//external library
const reactStringReplace = require('react-string-replace');

function Ovh() {

}

class OvhLyric extends React.Component {
    constructor() {
        super();
        this.fetchOvhData = this.fetchOvhData.bind(this);

        this.state = {
            lyrics: [],
            lyricsAltFormat: [],
            replacedSlashR: [],
            // artist: '',
            // title: '',
        };
    }

    componentDidMount() {
        console.log("^This above is my first render");
        this.fetchOvhData();
    }


    async fetchOvhData() {

        // const response = await API.get('/miss a/bad girl good girl');

        const response = await API.get('/the weeknd/blinding lights');


        let lyrics = [];
        if (response.status === 200) {
            lyrics = response.data.lyrics;
        }
        console.log("Full API data: ", response);
        const replacedSlashR = lyrics.replace(/\r/g, ' ');
        console.log("lyrics  format: ", replacedSlashR);

        this.setState({
            ...this.state,
            lyrics,
            replacedSlashR,
        });
    }

    render() {

        const { lyrics } = this.state;
        const { replacedSlashR } = this.state;
        console.log('Hello printing lyric: ', lyrics); //this console logs formatted version but format disappears when rendered to HTML

        const content = replacedSlashR;
        let formattedLyrics;

        let submitContent = lyrics; // G1: need for passing to text2speech

        formattedLyrics = reactStringReplace(content, '\n', (match, i) => ( //replace \n
            <br />                    // with <br />
        ));

        formattedLyrics = reactStringReplace(formattedLyrics, 'Paroles de la chanson', (match, i) => (
            <p></p>
        ));

        formattedLyrics = reactStringReplace(formattedLyrics, 'par', (match, i) => (
            <i> by </i>
        ));

        return (

            <>
                {/* <form onSubmit={this.fetchOvhData}>
                    <input type='text' placeholder='artist' onChange={this.state.artist}>
                    </input>
                </form> */}
                <div>
                    <h4 style={{ textAlign: 'center', padding: '20px' }}>
                        {formattedLyrics}
                    </h4>
                </div>
                <div className='displayWindow2'>
                <TextToSpeech sendOutput={submitContent}/>
                </div>

            </>
        );
    }
}

export default OvhLyric;