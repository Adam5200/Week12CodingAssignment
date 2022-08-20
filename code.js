//the worst playlist ever. Great songs! But they do not go well together.
let songList = [
    {
        id: 0,
        title: "Bohemian Rhapsody",
        artist: "Queen",
        year: "1975"
    },
    {
        id: 1,
        title: "Open The Door",
        artist: "Roger Hodgson",
        year: "2000"
    },
    {
        id: 2,
        title: "Pollos Hermanos Veneno",
        artist: "Chuy Flores",
        year: "2018"
    },
    {
        id: 3,
        title: "Caligula",
        artist: "Windows 96",
        year: "2018"
    },
    {
        id: 4,
        title: "Istanbul (Not Constantinople)",
        artist: "They Might Be Giants",
        year: "1990"
    },
    {
        id: 5,
        title: "Your Precious Moon",
        artist: "Mike Morasky",
        year: "2011"
    },
    {
        id: 6,
        title: "Mr. Blue Sky",
        artist: "Electric Light Orchestra",
        year: "1977"
    },
    {
        id: 7,
        title: "Shine On You Crazy Diamond",
        artist: "Pink Floyd",
        year: "1975"
    },
    {
        id: 8,
        title: "Take My True Love By The Hand",
        artist: "The Limeliters",
        year: "1958"
    },
    {
        id: 9,
        title: "Stairway To Heaven",
        artist: "Led Zeppelin",
        year: "1971"
    }
]

//grabbing all our DOM elements
let songsContainer = $("#songs-container")
let songModal = new bootstrap.Modal('#song-modal')
let songModalTitle = $("#song-modal-title")
let titleInput = $("#title-input")
let artistInput = $("#artist-input")
let yearInput = $("#year-input")

//"random access" variable to store the song ID for the song you are currently working on.
let editSongId = null;

//This function will be called as soon as the DOM is loaded, filling in the table with the data from the array above
$(() => {
    renderSongList()
})

function renderSongList() {
    //out with the old
    songsContainer.empty()
    //and in with the new
    songsContainer.append(songList.map(song => renderSong(song)))
}

function renderSong(song) {
    //All this does is create a table row (for each song), with 4 "columns" each containing a piece of the songs data (and the buttons)
    return $("<tr/>").append(
        $("<td/>").text(song.title),
        $("<td/>").text(song.artist),
        $("<td/>").text(song.year),
        $("<td/>").append(
            $("<button>").addClass("btn btn-primary me-2").text("Edit").on("click", () => editSong(song.id)),
            $("<button>").addClass("btn btn-danger").text("Delete").on("click", () => deleteSong(song.id))
        )
    )
}

function createSong() {
    //if you were editing a song earlier, that songs ID might still be stuck in this variable! Therefore we set it to null here.
    editSongId = null;
    //ensure that the modal form is clear if you are adding a new song to the list
    titleInput.val("")
    artistInput.val("")
    yearInput.val("")

    //Change the modal title to match with what we're doing, and then display it.
    songModalTitle.text("Add a New Song")
    songModal.show();
}

function editSong(songId) {
    //Finding our song through the function's parameter
    let song = songList.find(song => song.id === songId);
    editSongId = song.id;

    //Change the modal title to match with what we're doing, and then display it.
    songModalTitle.text("Edit " + song.title)
    songModal.show();

    //update with the new data given
    titleInput.val(song.title)
    artistInput.val(song.artist)
    yearInput.val(song.year)
}

function saveSong() {
    //if you are creating a new song to add, the id will be null (see line 81).
    if (editSongId === null) {
        //pushing the new song into our main array
        songList.push({
            id: songList[songList.length],
            title: titleInput.val(),
            artist: artistInput.val(),
            year: yearInput.val()
        })
    } else {
        // Find the song we're editing (we must have the editSongId value set to something other than null!)
        const song = songList.find(song => song.id === editSongId);
        // Update it with any edited info
        song.title = titleInput.val();
        song.artist = artistInput.val();
        song.year = yearInput.val();
    }
    // close the modal
    songModal.hide();
    // rerender the list of songs
    renderSongList();
}

function deleteSong(songId) {
    //find out which song the (specific) button we pressed corresponds to
    const indexToDelete = songList.findIndex(song => song.id === songId)
    //remove the item from the array
    songList.splice(indexToDelete, 1);
    //re-render the list of songs
    renderSongList();
}

//Note: "song" no longer sounds like a word to me