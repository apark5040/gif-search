var topics = ["Elder Scrolls", "Pac Man", "Mega Man"];

showButtons();



function showButtons() {

    $("#buttons").empty();

    for (var i = 0; i < topics.length; i++) {
        var arrayButton = $("<button class='gif'>");
        arrayButton.attr("data-gif", topics[i]);
        arrayButton.text(topics[i]);
        $("#buttons").append(arrayButton);
    }
}

$("#add-gif").on("click", function (event) {

    event.preventDefault();

    var searchValue = $("#gif-input").val().trim();
    topics.push(searchValue);
    showButtons();
});




function displayGifs() {

    var topicButton = $(this).attr("data-gif");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topicButton + "&api_key=St9fx4R3U08J1RutppDEopQxu63ESLaE";


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        var searchTerm = response.data;
        console.log(response);

        for (var i = 0; i < searchTerm.length; i++) {

            var newDiv = $("<div>");
            var newImage = $("<img>");

            newImage.attr("src", searchTerm[i].images.fixed_height.url);

            $("#gifs-here").prepend(newImage);

        }
    });
}

//Adds any buttons with the "gif" class to run the displayGifs function when clicked
$(document).on("click", ".gif", displayGifs);









