//Array with list of topics of gifs to search for
var topics = ["Elder Scrolls", "Pac Man", "Mega Man", "The Legend of Zelda"];

//Initial display of buttons from the array
showButtons();

//Adds click function for the input tag that adds whatever value within the search box into a button
$("#add-gif").on("click", function (event) {

    event.preventDefault();

    var searchValue = $("#gif-input").val().trim();
    topics.push(searchValue);
    showButtons();
});

function animateGif(){
    var state = $(this).attr("data-state");

    if(state === "still"){
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    }
    else{
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

//function that uses the Giphy API, searches the button value, and displays that value on the page
function displayGifs() {

    var topicButton = $(this).attr("data-gif");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topicButton + "&api_key=St9fx4R3U08J1RutppDEopQxu63ESLaE&limit=10";

    $("#gifs-here").empty();

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        var searchTerm = response.data;

        for (var i = 0; i < searchTerm.length; i++) {

            var newImage = $("<img class='gif'>");
            var newP = $("<p>");
            newP.text("Rating: " + searchTerm[i].rating);

            newImage.attr("data-state", "still");
            newImage.attr("src", searchTerm[i].images.fixed_height_still.url);
            newImage.attr("data-animate", searchTerm[i].images.fixed_height.url);
            newImage.attr("data-still", searchTerm[i].images.fixed_height_still.url);

            $("#gifs-here").append(newP, newImage);

        }
    });
}

//Adds any buttons with the "gif" class to run the displayGifs function when clicked
$(document).on("click", ".gifButton", displayGifs);
$(document).on("click", ".gif", animateGif);









