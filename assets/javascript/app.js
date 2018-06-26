//Array with list of topics of gifs to search for
var topics = ["Elder Scrolls", "Pac Man", "Mega Man", "The Legend of Zelda", "Last of Us", "Crash Bandicoot", "Final Fantasy", "Chrono Trigger", "Dragon Quest", "Street Fighter", "Overwatch", "League of Legends"];

//Initial display of buttons from the array
showButtons();

//Adds favorite buttons if there is a local storage array
isLocalStorage();



//Adds click function for the input tag that adds whatever value within the search box into a button
$("#add-gif").on("click", function (event) {

    event.preventDefault();

    //grabs the input value
    var searchValue = $("#gif-input").val().trim();

    //Made if statements to prevent blank inputs and duplicates
    if (topics.includes(searchValue)) {
        return;
    }

    if (searchValue == "") {
        return;
    }

    //adds the input into the topics array
    topics.push(searchValue);

    //clears input field
    $("#gif-input").val("");

    //updates the list of buttons to include the new button
    showButtons();
});


//Event handler for click function to add favorite buttons
$("#add-favorite").on("click", function (event) {

    event.preventDefault();

    //array variable for push to local storage
    var favList = [];

    //If there is no local storage, it will create an empty one. If there is one, it will grab it and store in favList
    if(!JSON.parse(localStorage.getItem("gifFavArray"))){
        var a = [];
        localStorage.setItem('gifFavArray', JSON.stringify(a));
    }
    else{
        //grabs the array from the local storage and assigns it to array variable
        favList = JSON.parse(localStorage.getItem("gifFavArray"));
    };
    
    //grabing input value
    var searchFavorite = $("#gif-input").val().trim();

    //Prevent duplicates and blanks
    if (searchFavorite == "") {
        return;
    }
    if (JSON.parse(localStorage.getItem("gifFavArray")).includes(searchFavorite)) {
        return;
    }

    //pushes input value to array
    favList.push(searchFavorite);

    //sets the updated array back into the local storage
    localStorage.setItem("gifFavArray", JSON.stringify(favList));

    //Clears input field
    $("#gif-input").val("");

    //Displays favorite buttons
    showFavorites();

});


//event handler for clear click function
$("#clear-favorite").on("click", function (event) {

    event.preventDefault();

    //Declares empty variable
    var clearArray = [];

    //Updates the local storage array to an empty array
    localStorage.setItem("gifFavArray", JSON.stringify(clearArray));

    //Updates the favorite section
    showFavorites();

});


//function that switches the Still attribute and Animate Attribute to start and stop gif
function animateGif() {

    //grabs current state of gif(Animate or Still)
    var state = $(this).attr("data-state");

    //If statement that changes the state
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    }
    else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
};


//function that will display buttons for each item in the array. Used also when adding a new button.
function showButtons() {

    //empties buttons div to prevent duplicates
    $("#buttons").empty();

    //For statement that goes through every element in array and creates buttons for them
    for (var i = 0; i < topics.length; i++) {
        var arrayButton = $("<button class='gifButton'>");
        arrayButton.attr("data-gif", topics[i]);
        arrayButton.text(topics[i]);
        $("#buttons").append(arrayButton);
    }
};


//This will print the favorite buttons if there is a local storage. If not, nothing will happend. 
function isLocalStorage() {
    //This will show the favorites if there are any in the local storage. If not, then it will create a local storage
    if (JSON.parse(localStorage.getItem("gifFavArray"))) {
        showFavorites();
    }
    else {
        return;
    }
}

//Displays the buttons that were submitted as favorite
function showFavorites() {

    //empties favorite div to prevent duplicates
    $("#favorite").empty();

    //for loop to display each element in local storage array as a button
    for (var i = 0; i < JSON.parse(localStorage.getItem("gifFavArray")).length; i++) {
        var favoriteButton = $("<button class='gifButton favButton'>");
        favoriteButton.attr("data-gif", JSON.parse(localStorage.getItem("gifFavArray"))[i]);
        favoriteButton.text(JSON.parse(localStorage.getItem("gifFavArray"))[i]);
        $("#favorite").append(favoriteButton);
    }

}

//function that uses the Giphy API, searches the button value, and displays that value on the page
function displayGifs() {

    //Grabs the value that was clicked
    var topicButton = $(this).attr("data-gif");

    //grabs the value that was selected in the number of gifs dropdown
    var limitNum = $("#limitNumber").val();

    //API URL
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topicButton + "&api_key=St9fx4R3U08J1RutppDEopQxu63ESLaE&limit=" + limitNum;

    //empties gifs to prevent duplicates
    $("#gifs-here").empty();


    //ajax function to use API, grabs the gif info, and put the gifs on the html
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        var searchTerm = response.data;

        for (var i = 0; i < searchTerm.length; i++) {

            var newDiv = $("<div class='col-md-5 searchGif'>");
            var newImage = $("<img class='gif'>");
            var newP = $("<p>");
            newP.text("Rating: " + searchTerm[i].rating);
            newDiv.append(newP, newImage);

            newImage.attr("data-state", "still");
            newImage.attr("src", searchTerm[i].images.fixed_width_still.url);
            newImage.attr("data-animate", searchTerm[i].images.fixed_width.url);
            newImage.attr("data-still", searchTerm[i].images.fixed_width_still.url);

            $("#gifs-here").append(newDiv);
        }
    });
};

//Adds any buttons with the "gifButton" class to run the displayGifs function when clicked
$(document).on("click", ".gifButton", displayGifs);

//Adds any gifs with the "gif" class to run the displayGifs functionwhen clicked
$(document).on("click", ".gif", animateGif);
