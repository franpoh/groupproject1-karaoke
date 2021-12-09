// handle input for song search bar and song artist dropdown selection

function setInput(props, event) {
    const output = {
        result: event.target.value,
        target: event.target.id,
    }
    props.handleInputState(output); // pass event.target.value to SearchScreen.js/handleInputState() to set this.state.inputSong/inputArtist
}

export default setInput;