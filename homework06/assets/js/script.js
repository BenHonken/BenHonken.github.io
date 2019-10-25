//Load local storage
var latitude = "";
var longitude = "";
var degreesF = "°F";
var cityList = JSON.parse(localStorage.getItem("cityList"));
var apiKey = "&appid=cefadb46ad56f0e933771dbad37981d7"
var now=moment().format("L");
if(cityList == null){
    cityList = [];
}
var lastCity = localStorage.getItem("lastCity");
if(lastCity == null){
    lastCity = "";
}
else{
    getConditions();
    getForecast();
}
listCities();
// if(lastCity == ""){
//     //geo location call
//     getConditionsByGeo();
//     getForecastByGeo();
//     getUVIndex();
// }
//Create functions for populating city list, conditions, temp, humidity, windspeed, uv index, and 5 day forecast
function listCities(){
    $(".cityList").empty();
    for(var i = 0; i < cityList.length; i++){
        var city = $("<div>");
        city.attr("class", "cityButton");
        city.text(cityList[i]);
        city.attr("value", cityList[i]);
        $(".cityList").append(city);
    }
    //on click for cities
    $(".cityButton").on("click", function(){
        lastCity = $(this).text();
        getConditions();
        getForecast();
        getUVIndex();
        if(cityList.includes(lastCity)==false){
            cityList.unshift(lastCity);
        }
        else{
            var newCityList = [];
            newCityList.push(lastCity);
            for(var i = 0; i < cityList.length; i++){
                if(cityList[i] != lastCity){
                    newCityList.push(cityList[i]);
                }
            }
            cityList = newCityList
        }
        listCities();
        localStorage.setItem("lastCity", lastCity);
        localStorage.setItem("cityList", JSON.stringify(cityList));
    })
}
function getConditions(){
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + lastCity + "&units=imperial" + apiKey;
    $.ajax({
        url: queryURL,
        type: "GET",
            success: function(response){
                var iconCode = response.weather[0].icon;
                var iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
                $(".city").text(response.name + " " + moment().format("L"));
                $(".city").append($("<img src=" + iconURL + ">"))
                $(".temp").text("Temperature: " + response.main.temp + " " + degreesF);
                $(".humidity").text("Humidty: " + response.main.humidity + "%");
                $(".wind").text("Wind Speed: " + response.wind.speed + " Miles per Hour");
                latitude=response.coord.lat;
                longitude=response.coord.lon;
                getUVIndex();
            }
        })
}
function getForecast(){
    $(".forecast").empty();
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + lastCity + "&units=imperial&" + apiKey;
    $.ajax({
    url: queryURL,
    type: "GET",
        success: function(response){
            for(var i = 0; i < 5; i++){
                var forecastDay=$("<div class=forecastDay>");
                var dateBox=$("<div class=forecastContents>");
                var day = moment(now).add(i+1, 'days').format("L");
                dateBox.text(day);
                forecastDay.append(dateBox);
                var iconCode = response.list[i*8].weather[0].icon;
                var iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
                var iconBox = $("<img src=" + iconURL + ">");
                forecastDay.append(iconBox);
                var forecastTemp = $("<div class=forecastContents>");
                forecastTemp.text("Temp: " + response.list[i*8].main.temp + " " + degreesF);
                forecastDay.append(forecastTemp);
                forecastHumidity = $("<div class=forecastContents>");
                forecastHumidity.text("Humidity: " + response.list[i*8].main.humidity + "%");
                forecastDay.append(forecastHumidity);
                $(".forecast").append(forecastDay);
            }

        }
    })
}
function getUVIndex(){
    var queryURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + latitude + "&lon=" + longitude + apiKey;
    $.ajax({
        url: queryURL,
        type: "GET",
        success: function(response){
            $(".uv").text("UV Index: " + response.value);
        }
    })
}
function getLocation(){

}
//on click for search button
$(".searchButton").on("click", function(){
    lastCity = $("#searchInput").val();
    getConditions();
    getForecast();
    getUVIndex();
    if(cityList.includes(lastCity)==false){
        cityList.unshift(lastCity);
    }
    else{
        var newCityList = [];
        newCityList.push(lastCity);
        for(var i = 0; i < cityList.length; i++){
            if(cityList[i] != lastCity){
                newCityList.push(cityList[i]);
            }
        }
        cityList = newCityList
    }
    listCities();
    localStorage.setItem("lastCity", lastCity);
    localStorage.setItem("cityList", JSON.stringify(cityList));
})
//geolocation API:  https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API