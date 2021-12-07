import React, { useState } from 'react';
import API from '../API-g1';
import langList from './lang';

function TextToSpeech(props) {
    
    let response2;
    let response3;

    const [playCount, setplayCount] = useState(0);
    // const [textSubmitting, settextSubmitting] = useState("");
    const [rcvAudio, setrcvAudio] = useState("");
    const [reserveAudio2, setreserveAudio2] = useState(""); // song audio part 2 if needed
    const [reserveAudio3, setreserveAudio3] = useState(""); // song audio part 3 if needed
    const [langSubmit, setlangSubmit] = useState('en-us');

    const selectLang = () => {

        const optionLang = langList.map((x,i) => {
            return (
                <option key={`${x}-${i}`} value={x.langv}>{x.langtxt}</option>
            )
        })

        return (
            <select id='lang' name = 'lang' defaultValue='en-us' onChange={handleLangChange}>
                {optionLang}
            </select>
        )
    }

    // function handleInputChange (e) {
    //     settextSubmitting(e.target.value);
    // }

    function handleLangChange (e) {
        setlangSubmit(e.target.value);
    }

    async function handleSubmit (e) {
        e.preventDefault();
        console.log('Submitting props: ', props);
        console.log('Submitting text: ', props.sendOutput);
        console.log('Submitting lang:', langSubmit);
        console.log('Submitting text.length: ', props.sendOutput.length);

        if (props.sendOutput === '') {
            alert('string empty!'); // replace before PRODUCTION
            return;
        } // dont waste GET attempt with empty string, daily 350 limit

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

        if (testABC.length > 1364) {
            part1 = testABC.substring(0, 1364); // 1365 = 404 error.... hmmmm so actual limit is 2728 bytes
            let testLength = part1.lastIndexOf('. '); // loophole: if last lines near end is ending with ! or ? non-crit as shouldnt be too far from 1364 unless entire paras before 1364 is ! or ? zzz....
            console.log('check for last . :', testLength); // eg 1353, last index of '. '
            // need if check? if (testLength === -1) no occurence of '. ' unlikely whole song no '. '
            part1 = testABC.substring(0, (testLength+1)); // truncate at last . +1
            part2 = testABC.substring((testLength+1)); // need part 3?
            testABC = part2; // reuse testABC variable for part 3 shuffling
            // part 3...
            if (part2.length > 1364) {
                part2 = part2.substring(0, 1364);
                testLength = part2.lastIndexOf('. ');
                console.log('check for last . :', testLength);
                part2 = part2.substring(0, (testLength+1));
                part3 = testABC.substring((testLength+1)); // as testABC still retains part2 and part3 string
            }

        } else part1 = testABC; // when song length needs only 1 part                
        
        console.log('song part 1 :', part1);
        console.log('song part 2 :', part2);
        console.log('song part 3 :', part3);


        // let apikey = "5"; // false key for error testing
        let apikey = "52b16d4b4f1246ee800ea25d1b9fe536"; // key tied to g1 email
        // let apilang = "zh-cn";
        // let apilang = "en-us";
        let apicodec = "MP3";
        let apiformat = "8khz_8bit_mono"; // default is 8khz_8bit_mono
        let apiB64Status = true; // default is false, true for output as Base64 string format

        const response = await API.get(`/?key=${apikey}&hl=${langSubmit}&c=${apicodec}&f=${apiformat}&src=${part1}&b64=${apiB64Status}`);

        if (part2 !== "") {            
            response2 = await API.get(`/?key=${apikey}&hl=${langSubmit}&c=${apicodec}&f=${apiformat}&src=${part2}&b64=${apiB64Status}`);
            setreserveAudio2(response2.data);

            if (part3 !== "") {
                response3 = await API.get(`/?key=${apikey}&hl=${langSubmit}&c=${apicodec}&f=${apiformat}&src=${part3}&b64=${apiB64Status}`);
                setreserveAudio3(response3.data);
            }
        } 
        console.log('respose 2',response2);

        if (response.status === 200 ) {
            // console.log('200 ok');
            // console.log('Response: ', response);
            // console.log('Response.data: ', response.data);

            setplayCount(1); // set playing count at part 1
            setrcvAudio(response.data);            
            
            // testing with simple URL for audio: setrcvAudio("https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3");
            

        } else {
            console.log('error: ',response.status);
            return;
            }
    }

    const playAudio = () => {

        if (rcvAudio==="") {
            return (
                <p>no audio currently</p>
            )
        }

        if (rcvAudio.substring(0,5) === "ERROR") {
            return (
                <p>{rcvAudio} Please contact admin</p>
            )
        } // api has its own defined error set

        return (
            <div>
            <p>have audio {playCount}</p>
            <audio id="audioPlayer" src={rcvAudio} autoPlay="autoplay" onEnded={checkPlay}>audio not supported</audio>
            </div>
        )

    }

    function checkPlay() {
        if (playCount === 0) {
            console.log('playcount: ', playCount);
            return;
        }
        if (playCount === 3) {
            setplayCount(0);
            console.log('playcount: ', playCount);
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
            <div className='displayWindow2'>                
                <form onSubmit={handleSubmit}>
                    {/* <h3>Input text for speech return</h3>

                    <h5>sample text for copy/paste</h5>

                    <p>Testing 1 2 3, 50,000. This is a chair.</p>

                    <p>早上好，你吃了吗? 1,500,454</p>

                    <p>selamat pagi, dah makan? 459</p>

                    <p>おはようございます、食べましたか? 1,500</p>

                    <p>좋은 아침, 먹었어? 9</p>

                    <textarea name="audiotext" rows="4" cols="50" placeholder={props.sendOutput} onChange={handleInputChange}></textarea> */}

                    {selectLang(langList)}

                    <input type='submit' value='Submit' />
                </form>
                {playAudio(rcvAudio)}
            </div>
        </div>
    )
}

export default TextToSpeech;