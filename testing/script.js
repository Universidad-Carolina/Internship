document.getElementsByClassName('searchBtn')[0].addEventListener('click', searchMovie);

document.getElementsByClassName('searchInput')[0].addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    searchMovie();
  }
});

function searchMovie() {
  const searchInput = document.getElementsByClassName('searchInput')[0].value;

  if (searchInput.trim() !== '') {
    fetchMovie(searchInput);
  }
}

function fetchMovie(title) {
  const apiKey = '96dc73e3';
  const yearRegex = /\b\d{4}\b/;
  let year = '';

  const matches = title.match(yearRegex);
  if (matches) {
    year = matches[0];
    title = title.replace(year, '').trim();
  }

  const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURI(encodeSpacesAsPlus(title))}&plot=full${year ? `&y=${year}` : ''}`;

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
    moviePoster.style.backgroundImage = `url(${movie.Poster})`;
  } else {
    moviePoster.innerHTML = 'No poster available';
  }

  document.getElementsByClassName('movieTitle')[0].innerText = movie.Title;
  document.getElementsByClassName('moviePlot')[0].innerText = movie.Plot;

  document.getElementsByClassName('actorsText')[0].innerText = 'Actors: ';
  document.getElementsByClassName('movieActors')[0].innerHTML = movie.Actors;
  document.getElementsByClassName('directorText')[0].innerText = 'Director: ';
  document.getElementsByClassName('movieDirector')[0].innerText = movie.Director;
  document.getElementsByClassName('writersText')[0].innerText = 'Writers: ';
  document.getElementsByClassName('movieWriters')[0].innerText = movie.Writer;

  document.getElementsByClassName('movieReleased')[0].innerText = movie.Year;
  document.getElementsByClassName('movieRuntime')[0].innerText = convertRuntime(movie.Runtime); // Convert runtime format

  document.getElementsByClassName('movieRated')[0].innerText = movie.Rated;

  document.getElementsByClassName('movieRatings')[0].innerText = 'Ratings:';
  document.getElementsByClassName('imbdSource')[0].innerText = movie.Ratings[0].Source;
  document.getElementsByClassName('imbdRating')[0].innerText = movie.Ratings[0].Value;
  document.getElementsByClassName('rottenSource')[0].innerText = movie.Ratings[1].Source;
  document.getElementsByClassName('rottenRating')[0].innerText = movie.Ratings[1].Value;
  document.getElementsByClassName('metacriticSource')[0].innerText = movie.Ratings[2].Source;
  document.getElementsByClassName('metacriticRating')[0].innerText = movie.Ratings[2].Value;
}

function convertRuntime(runtime) {
  const minutes = parseInt(runtime);
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}H${remainingMinutes}M`;
}
