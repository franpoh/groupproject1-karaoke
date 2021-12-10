import React, { useState } from 'react';
import API from '../API-g1';
// import langList from './lang';

function TextToSpeech(props) {
        
    let waitLyrics = 'none';
    if (props.sendOutput.length === 0 || props.sendOutput === 'Lyrics not found...') {
        waitLyrics = 'none';
    } else waitLyrics = 'inline';
    
    let response2;
    let response3;
    let response4;

    const [playCount, setplayCount] = useState(0);    
    const [rcvAudio, setrcvAudio] = useState(""); // song audio part 1
    const [reserveAudio2, setreserveAudio2] = useState(""); // song audio part 2 if needed
    const [reserveAudio3, setreserveAudio3] = useState(""); // song audio part 3 if needed
    const [reserveAudio4, setreserveAudio4] = useState(""); // song audio part 4 if needed
    const [genderSubmit, setgenderSubmit] = useState('en-us');

    const selectGender = () => {        

        return (
            <select id='lang' name = 'gender' defaultValue='Linda' onChange={handleGenderChange} style={{display:waitLyrics}}>
                <option key='gender1' value='Linda'>Female</option>
                <option key='gender2' value='John'>Male</option>                
            </select>
        )
    }

    function handleGenderChange (e) {
        setgenderSubmit(e.target.value);
    }

    async function handleSubmit (e) {
        e.preventDefault();
        console.log('Submitting props: ', props);
        console.log('Submitting text: ', props.sendOutput);
        // console.log('Submitting lang:', langSubmit);
        console.log('Submitting text.length: ', props.sendOutput.length);

        let testABC = props.sendOutput.replace(/\r/g,'. '); // text to speech api uses '. ' for pause, need the space after punctuation
        testABC = props.sendOutput.replace(/\n/g,'. '); // 1st argu is regex /string/g where g is global, whole string, /i will be case-insensitive /m multiline
        // https://www.w3schools.com/jsref/jsref_regexp_g.asp
        
    /* Cannot use this reduction, somehow corrupts the text in certain places. 
        // testABC = testABC.replace(/. . . . /g,'. '); // reduce unnecessary . step 1
        // testABC = testABC.replace(/. . . /g,'. '); // reduce step 2       
        // testABC = testABC.replace(/. . /g,'. '); // reduce step 3
    */

        let part1 = "";
        let part2 = "";
        let part3 = "";
        let part4 = "";

        if (testABC.length > 1100) {
            part1 = testABC.substring(0, 1100); // 1100 for in case of few special chars, max 1365 = 404 error.... hmmmm so actual limit is 2728 bytes
            let testLength = part1.lastIndexOf('. '); // loophole: if last lines near end is ending with ! or ? non-crit as shouldnt be too far from 1364 unless entire paras before 1364 is ! or ? zzz....
            console.log('check for last . :', testLength); // eg 1353, last index of '. '
            // need if check? if (testLength === -1) no occurence of '. ' unlikely whole song no '. '
            part1 = testABC.substring(0, (testLength+1)); // truncate at last . +1
            part2 = testABC.substring((testLength+1)); // need part 3?
            testABC = part2; // reuse testABC variable for part 3 shuffling
            // part 3...
            if (part2.length > 1100) {
                part2 = part2.substring(0, 1100);
                testLength = part2.lastIndexOf('. ');
                console.log('check for last . :', testLength);
                part2 = part2.substring(0, (testLength+1));
                part3 = testABC.substring((testLength+1)); // as testABC still retains part2 and part3 string
                testABC = part3;
                // part 4
                if (part3.length > 1100) {
                    part3 = part3.substring(0, 1100);
                    testLength = part3.lastIndexOf('. ');
                    console.log('check for last . :', testLength);
                    part3 = part3.substring(0, (testLength+1));
                    part4 = testABC.substring((testLength+1));
                }
            }

        } else part1 = testABC; // when song length needs only 1 part                
        
        console.log('song part 1 :', part1);
        console.log('song part 2 :', part2);
        console.log('song part 3 :', part3);
        console.log('song part 4 :', part4);


        // let apikey = "5"; // false key for error testing
        let apikey = "52b16d4b4f1246ee800ea25d1b9fe536"; // key tied to g1 email
        // let apikey = "3078a5b6303a4d8f9c134eb7e115fc41"; // key tied to g1 email2 for presentation
        // let apilang = "zh-cn";
        let apilang = "en-us";
        let apicodec = "MP3";
        // let apivoice = "Amy"; testing
        let apiformat = "8khz_8bit_mono"; // default is 8khz_8bit_mono
        let apiB64Status = true; // default is false, true for output as Base64 string format

        // submitting text to API in 4 parts if necessary
        try {
            const response = await API.get(`/?key=${apikey}&hl=${apilang}&c=${apicodec}&f=${apiformat}&v=${genderSubmit}&src=${part1}&b64=${apiB64Status}`);

            if (part2 !== "") {            
                response2 = await API.get(`/?key=${apikey}&hl=${apilang}&c=${apicodec}&f=${apiformat}&v=${genderSubmit}&src=${part2}&b64=${apiB64Status}`);
                setreserveAudio2(response2.data);
    
                if (part3 !== "") {
                    response3 = await API.get(`/?key=${apikey}&hl=${apilang}&c=${apicodec}&f=${apiformat}&v=${genderSubmit}&src=${part3}&b64=${apiB64Status}`);
                    setreserveAudio3(response3.data);
    
                    if (part4 !== "") {
                        response4 = await API.get(`/?key=${apikey}&hl=${apilang}&c=${apicodec}&f=${apiformat}&v=${genderSubmit}&src=${part4}&b64=${apiB64Status}`);
                        setreserveAudio4(response4.data);
                    }
                }
            }

            if (response.status === 200 ) {    
                setplayCount(1); // set playing count at part 1
                setrcvAudio(response.data);
            }
                
        } catch (e) {
            console.log("404 error in submission to speech");
            setplayCount(0);
            return;
        }
    }

    const playAudio = () => {

        if (rcvAudio==="") {
            return;            
            //     <p>no audio currently</p>            
        }

        if (rcvAudio.substring(0,5) === "ERROR") {
            return;
            // <p>{rcvAudio} Please contact admin</p>            
        } // api has its own defined error set

        return (
            <div>
            {/* <p>have audio {playCount}</p> */}
            <audio id="audioPlayer" src={rcvAudio} autoPlay="autoplay" onEnded={checkPlay} controls style={{height: '22px'}}>audio not supported</audio>            
            </div>
        )

    }

    function checkPlay() {
        if (playCount === 0) {
            console.log('playcount: ', playCount);
            return;
        }
        if (playCount === 4) {
            setplayCount(0);
            console.log('playcount: ', playCount);
            return; // reset play count to 0 once part 4 end
        }
        if (playCount === 3) {
            setplayCount(4);
            console.log('playcount: ', playCount);
            setrcvAudio(reserveAudio4);
            return;
        }
        if (playCount === 2) {
            setplayCount(3);
            console.log('playcount: ', playCount);
            setrcvAudio(reserveAudio3);
            return;
        }
        if (playCount === 1) {
            setplayCount(2);
            console.log('playcount: ', playCount);
            setrcvAudio(reserveAudio2);
            return;
        }
    }

    return (
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    {selectGender()}
                    <input className='button' type='submit' value='Voice Reader' style={{display:waitLyrics}}/>
                </form>
                {playAudio(rcvAudio)}
            </div>
        </div>
    )
}

export default TextToSpeech;