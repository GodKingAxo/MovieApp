//TODO: Create genre tag. Sort by certain genres
//When sorting by certain genres I want it to take into account the genre selected and sort it based on popularity descending.
//The movies have 'genre_ids' tied to them, so I need to create a method that checks what ids a certain movie has and compare it to the base_ids of each genre
const API_KEY = 'ca34b1ab541651378e4fd47bce303f53'
const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=1`
const IMG_PATH = "https://image.tmdb.org/t/p/w1280"
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query="`
const GENRE_API = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`

const WITH_GENRE = `https://api.themoviedb.org/3/discover/movie?with_genres=18&api_key=${API_KEY}`
const form = document.getElementById('form')
const search = document.getElementById('search')
const main = document.getElementById('main')


function compareGenreID(genre_id, id) {
    
    if(genre_id === id){
        console.log('Matching IDs!')
    } else {
        console.log('Not Matching IDs')
    }
}

//Get Intial Movies
getAPIS(API_URL, GENRE_API)


async function getAPIS(discover, genre) {
    const discoverRes = await fetch(discover)
    const discoverData = await discoverRes.json()

    const genreRes = await fetch(genre)
    const genreData = await genreRes.json()


    showMovies(discoverData.results)

    //TODO: Add a tag  to each movie element with its correct genre. For example: If a movie has the id of "28" then it will have the little tag  "Action"
    // Similar to how I have the span rating set up. I basically want to do the exact same thing, but apply it to each movie element and make sure they have all the correct genres tied to them

    discoverData.results.forEach((result) => {
         const movieGenreIDS = result.genre_ids // Gives me a list of genre_ids for each movie on this page. The genre_ids return another array
        //  console.log(movieGenreIDS) // Looks like the majority of movies have a max of 4 ids, so I would have to set up 4 spans or tags for each genre
    })
    
    const genres = []
    const genreObj = {} //I think I need to just create an object and not use an array but still not sure
    genreData.genres.forEach((genre) => {
        const genreIDS = genre.id
        const genreName = genre.name
        // console.log(genreIDS + ' / ' + genreName)
        genres.push(genreIDS, genreName)
    }) // Loops through genreData api information and it only pushes each new element into the array, it doesn't make them objects which is what I am trying to do

    console.log(genres)
}
function showMovies(movies) {
    main.innerHTML = ''
    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview, genre_ids} = movie
        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')
        // console.log(genreIDFilter)
        movieEl.innerHTML = `
        <img src="${IMG_PATH + poster_path}" alt="${title}" />
        <div class="movie-info" id="movie-info>
          <h3>${title}</h3>
          <span class="${getClassByRate(vote_average)}">${vote_average}</span>
          <span class="genre-tag"></span>
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