import React, { useState } from 'react';
import xmasImage from '../assets/christmas-1920.jpg'

function DarkMode () {

    let day = '⛅';
    let night = '💤';
    let xmas = '🎅';

    const [darkMode, setdarkMode] = useState(night);
    const [cssState, setcssState] = useState('night'); // css classname day with white background / black font or Xmas?
    // cssState will be used in main div, <div className = `webpage ${cssState}`>

    function handleClick() {
        if (darkMode === day) {            
            setdarkMode(night);
            setcssState('night'); // css classname night with dark background / white font 
            document.getElementById("mainbody").style.backgroundImage = "none";
        } else if (darkMode === night) {
            setdarkMode(xmas);
            setcssState('xmas');
            document.getElementById("mainbody").style.backgroundImage = "none";
        } else if (darkMode === xmas) {
            setdarkMode(day);
            setcssState('day');
            // document.getElementById("mainbody").style.backgroundImage = "url('https://www.adorama.com/alc/wp-content/uploads/2018/01/best-online-free-photography-courses-feature-825x465.jpg')";
            document.getElementById("mainbody").style.backgroundImage = `url(${xmasImage})`;
        }
        document.getElementById("mainbody").className = `webpage ${cssState}`; // add class, not override
    }    

    return (
        <>
            <button style={{backgroundColor: 'darkgrey'}} name='settings' onClick={handleClick}>{darkMode}</button>
        </>
    )
}

export default DarkMode;