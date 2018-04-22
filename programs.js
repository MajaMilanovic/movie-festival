'use strict';
var dateChosen = document.querySelector("#program-date");
var dropdown_programs = document.querySelector("#dropdown-programs");
var list_created_programs = document.querySelector("#list-created-programs");
var createProgramButton = document.querySelector("#createProgram");
var addMovieToProgramButton = document.querySelector("#addMovie");

function Program(date) {
    this.date = this.createDate(date);
    this.moviesInProgram = [];
};

Program.prototype.createDate = function (date) {
    var myDate = new Date(date);
    var currentDay = myDate.getDate();
    var currentMonth = myDate.getMonth();
    currentMonth++;
    var currentYear = myDate.getFullYear();
    var result = currentDay + "-" + currentMonth + "-" + currentYear;
    return result;
}

Program.prototype.getData = function () {
    var sum = 0;
    this.moviesInProgram.forEach(element => {
        sum += parseInt(element.length);
    });

    return this.date + ", program has: " + this.moviesInProgram.length + " movies; duration: " + sum + " min.";

};

var programList = [];
var programCounter = 0;

function createProgram() {
    var program = new Program(dateChosen.value);
    programList.push(program);

    var option = document.createElement("option");
    option.textContent = program.getData();
    option.value = programCounter;

    dropdown_programs.appendChild(option);

    var li = document.createElement("li");
    li.textContent = program.getData();

    list_created_programs.appendChild(li);

    programCounter++;
}

createProgramButton.addEventListener("click", createProgram);


function addMovieToProgram() {
    var selectedMovieFromDropdown = listOfMovies[movieDropdown.selectedIndex];
    var selectedProgramFromDropdown = programList[dropdown_programs.selectedIndex];
    selectedProgramFromDropdown.moviesInProgram.push(selectedMovieFromDropdown);

    var repertoire = "";
    selectedProgramFromDropdown.moviesInProgram.forEach(function (movie) {
        repertoire += movie.getData() + "; ";
    });

    var selectOption = dropdown_programs.options[dropdown_programs.selectedIndex];
    selectOption.textContent = selectedProgramFromDropdown.getData();

    var li = list_created_programs.children[dropdown_programs.selectedIndex];
    li.textContent = selectedProgramFromDropdown.getData() + repertoire;
}

addMovieToProgramButton.addEventListener("click", addMovieToProgram);