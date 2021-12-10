import React, { useState } from 'react';
import xmasImage from '../assets/christmas-1920.jpg'
import xmasImage2 from '../assets/christmas-dark-1920.jpg'

function DarkMode() {
    // currently default page start with night mode, as not loading bckgnd image
    let day = '👼'; // using day for night xmas
    let night = '💤';
    let xmas = '🎅';

    const [darkMode, setdarkMode] = useState(xmas);
    const [cssState, setcssState] = useState('xmas'); // css classname day with white background / black font or Xmas?    

    function handleClick() {
        if (darkMode === day) {
            setdarkMode(night);
            setcssState('night'); // css classname night with dark background / white font 
            document.getElementById("wholebody").style.backgroundImage = `url(${xmasImage2})`;            
        } else if (darkMode === night) {
            setdarkMode(xmas);
            setcssState('xmas');
            document.getElementById("wholebody").style.backgroundImage = "none";
            document.body.style.backgroundImage = "none";
            // document.body.style.backgroundColor = "rgba(26, 26, 26)";
        } else if (darkMode === xmas) {
            setdarkMode(day);
            setcssState('day');
            document.getElementById("wholebody").style.backgroundImage = `url(${xmasImage})`;            
        }
        document.getElementById("wholebody").className = `webpage ${cssState}`; // add class, not override
        document.body.style.className = `webpage ${cssState}`;
    }

    return (
        <>
            <button style={{ backgroundColor: 'darkgrey' }} name='settings' onClick={handleClick}>{darkMode}</button>
        </>
    )
}

export default DarkMode;