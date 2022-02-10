const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1';

const IMG_PATH = `https://image.tmdb.org/t/p/w1280`;
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';

const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');
// Get initial movies
getMovies(API_URL);
async function getMovies(url){
   const res = await fetch(url);
   const data = await res.json();

//    console.log(data.results);
   showMovies(data.results);
}
function showMovies(movies){
    main.innerHTML = ''
  movies.forEach((movie) => {
      const { title, poster_path, vote_average, overview } = movie;
      const movieEl = document.createElement('div');
      movieEl.classList.add('movie');
      
      movieEl.innerHTML = `
      <img src="${IMG_PATH + poster_path}" alt="${title}">
      <div class="movie-info">
      <h3>${title}</h3>
      <span class="${getClassByRate(vote_average)}">${vote_average}</span>
      </div>
      <div class="overview">
      <h3>Overview</h3>
       ${overview}
      </div>
    
      `
      main.appendChild(movieEl);

    //   const imgEL = document.createElement('img');
    //   imgEL.add.src = ;
    //   const movieInfo = document.createElement('div');
    //   movieInfo.classList.add('movie-info');
    //   const headinH3 = document.createElement('h3');
    //   const span = document.createElement('span');
    //   span.classList.add('green');
    //   const overview = document.createElement('div');
    //   overview.classList.add('overview');
    //   const overviewh3 = document.createElement('h3');

  });
}

  function getClassByRate(vote){
      if(vote >= 8){
          return 'green'
      }else if(vote >= 5){
           return 'orange'
      }else{
          return 'red'
      }
  }
form.addEventListener('submit', (e)=>{
   e.preventDefault();

   const searchTerm = search.value
   if(searchTerm && searchTerm != ''){
       getMovies(SEARCH_API + searchTerm)

       search.value = ''
   }else{
       window.location.reload()
   }
})

