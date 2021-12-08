// Update this.state.favourites/history when component is mounted

function updateList(list) { // this.state.favourites/history is passed in as argument in SearchScreen.js/componentDidMount()
    if (JSON.parse(localStorage.getItem(list)) === null) { // if variable is null after parsing 
        return []; // return an empty array
    } else {
        return JSON.parse(localStorage.getItem(list)); // otherwise return array from Windows.localStorage
    }
}

export default updateList;