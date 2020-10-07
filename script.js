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
        forecast(forecastval);

    })
// ---------------------------CREATE FUNCTION FOR CURRENT DAY-------------
function currentDay(value) {
    $.ajax({
        type: "GET",
        url: 
        "https://api.openweathermap.org/data/2.5/weather?q=" + value + APIKey + "&units=imperial"
        }).then(function(response) {
            console.log(response)
            $("#today").empty();
            var title = $("<h2>")
                .addClass("card-title")
                .text("Today's Weather for:  " + response.name);
            var temp = $("<p>") 
                .addClass("card-text")
                .text("Temperature: " + response.main.temp + "°F");
            var wind = $("<p>")
                // try creating cards in jquery 
                .text("Wind Speed: " + response.wind.speed + "mph");
            var humidity = $("<p>")
                .text("Humidity: " + response.main.humidity + "%");
            // var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
                $("#today").append(title, temp, wind, humidity);
            
                // at the end of this.then call UV function and pass through response.coord.lat / lon

        })
    }

    // ---------------------------CREATE FUNCTION FOR FORECAST-------------
function forecast(data) {
    $.ajax({
        type: "GET",
        url: 
        "https://api.openweathermap.org/data/2.5/forecast?q=" + value + APIKey + "&units=imperial"
        dataType: "json"
        }).then(function(forecastval) {
            console.log(forecastval)
            $("#forecast").html("");

        })
    }
