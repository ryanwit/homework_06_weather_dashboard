// Global Variables
var APIKey = "&appid=bf147805ce099b6abef7e0842a7ed43a";
var userSearch = JSON.parse(localStorage.getItem("userSearch")) || [];
var citiesStorage = localStorage.getItem("citiesStorage")

$("#search").on("click", function () {
  var value = $("#inputbox").val();
  $("#inputbox").val("");
  currentDay(value);
  // createButton(value);
  // if(citiesStorage.indexOf(value)===-1) {
  //     citiesStorage.push(value)
  //     localStorage.setItem("citiesStorage", JSON.stringify(citiesStorage))
  //     createButton(value);
  // }
});
// ---------------------------CREATE FUNCTION FOR CURRENT DAY-------------
function currentDay(value) {
  $.ajax({
    type: "GET",
    url:
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      value +
      APIKey +
      "&units=imperial",
  }).then(function (response) {
    if(userSearch.indexOf(value)===-1) {
          userSearch.push(value)
          localStorage.setItem("userSearch", JSON.stringify(userSearch))
          createButton(value);
      }
    console.log(response);
    $("#today").empty();
    var title = $("<h2>")
      .addClass("card-title")
      .text("Today's Weather for:  " + response.name);
    var temp = $("<p>")
      .addClass("card-text")
      .text("Temperature: " + response.main.temp + "°F");
    var wind = $("<p>").text("Wind Speed: " + response.wind.speed + "mph");
    var humidity = $("<p>").text("Humidity: " + response.main.humidity + "%");
    var img = $("<img>").attr(
      "src",
      "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png"
    );
    $("#today").append(title, img, temp, wind, humidity);

    forecast(value);
    uvIndex(response.coord.lat, response.coord.lon);


  });
}

// ---------------------------CREATE FUNCTION FOR FORECAST-------------
function forecast(value) {
  $.ajax({
    type: "GET",
    url:
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      value +
      "&cnt=6" +
      APIKey +
      "&units=imperial",
  }).then(function (response) {
    console.log(response);
    $("#forecast")
      .html('<h4 class="mt-3">NEXT 5 DAY FORECAST:</h4>')
      .append('<div class= "row">');
    for (var i = 1; i < 6; i++) {
      if (response.list[i].main) {
        var col = $("<div>").addClass("col-md-2");
        var card = $("<div>").addClass("card bg-primary text-black");
        var body = $("<div>").addClass("col-bod");

        var temp = $("<p>")
          .addClass("card-text")
          .text("Temperature: " + response.list[i].main.temp + "°F");
        var humi = $("<p>")
          .addClass("card-text")
          .text("Humidity: " + response.list[i].main.humidity + "%");
        var imgf = $("<img>").attr(
          "src",
          "http://openweathermap.org/img/w/" +
            response.list[i].weather[0].icon +
            ".png"
        );
        col.append(card.append(body.append(temp, humi, imgf)));
        $("#forecast .row").append(col);
      }
    }
  });
}
// // ------------------CREAT FUNCTION FOR UV INDEX -----------------
// // coord.lon coord.lat - take these two things and pass it to another function
function uvIndex(lat, lon) {
  $.ajax({
    method: "GET",
    url:
      "http://api.openweathermap.org/data/2.5/uvi?" + APIKey + "&lat=" + lat + "&lon=" + lon,
    dataType: "json"
  }).then(function (response) {
    console.log(response);
    var uvi = $("<button>").text("UV INDEX: " + response.value);
    if (response.value < 3) {
      uvi.addClass("btn-success")
    } else if (response.value > 7) {
      uvi.addClass("btn-danger")
    } else {
      uvi.addClass("btn-warning")
    }
    
    $("#today").append(uvi);
  });
}

// create button function
function createButton(userSearch) {
  var li = $("<li>").text(userSearch)
  $(".history").append(li)
}

