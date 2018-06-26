//Array with list of topics of gifs to search for
var topics = ["Elder Scrolls", "Pac Man", "Mega Man", "The Legend of Zelda", "Last of Us", "Crash Bandicoot", "Final Fantasy", "Chrono Trigger", "Dragon Quest", "Street Fighter", "Overwatch", "League of Legends"];

var favoriteTopics = [];


//Initial display of buttons from the array
showButtons();

//This will show the favorites if there are any in the local storage
if (JSON.parse(localStorage.getItem("gifFavArray"))) {
    showFavorites();
}
else {
    var a = [];
    localStorage.setItem('gifFavArray', JSON.stringify(a));
}



//Adds click function for the input tag that adds whatever value within the search box into a button
$("#add-gif").on("click", function (event) {

    event.preventDefault();

    var searchValue = $("#gif-input").val().trim();

    //Made if statements to prevent blank inputs and duplicates
    if (topics.indexOf(searchValue) >= 0) {
        searchValue = "";
    }

    if (searchValue != "") {
        topics.push(searchValue);

    }

    $("#gif-input").val("");

    //adding the current and newly added term to local storage

    showButtons();
});

$("#add-favorite").on("click", function (event) {

    event.preventDefault();


    var favList = [];
    var searchFavorite = $("#gif-input").val().trim();


    if (JSON.parse(localStorage.getItem("gifFavArray")).includes(searchFavorite)) {
        searchFavorite = "";
    }
    if (searchFavorite !== "") {
        favList.push(searchFavorite);
    }

    favList = JSON.parse(localStorage.getItem("gifFavArray"));
    favList.push(searchFavorite);
    localStorage.setItem("gifFavArray", JSON.stringify(favList));



    $("#gif-input").val("");

    showFavorites();

});


$("#clear-favorite").on("click", function (event) {

    event.preventDefault();

    var clearArray = JSON.parse(localStorage.getItem("gifFavArray"));
    clearArray = [];
    localStorage.setItem("gifFavArray", JSON.stringify(clearArray));

    showFavorites();

});


function animateGif() {
    var state = $(this).attr("data-state");

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

    $("#buttons").empty();

    for (var i = 0; i < topics.length; i++) {
        var arrayButton = $("<button class='gifButton'>");
        arrayButton.attr("data-gif", topics[i]);
        arrayButton.text(topics[i]);
        $("#buttons").append(arrayButton);
    }
};

function showFavorites() {

    $("#favorite").empty();

    for (var i = 0; i < JSON.parse(localStorage.getItem("gifFavArray")).length; i++) {
        var favoriteButton = $("<button class='gifButton favButton'>");
        favoriteButton.attr("data-gif", JSON.parse(localStorage.getItem("gifFavArray"))[i]);
        favoriteButton.text(JSON.parse(localStorage.getItem("gifFavArray"))[i]);
        $("#favorite").append(favoriteButton);
    }

}

//function that uses the Giphy API, searches the button value, and displays that value on the page
function displayGifs() {

    var topicButton = $(this).attr("data-gif");
    var limitNum = $("#limitNumber").val();
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topicButton + "&api_key=St9fx4R3U08J1RutppDEopQxu63ESLaE&limit=" + limitNum;

    $("#gifs-here").empty();

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        var searchTerm = response.data;
        console.log(response);

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
