document.getElementById('searchBtn').addEventListener('click', function () {
  const searchInput = document.getElementById('searchInput').value;

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
  const movieDetails = document.getElementById('movieDetails');
  movieDetails.innerHTML = `
        <h2>${movie.Title} (${movie.Year})</h2>
        <img src="${movie.Poster}" alt="Movie Poster">
        <p>${movie.Plot}</p>
    `;
}
