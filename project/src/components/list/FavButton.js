// Return 'Add to Favourites' button

import addList from "./AddList";
import "../SearchLayout.css";

function FavButton(props) {
    return (
        <button 
            className="button"
            id="addfav" 
            onClick={(event) => {
                addList(props, event.target.id); // pass props and event target id to AddList.js/addList()
            }}
        >Add to Favourites</button> 
    )
}

export default FavButton;