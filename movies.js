"use strict";
var title = document.querySelector("#movie-title");
var length = document.querySelector("#movie-length");
var genre = document.querySelector("#movie-genre");
var movieDropdown = document.querySelector("#dropdown-movies");
var p = document.querySelector("#calculate-movies-lenght");
var titleError = document.querySelector("#title-error");


function Genre(name) {
    this.name = name;
};

Genre.prototype.getData = function () {
    var firstLetter = this.name[0];
    var lastLetter = this.name[this.name.length - 1];
    var acr = firstLetter + lastLetter;
    return acr.toUpperCase();
};

var genreList = [];

function createNewGenre(label) {
    label.forEach(function (genreName) {
        var movieGenre = new Genre(genreName);
        var index = genreList.push(movieGenre);
        var option1 = document.createElement("option");
        option1.textContent = movieGenre.name;
        option1.value = index;
        genre.appendChild(option1);
    });
};

var myGenres = ["Anime", "Action", "Drama", "Historical", "Comedy", "Horror", "Thriller", "Adventure", "Romance"];
createNewGenre(myGenres);

function Movie(title, length, genreOfMovie) {
    this.title = title;
    this.length = length;
    this.genreOfMovie = genreOfMovie;

};
Movie.prototype.getData = function () {
    var index = genre.selectedIndex;
    var selectedGenre = genreList[index];

    return this.title + ", " + this.length + "min " + selectedGenre.getData();
}

var listOfMovies = []
var totalNumOfMovies = listOfMovies.length;

function createMovie() {
    if (!title.value) {
        titleError.style.display = "block";
        return;
    }
    var index = genre.selectedIndex;
    var selectedGenre = genreList[index];

    var movie = new Movie(title.value, length.value, selectedGenre);

    if (isMovieInList(listOfMovies, movie)) {
        return;
    }
    addMovie(movie);
    outputMovies(movie);
    calculateLengthOfMovies();
    title.value = "";
    length.value = "";
    genre.selectedIndex = 0;
};

function isMovieInList(list, newMovie) {
    if (list.length === 0) {
        return;
    }
    var result;
    list.forEach(movie => {
        if (movie.getData() === newMovie.getData()) {
            return result = true;
        }
        return result = false;
    });
    return result;
}

function addMovie(movie) {
    listOfMovies.push(movie);
    totalNumOfMovies = listOfMovies.length;
    var optionMovie = document.createElement("option");
    var indexOfMovie = totalNumOfMovies - 1;
    optionMovie.textContent = movie.getData();
    optionMovie.value = indexOfMovie;
    movieDropdown.appendChild(optionMovie);
};

function outputMovies(movie) {
    var li = document.createElement("li");
    var ulOfMovies = document.querySelector("#list-created-movies");
    li.textContent = movie.getData();
    ulOfMovies.appendChild(li);
};

function totalMovieLength() {
    var sum = 0
    listOfMovies.forEach(m => {
        sum += parseInt(m.length);
    });
    return sum;
};

function calculateLengthOfMovies() {
    p.textContent = "total length is : " + totalMovieLength() + " min.";
}

var buttonCreateMovie = document.querySelector("#create-movie");
buttonCreateMovie.addEventListener("click", createMovie);

title.addEventListener("focus", function () {
    titleError.style.display = "none";
})