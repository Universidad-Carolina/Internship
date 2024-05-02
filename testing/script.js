document.getElementsByClassName('searchBtn')[0].addEventListener('click', function () {
  const searchInput = document.getElementsByClassName('searchInput')[0].value;

  if (searchInput.trim() !== '') {
    fetchMovie(searchInput);
  }
});

function fetchMovie(title) {
  const apiKey = '96dc73e3';
  const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}` + '&t=' + encodeURI(encodeSpacesAsPlus(title));

  console.log(apiUrl);

  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data.Response === 'True') {
        displayMovieDetails(data);
      } else {
        alert('Movie not found!');
      }
    })
    .catch(function (error) {
      console.log('Error fetching data:', error);
    });
}

function encodeSpacesAsPlus(title) {
  return title.replace(/\s/g, '+');
}

function displayMovieDetails(movie) {
  const moviePoster = document.getElementsByClassName('moviePoster')[0];

  if (movie.Poster !== 'N/A') {
    moviePoster.innerHTML = `<img src="${movie.Poster}" alt="Movie Poster">`;
  } else {
    moviePoster.innerHTML = 'No poster available';
  }

  document.getElementsByClassName('movieTitle')[0].innerText = movie.Title;
  document.getElementsByClassName('moviePlot')[0].innerText = movie.Plot;
  document.getElementsByClassName('movieActors')[0].innerText = 'Actors: ' + movie.Actors;
  document.getElementsByClassName('movieDirector')[0].innerText = 'Director: ' + movie.Director;
  document.getElementsByClassName('movieGenre')[0].innerText = 'Genre: ' + movie.Genre;
  document.getElementsByClassName('movieReleased')[0].innerText = 'Released: ' + movie.Released;
  document.getElementsByClassName('movieRuntime')[0].innerText = 'Runtime: ' + movie.Runtime;
  document.getElementsByClassName('movieRating')[0].innerText = 'Rating: ' + movie.imdbRating;
}
