const clientId = `028888305a3c435a840e3cbf36e027e3`;
const clientSecret = `1a1200bb13af48409d6fe1638ed19760`;
let accessToken = '';
let itemList = [];
let datalist = [];
let showPlaylists = false; // Variable to track if playlists should be shown

async function getToken() {
    try {
        const result = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                'Authorization': "Basic " + btoa(`${clientId}:${clientSecret}`),
            },
            body: "grant_type=client_credentials",
        });
        const data = await result.json();
        accessToken = data.access_token;
        console.log(data);
        console.log(accessToken);
        getData(accessToken);
    } catch (error) {
        console.error('Error fetching access token:', error);
    }
}

// Function to fetch genres and display them
function getData(token) {
    fetch(`https://api.spotify.com/v1/browse/categories`, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch genres');
        }
        return response.json();
    })
    .then(data => {
        datalist = data;
        itemList = data.categories.items; // Store genres data
        fetchGenres(datalist);
    })
    .catch(error => console.error('Error fetching genres:', error));
}

// Function to fetch genres from Spotify API
function fetchGenres(data) {
    if (showPlaylists) {
            const genresContainer = document.getElementById('genresContainer');
            genresContainer.innerHTML = ''; // Clear previous content
            data.categories.items.forEach(genre => {
                // For each genre, fetch the first playlist to get its image
                fetchPlaylistImage(genre.name)
                    .then(imageUrl => {
                        // Display genre with associated image
                        if (imageUrl == "") {
                            genresContainer.innerHTML += `<div class = "genre-name "><img class = "genre-image" 
                            onclick="fetchPlaylists('${genre.id}')" src="no_image.jpeg" alt="${genre.name}"><br>
                            ${genre.name}</div>`;
                        } else {
                            genresContainer.innerHTML += `<div class = "genre-name "><img class = "genre-image"
                             onclick="fetchPlaylists('${genre.id}')" src="${imageUrl}" alt="${genre.name}"><br>
                             ${genre.name}</div>`;
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching playlist image:', error);
                        // Display genre without image if fetching image fails
                    });
            });

    } else {
            const genresContainer = document.getElementById('genresContainer');
            genresContainer.innerHTML = ''; // Clear previous content
            data.categories.items.forEach(genre => {
                // For each genre, fetch the first playlist to get its image
                fetchPlaylistImage(genre.name)
                    .then(imageUrl => {
                        // Display genre with associated image
                        if (imageUrl == "") {
                            genresContainer.innerHTML += `<div class = "genre-name "><img class = "genre-image" 
                            src="no_image.jpeg" alt="${genre.name}"><br>${genre.name}</div>`;
                        } else {
                            genresContainer.innerHTML += `<div class = "genre-name "><img class = "genre-image" 
                            src="${imageUrl}" alt="${genre.name}"><br>${genre.name}</div>`;
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching playlist image:', error);
                        // Display genre without image if fetching image fails
                    });
            });

    }
}

// Function to fetch the image for a given genre name
async function fetchPlaylistImage(genreName) {
    try {
        const genre = itemList.find(item => item.name === genreName);
        if (!genre) {
            return ""; // Return empty string if genre not found
        }
        return genre.icons[0].url; // Return the URL of the genre image
    } catch (error) {
        console.error('Error fetching playlist image:', error);
        return ""; // Return empty string in case of error
    }
}

function fetchPlaylists(genreId) {
    // Make API call to fetch playlists for the selected genre
    fetch(`https://api.spotify.com/v1/browse/categories/${genreId}/playlists`, {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch playlists');
        }
        return response.json();
    })
    .then(data => {
        // Display playlists in the playlistsContainer div
        const playlistsContainer = document.getElementById('playlistsContainer');
        playlistsContainer.innerHTML = ''; // Clear previous content
        data.playlists.items.forEach(playlist => {
            if(playlistsContainer.innerHTML == ""){
                playlistsContainer.innerHTML +=`<h2 class = "playlist">Playlist for ${data.message}</h2>`
            }
            // Fetch playlist image
            fetchPlaylistImageA(playlist.id)
                .then(imageUrl => {
                    // Display playlist with associated image
                    playlistsContainer.innerHTML += `
                        <div class="playlistItem" onclick="showModal('${playlist.id}')">
                            <img src="${imageUrl}" alt="${playlist.name}">
                            <div class="playlistName">${playlist.name}</div>
                        </div>`;
                })
                .catch(error => {
                    console.error('Error fetching playlist image:', error);
                    // Display playlist without image if fetching image fails
                    playlistsContainer.innerHTML += `
                        <div class="playlistItem" onclick="showModal('${playlist.id}')">
                            <div class="playlistName">${playlist.name}</div>
                        </div>`;
                });
        });
    })
    .catch(error => console.error('Error fetching playlists:', error));
}

// Function to fetch the image for a given playlist ID
async function fetchPlaylistImageA(playlistId) {
    try {
        const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch playlist');
        }
        const data = await response.json();
        if (data.images && data.images.length > 0) {
            return data.images[0].url; // Return the URL of the playlist image
        } else {
            return ""; // Return empty string if playlist image not found
        }
    } catch (error) {
        console.error('Error fetching playlist image:', error);
        return ""; // Return empty string in case of error
    }
}

