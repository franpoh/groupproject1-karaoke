import React, { useState } from 'react';

function DarkMode () {

    let day = '⛅';
    let night = '💤';

    const [darkMode, setdarkMode] = useState(day);
    const [cssState, setcssState] = useState('day'); // css classname day with white background / black font or Xmas?
    // cssState will be used in main div, <div className = `webpage ${cssState}`>

    function handleClick() {
        if (darkMode === day) {
            setdarkMode(night);
            setcssState('night'); // css classname night with dark background / white font 
        } else if (darkMode === night) {
            setdarkMode(day);
            setcssState('day');
        }
    }    

    return (
        <>
            <button style={{backgroundColor: 'darkgrey'}} name='settings' onClick={handleClick}>{darkMode}</button>
        </>
    )
}

export default DarkMode;