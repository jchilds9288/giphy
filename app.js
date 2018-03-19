// single page 
// containers to hold buttons, pictures, and form 
// buttons make request from gify api 
// 1. click the button to repesent the search term 
var animals = ["elk", "elephant", "dog", "skunk"]

function getGif() {
    var creature = $(this).attr("data-term");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=DacdxvZ6LFU4Tm3lYnSkhnkGrf9egzqZ&q=" + creature + "&limit=10&offset=0&rating=PG-13&lang=en";
    console.log(creature)
    console.log(queryURL)
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        $(".images").empty()

        var animalDiv = $("<span class = imagesAnimal>")
        for (var j = 0; j < response.data.length; j++) {
            assignImage(response.data[j], animalDiv)
        }

        $(".gifAnimal").on("click",
            animate)
    });
}



function animate() {

    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate")
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still")
    }

}

function assignImage(imgData, animalDiv) {
    var rating = imgData.rating;
    var pOne = $("<p>").text("Rating: " + rating)
    $(animalDiv).append(pOne)

    var gif = imgData.images.fixed_height_still.url;
    var gifAnimate = imgData.images.fixed_height.url;
    var pTwo = $("<img>");
    pTwo.addClass("gifAnimal")
    pTwo.attr("src", gif)
    pTwo.attr("data-still", gif)
    pTwo.attr("data-animate", gifAnimate)
    pTwo.attr("data-state", "still")
    $(animalDiv).append(pTwo)

    $(".images").append(animalDiv)
}


function addButton() {

    $(".buttons").empty();

    for (var i = 0; i < animals.length; i++) {

        var b = $("<button>");

        b.addClass("btn searchButton animal");

        b.attr("data-term", animals[i]);

        b.text(animals[i]);

        $(".buttons").append(b)
    }
}

$(".addAnimal").on("click", function (event) {



    event.preventDefault();

    var animalInput = $(".newAnimal").val().trim();

    animals.push(animalInput)

    console.log(animals)

    addButton()

    $(".newAnimal").val("")



});

$(document).on("click", ".animal", getGif);

$(".images").empty()

addButton();




