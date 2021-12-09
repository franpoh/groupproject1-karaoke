// Add to Favourites and History lists

function addList(props, target) {
    const p = new Promise((resolve) => {
        let pList = props.list; // receive this.state.favourites/history

        const item = {
            title: props.title, // receive this.state.searchTitle
            vtitle: props.vtitle,
            url: props.url, // receive this.state.searchURL
            artist: props.artist,
        }

        pList.unshift(item); // Append to start of pList

        const res = { // responding with an object containing pList and event.target.id
            list: pList,
            target,
        }

        resolve(res);
    })

    p.then(res => props.addListState(res)) // pass resolve/response to SearchScreen.js/addListState() to set this.state.favourites/history and update Windows.localStorage
}

export default addList;