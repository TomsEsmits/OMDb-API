function buttonListener() {
  document.querySelector('#get-movie').addEventListener('click', getMovies);
}

function getMovies(e) {
  const title = document.querySelector('input[type="text"]').value;

  const xhr = new XMLHttpRequest();

  xhr.open('GET', `http://www.omdbapi.com?s=${title}&apikey=f1196e81&plot=full`, true);

  xhr.onload = function() {
    if(this.status === 200) {
      const response = JSON.parse(this.responseText);
      console.log(response);

      let output = '';

       if(response.Response === "True") {
        response.Search.forEach(function(movie){
          output += `
            <div class="col-sm-6 col-lg-4">
              <div class="card shadow-lg">
                <img src="${movie.Poster}">
                <h5>${movie.Title}</h5>
                <a onclick="movieInfo('${movie.imdbID}')" class="btn btn-lg btn-block btn-outline-light" href="#">Movie Info</a>
              </div>
            </div>
          `;
        });
      } else {
        output += '<div class="col-12"><p class="text-danger text-uppercase"> Enter Correct Title</p></div>';
      }

      document.querySelector('#movies').innerHTML = output;
    }
  }

  xhr.send();

  e.preventDefault();
}

function movieInfo(id) {
  sessionStorage.setItem('Movie ID', id);
  window.location = 'movies.html';
  return false;
}

function getSingleMovie() {
  let singleMovieID = sessionStorage.getItem('Movie ID');
  console.log(singleMovieID);

  const xh = new XMLHttpRequest();

  xh.open('GET', `http://www.omdbapi.com/?i=${singleMovieID}&apikey=f1196e81`, true);

  xh.onload = function() {
    if(this.status === 200) {
      const singleResponse = JSON.parse(this.responseText);
      console.log(singleResponse);

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
        </div>
      `;

      document.querySelector('#movie').innerHTML = output;
    }
  }
  xh.send();
}