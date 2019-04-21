var searchterms = ["Tobias Funke", "George W. Bush"];


function renderButtons() {
    $("#buttons-view").empty();

    for (var i = 0; i < searchterms.length; i++) {
        var a = $("<button>");
        a.addClass("search-btn");
        a.attr("data-name", searchterms[i]);
        a.text(searchterms[i]);
        $("#buttons-view").append(a);
    }
}

$("#add").on("click", function (event) {
    event.preventDefault();
    var searchterm = $("#input").val().trim();
    searchterms.push(searchterm);
    renderButtons();
});

renderButtons();



$("#buttons").on("click", ".search-btn", function () {
    var giphyRequest = $(this).attr("data-name");
    console.log(giphyRequest);

    var apikey = "9L1aOPHSKHS3NmjPLZQdDAoFODWDzv0P";
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apikey + "&q=" + giphyRequest + "&limit=10&offset=0&rating=G&lang=en";

    $.ajax({    
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            console.log(response.data);

            for (i = 0; i < response.data.length; i++) {
                var giphyDiv = $("<div class='giphyDiv'>");

                var rating = response.data[i].rating;
                var pOne = $("<p>").text("Rating: " + rating);
                giphyDiv.append(pOne);

                // var imgURLstill = response.data[i].images.fixed_height_small_still.url;
                // // imgURLstill.attr("data-state", "still");
                // // imgURLstill.addClass("gif");

              

                var giphyimage = $("<img>");
                giphyimage.attr("src", response.data[i].images.fixed_height_small_still.url);

                giphyimage.attr("data-still", response.data[i].images.fixed_height_small_still.url);

                giphyimage.attr("data-animate", response.data[i].images.fixed_height_small.url);

                giphyimage.attr("data-state", "still");

                giphyimage.attr("alt", "search item")
                giphyimage.addClass(".gif");
                giphyDiv.append(giphyimage);


                $("#search-view").prepend(giphyDiv);

                giphyimage.on("click", function() {
                    var state = $(this).attr("data-state");
                    if (state === "still") {
                      $(this).attr("src", $(this).attr("data-animate"));
                      $(this).attr("data-state", "animate");
                    } else {
                      $(this).attr("src", $(this).attr("data-still"));
                      $(this).attr("data-state", "still");
                    }
                  });
            };
        });

})
