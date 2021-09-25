//TODO: Create genre tag. Sort by certain genres
//When sorting by certain genres I want it to take into account the genre selected and sort it based on popularity descending.
//The movies have 'genre_ids' tied to them, so I need to create a method that checks what ids a certain movie has and compare it to the base_ids of each genre
//The main way I can think of going about the genre sorting is by creating different pages for each genre and then implementing the above items.
const API_KEY = 'ca34b1ab541651378e4fd47bce303f53'
const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=1`
const IMG_PATH = "https://image.tmdb.org/t/p/w1280"
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query="`
const GENRE_API = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
const form = document.getElementById('form')
const search = document.getElementById('search')
const main = document.getElementById('main')

//Get Intial Movies
getMovies(API_URL);
getGenres(GENRE_API);

async function getGenres(url) {
    const res = await fetch(url)
    const data = await res.json()
    const genreData = data.genres;
    genreData.forEach((genre) => {
        const genreID = genre.id
        const genreName = genre.name
        console.log(genreName)
        //Start creating webpages for each genre
    })
}
function compareGenreID(genre_id, id) {
    
    if(genre_id === id){
        console.log('Matching IDs!')
    } else {
        console.log('Not Matching IDs')
    }
}
async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()
    // console.log(data.results)
    const movieID = data.results
    movieID.forEach((id) => {
        const title = id.title
        const genreID = id.genre_ids
        // console.log(title + ' / ' + genreID)
    })
    showMovies(data.results)  
}
function showMovies(movies) {
    main.innerHTML = ''
    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview} = movie
        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')

        movieEl.innerHTML = `
        <img src="${IMG_PATH + poster_path}" alt="${title}" />
        <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getClassByRate(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
          <h3>Overview</h3>
          ${overview}
        </div>`
      main.appendChild(movieEl)
    })
}

function getClassByRate(vote) {
    if(vote >= 8) {
        return 'green'
    } else if(vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}
form.addEventListener('submit', (e) => {
    e.preventDefault()
    const searchTerm = search.value
    if(searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm)
        search.value = ''
    } else {
        window.location.reload()
    }
});