// Function to fetch tracks for a selected playlist
function fetchTracks(playlistId) {
    // Make API call to fetch tracks for the selected playlist
    fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch tracks');
        }
        return response.json();
    })
    .then(data => {
        // Display tracks in the modal
        const modalTracksContainer = document.getElementById('modalTracksContainer');
        modalTracksContainer.innerHTML = ''; // Clear previous content
        data.items.forEach(item => {
            const track = item.track;
            modalTracksContainer.innerHTML += `
                <div class="track">
                    <div class="track-name">${track.name}</div>
                    <div class="artist-name">${track.artists.map(artist => artist.name).join(', ')}</div>
                </div>`;
        });
        // Show the modal
        const modal = document.getElementById('myModal');
        modal.style.display = 'block';
    })
    .catch(error => console.error('Error fetching tracks:', error));
}


// Function to show modal with playlist tracks
function showModal(playlistId) {
    fetchTracks(playlistId);
}

// Close the modal when the close button or outside the modal is clicked
window.onclick = function(event) {
    const modal = document.getElementById('myModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Close the modal when the close button is clicked
document.querySelector('.close').onclick = function() {
    const modal = document.getElementById('myModal');
    modal.style.display = "none";
}
// Function to toggle display of playlists
function togglePlaylists() {
    showPlaylists = !showPlaylists; // Toggle the showPlaylists variable
    const playlistsContainer = document.getElementById('playlistsContainer');
    playlistsContainer.style.display = showPlaylists ? 'block' : 'none'; 
    const tracksContainer = document.getElementById('tracksContainer');
    tracksContainer.style.display = showPlaylists ? 'block' : 'none'; 
    if (showPlaylists) {
        // If "Show Playlist" checkbox is checked, fetch and display playlists
        fetchGenres(datalist);
    }
}

function resetGenres() {
    document.getElementById('searchInput').value = '';
    const genres = document.getElementById('genresContainer').querySelectorAll('div');
    genres.forEach(genre => {
        genre.style.display = 'block';
    });
    const playlistsContainer = document.getElementById('playlistsContainer');
    playlistsContainer.style.display = 'none';
    const tracksContainer = document.getElementById('tracksContainer');
    tracksContainer.style.display = 'none';
    const showPlaylistsCheckbox = document.getElementById('showPlaylists');
    showPlaylistsCheckbox.checked = false;
    showPlaylists = false;
}

function searchGenres() {
    const playlistsContainer = document.getElementById('playlistsContainer');
    playlistsContainer.style.display = 'none';
   
    // Hide tracks container
    const tracksContainer = document.getElementById('tracksContainer');
    tracksContainer.style.display = 'none';
    const showPlaylistsCheckbox = document.getElementById('showPlaylists');
    showPlaylistsCheckbox.checked = false;
    const query = document.getElementById('searchInput').value.toLowerCase();
    const genres = document.getElementById('genresContainer').querySelectorAll('div');

    genres.forEach(genre => {
        const genreName = genre.textContent.toLowerCase();
        if (genreName.includes(query)) {
            genre.style.display = 'block';
        } else {
            genre.style.display = 'none';
        }
    });
}


// Function to scroll smoothly to the genres section
function scrollToGenres() {
    document.getElementById('genres-section').scrollIntoView({ behavior: 'smooth' });
}
// function scrollToplaylist() {
//     document.getElementById('list').scrollIntoView({ behavior: 'smooth' });
// }
function scrollToherosection() {
    document.getElementById('herosection').scrollIntoView({ behavior: 'smooth' });
}

// Function to alternate text in the hero section
function alternateText() {
    const alternateTextElement = document.getElementById('alternate-text');

    setInterval(() => {
        if (alternateTextElement.innerText === 'Music for everyone.') {
            alternateTextElement.innerText = 'Listen to new music.';
        } else {
            alternateTextElement.innerText = 'Music for everyone.';
        }
    }, 5000); 
}

// Initial function call to fetch and display genres
getToken();
alternateText();
