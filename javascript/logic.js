
var topics = ["Superman", "Spider-man"];
$(document).on("click", ".topic-btn", displayUserChoice);
renderButtons();
function displayUserChoice() {
    var userInput = $(this).attr("data-name");

    // $.get(`http://api.giphy.com/v1/gifs/search?q=ryan+${userInput}&api_key=VHDVxuIJ16xoHvKzIwu8yiKsdlJVcihg
    // &limit=5`);

    var queryURL = "https://api.giphy.com/v1/gifs/search?q="+ userInput + "&api_key=VHDVxuIJ16xoHvKzIwu8yiKsdlJVcihg&limit=10";

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
            var rating = results[i].rating;

            //Creating an element to have the rating displayed
            var rDisplay = $("<p>").text("Rating: " + rating);

            //displaying the rating
            
            var topicImage = $("<img>");
            topicImage.attr("src", results[i].images.fixed_height_still.url);
            topicImage.attr("class","gif")
            topicImage.attr("data-still", results[i].images.fixed_height_still.url);
            topicImage.attr("data-animate", results[i].images.fixed_height.url)
            topicImage.attr("data-state", "still");

            
            topicDiv.append(rDisplay,topicImage);

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
        $("#buttons-view").append(a);
    }
    
}
// This function handles events where a movie button is clicked
$("#add-hero").on("click", function (event) {
    event.preventDefault();
    var userChoice = $("#user-input").val().trim();
   
    console.log(userChoice)
    topics.push(userChoice);

    renderButtons();

   
});

$("#comic-view").on("click", ".gif",function(){
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
})
    

