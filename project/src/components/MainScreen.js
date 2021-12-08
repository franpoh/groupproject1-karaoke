import React, { useEffect, useState } from 'react';
import API from "../API-aaa";
import '../index.css';
import HandleInput from "./HandleInput.js";
import TextToSpeech from './text2speech';
const reactStringReplace = require('react-string-replace');

class OvhLyric extends React.Component {
    constructor() {
        super();
        this.fetchOvhData = this.fetchOvhData.bind(this);
        this.handleArtist = this.handleArtist.bind(this);
        this.handleSong = this.handleSong.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);


        this.state = {
            lyrics: [],
            lyricsAltFormat: [],
            replacedSlashR: [],
            inputArtist: '',
            inputSong: '',
        };
    }

    componentDidMount() {
        console.log("^This above is my first render");
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
        // e.preventDefault();
        console.log(this.state.inputArtist);
        console.log(this.state.inputSong);
        if (this.state.inputArtist && this.state.inputSong) {
            const response = await API.get(`/${this.state.inputArtist}/${this.state.inputSong}`);
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

    }

    render() {
        const { inputSong } = this.state;
        const { inputArtist } = this.state;
        const { lyrics } = this.state;
        const { replacedSlashR } = this.state;
        // console.log('Hello printing lyric: ', lyrics); //this console logs formatted version but format disappears when rendered to HTML

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
                <form onSubmit={this.handleFormSubmit}>
                    <input type='text' placeholder='artist' onChange={this.handleArtist} value={inputArtist}>
                    </input>
                    <input type='text' placeholder='song' onChange={this.handleSong} value={inputSong}>
                    </input>
                    <input type='submit' value='Add'></input>
                </form>

                <div>
                    <h4 style={{ textAlign: 'center', padding: '20px' }}>
                        {formattedLyrics}
                    </h4>
                </div>
                <div className='displayWindow2'>
                    <TextToSpeech sendOutput={submitContent} />
                </div>

            </>
        );
    }
}

export default OvhLyric;



// function Ovh() {

//     const [artist, setArtist] = useState('');
//     const [title, setTitle] = useState('');
//     const [lyrics, setLyrics] = useState([]);

//     const handleOnChangeArtist = (event) => {
//         setArtist(event.target.value);
//     }

//     const handleOnChangeTitle = (event) => {
//         setTitle(event.target.value);

//     }

//     async function handleSubmit(event) {
//         event.preventDefault();
//          const response = await API.get(`/${artist}/${title}`);
        // const response = await API.get('bee gees/how deep is your love');
//         if (response.status === 200) {
//             setLyrics(response.data.lyrics);
//             console.log(setLyrics);
//         }
//         else {
//             console.log('There has been an error of code: ', response.status);
//             return;
//         }

//     }
//     useEffect(() => {
//         console.log("Child component mounted"); // On Mount runs one time when the application is mounted

//         // On Unmount
//         return () => {
//             console.log("Child component unmounted");
//         };
//     }, []);


//     return (
//         <>
//             { }
//             <form onSubmit={handleSubmit}>
//                 <input type='text' placeholder='Artist' onChange={handleOnChangeArtist} value={artist}></input>
//                 <input type='text' placeholder='Song Title' onChange={handleOnChangeTitle} value={title}></input>
//                 <input type='submit' value='Add'></input>
//             </form>
//         </>
//     )

// }
// export default Ovh;