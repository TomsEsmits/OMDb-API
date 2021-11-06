const getMovieBtn = document.querySelector('#get-movie');

if(getMovieBtn) {
  getMovieBtn.addEventListener("click", async (e) => {
    e.preventDefault();
  
    const title = document.querySelector('input[type="text"]').value;
  
    await fetch(`https://omdbapi.com/?s=${title}&apikey=f1196e81&plot=full&page=`)
    .then(response => response.json())
    .then(result => {
      let movieTemplate = "";
      if (result.Response === "True") {
        result.Search.forEach(movie => {
          movieTemplate += `
          <div class="col-sm-6 col-lg-4">
            <div class="card shadow-lg">
              <img src="${movie.Poster}">
              <h5>${movie.Title}</h5>
              <button onclick="movieInfo('${movie.imdbID}')" class="btn btn-lg btn-block btn-outline-light" title="Movie Info">Movie Info</button>
            </div>
          </div>`;
        });
      }
  
      document.querySelector('#movies').innerHTML = movieTemplate;
    })
    .catch(error => {
      console.log("Error(something whent wrong)", error);
    });
  });
}  

function movieInfo(id) {
  sessionStorage.setItem('Movie ID', id);
  window.location = 'movies.html';
  return false;
}

async function getSingleMovie() {
  let singleMovieID = sessionStorage.getItem('Movie ID');

  await fetch(`https://omdbapi.com/?i=${singleMovieID}&apikey=f1196e81`)
  .then(response => response.json())
  .then(singleResponse => {
    let output = `
    <div class="row">
      <div class="col-12">
      <h1 class="movie-heading">${singleResponse.Title}</h1>
      </div>
      <div class="col-md-5 d-flex align-items-center justify-content-center">
        <img class="single-movie-img" src="${singleResponse.Poster}">
      </div>
      <div class="col-md-7 mt-4 mt-md-0">
        <ul class="movie-info-list shadow-lg">
          <li class="list-item"><span>Director: </span> ${singleResponse.Director}</li>
          <li class="list-item"><span>Genre: </span> ${singleResponse.Genre}</li>
          <li class="list-item"><span>IMDB Rating: </span> ${singleResponse.imdbRating}</li>
          <li class="list-item"><span>Description: </span> ${singleResponse.Plot}</li>
          <li class="list-item mt-4"><a class="btn btn-light" href="https://www.imdb.com/title/${singleResponse.imdbID}/" target="_blank" title="Read More!">IMDB Link</a></li>
        </ul>
      </div>
    </div>`;

  document.querySelector('#movie').innerHTML = output;
  });
}