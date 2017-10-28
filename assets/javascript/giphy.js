$(document).ready(function () {
    console.log("Ready!");

    //Initial array of topics
    var characters = ["Michael Bluth", "Lucille Bluth", "GOB Bluth", "Tobias Funke", "George Michael Bluth", "Buster Bluth"];

    //Function for display topic buttons
    function renderButtons() {

        //Here we are emptying out the container prior to adding new topic buttons
        $("#buttons-div").empty();

        //Looping through the array of topics
        for (var i = 0; i < characters.length; i++) {
            //Now we dynamically generate buttons for each topic in the array
            var characterButton = $("<button>");
            // Adding a class of movie to our button
            characterButton.addClass("button");
            // Adding a data-attribute
            characterButton.attr("data-name", characters[i]);
            // Providing the initial button text
            characterButton.text(characters[i]);
            // Adding the button to the buttons-view div
            $("#buttons-div").append(characterButton);
        }
    }
    // This function handles events where a topic button is clicked
    $("#add-topic").on("click", function (event) {
        event.preventDefault();

        // This line grabs the input from the textbox
        var characterText = $("#topic-input").val().trim();

       // This does not allow input with just spaces to be added as a button
        if (characterText == "") {
            return false;
        }

        // Adding movie from the textbox to our array
        characters.push(characterText);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
    });

    //Calling this function to display the initial buttons
    renderButtons();


    $("#buttons-div").on("click", ".button", function () {

        var character = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + character + "&api_key=dc6zaTOxFJmzC&limit=10";

        // Creating an AJAX call for the specific topic button being clicked
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function (response) {
            console.log(response);

            $("#gif-div").empty();

            var results = response.data
            console.log(response.data);

            for (var i = 0; i < results.length; i++) {

                // Creating a div to hold the topic
                var characterDiv = $("<div class='characters-container'>");

                // Creating an element to have the rating displayed
                var ratingText = $("<p>").text("Rating: " + results[i].rating);

                // Displaying the rating
                characterDiv.append(ratingText);
                
                //Make an image tag to store gifs
                var gifImg = $("<img>");
                gifImg.attr("src", results[i].images.fixed_height_still.url);
                gifImg.attr("data-animate", results[i].images.fixed_height.url);
                gifImg.attr("still", results[i].images.fixed_height_still.url);
                gifImg.attr("data-state", "still");
                gifImg.addClass("gif");

                // Appending the image
                characterDiv.append(gifImg);

                // Putting the entire movie above the previous movies
                $("#gif-div").prepend(characterDiv);
            }
        });

        $("#gif-div").on("click", ".gif", function () {
            var state = $(this).attr("data-state");
            
            if (state === "still") {
                $(this).attr("src", $(this).data("animate"));
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr("src", $(this).attr("still"));
                $(this).attr("data-state", "still");
            }
        });
    });
});