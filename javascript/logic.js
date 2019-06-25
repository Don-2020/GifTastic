
var topics = [];
$(document).on("click", ".topic-btn", displayUserChoice);
renderButtons();
function displayUserChoice() {
    var userInput = $(this).attr("data-name");

    // $.get(`http://api.giphy.com/v1/gifs/search?q=ryan+${userInput}&api_key=VHDVxuIJ16xoHvKzIwu8yiKsdlJVcihg
    // &limit=5`);

    var queryURL = "https://api.giphy.com/v1/gifs/search?q="+ userInput + "&api_key=VHDVxuIJ16xoHvKzIwu8yiKsdlJVcihg&limit=6";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var results = response.data;
        console.log(results);
        for (var i = 0; i < results.length; i++) {
            //div for holding gif
            var topicDiv = $("<div> ");

            //storing the rating data
            var rating = results.rating;

            //Creating an element to have the rating displayed
            var rDisplay = $("<p>").text("Rating: " + rating);

            //displaying the rating
            
            var topicImage = $("<img>");
            topicImage.attr("src", results[i].images.fixed_height.url);

            topicDiv.prepend(rDisplay)
            topicDiv.prepend(topicImage);

            $("#comic-view").prepend(topicDiv);
        }
    })

}

function renderButtons() {
    $("#buttons-view").empty();
    // Looping through the array of movies
    console.log(topics)
    for (var i = 0; i < topics.length; i++) {
        var a = $("<button>");

        a.addClass("topic-btn");
        a.attr("data-name", topics[i]);
        a.text(topics[i]);
       
    }
    $("#buttons-view").append(a);
}
// This function handles events where a movie button is clicked
$("#add-hero").on("click", function (event) {
    event.preventDefault();
    var userChoice = $("#user-input").val()
    console.log(userChoice)
    topics.push(userChoice);
    renderButtons();
});
