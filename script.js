// Global Variables
var APIKey = "&appid=bf147805ce099b6abef7e0842a7ed43a";
var date = moment().format("MMMM Do YY");
var testCity = "Denver"
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + testCity + APIKey; 
    console.log(queryURL)

    $("#search").on("click", function(){
        var value = $("#inputbox").val()
        $("#inputbox").val("")
        currentDay(value);

    })
    

// ----------Section to test weather ---------
// function showWeather(e) {
//     $.ajax({
//         url: queryURL,
//         method: "GET"
//     }).then (function(response) {
//         console.log(response);
//         console.log(response.data);
//         console.log(response.main.temp);
//         console.log(response.main.humidity);
//         console.log(response.wind.speed);
//         console.log(response.coord.lon);
//         console.log(response.coord.lat);  
//     });
// };
// showWeather();

 // -------Section to Find UV Index------------
// lon = response.coord.lon
// lat = response.coord.lat

// $.ajax({
//     url: "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey
//     method: "GET",
//     }).then (function(response) {
//     console.log(response);




// ---------------------------CREATE FUNCTION FOR CURRENT DAY-------------
function currentDay(value) {
    $.ajax({
        type: "GET",
        url: 
        "https://api.openweathermap.org/data/2.5/weather?q=" + value + APIKey + "&units=imperial"
        }).then(function(response) {
            console.log(response)
            $("#today").empty();
            var wind = $("<p>")
                // try creating cards in jquery 
                .text("Wind Speed: " + response.wind.speed + "mph");
            var humidity = $("<p>")
                .text("Humidity: " + response.main.humidity + "%");
                $("#today").append(wind, humidity);
                // at the end of this.then call UV function and pass through response.coord.lat / lon

        })
    }
