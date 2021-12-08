import React, { useState } from 'react';

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
        } else if (darkMode === night) {
            setdarkMode(xmas);
            setcssState('xmas');
        } else if (darkMode === xmas) {
            setdarkMode(day);
            setcssState('day');
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