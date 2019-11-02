var proxy = "http://www.chriscastle.com/proxy/thecocktaildb.php?:proxy:";
var ingredient = JSON.parse(localStorage.getItem("alcohol"));
var drinkSearch = $("#tequilaBox");
var drinkArray = [];
var buttonArray = [];
var queryURL1 = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + ingredient;
function searchDiv() {
    var search = $("<div>")
    search.attr("id", "searchDiv");
    var textarea = $("<textarea>");
    textarea.attr("name", "textarea");
    textarea.attr("id", "textarea");
    textarea.attr("cols", "54");
    textarea.attr("rows", "2");
    search.append(textarea);
    var button1 = $("<button id='searchDrink'>");
    button1.html("Search");
    search.append(button1);
    $(drinkSearch).html(search);
};
searchDiv();

$(document).on("click", "#searchDrink", function () {
    event.preventDefault();
    var drink1 = $("#textarea").val().trim() || "";
    if (drinkArray.indexOf(drink1) === -1) {
        drinkArray.push(drink1);
        localStorage.setItem("alcohol", JSON.stringify(drink1));
    }
    $("#searchDiv").html("");
    $.ajax({
        url: queryURL1,
        method: "GET"
    }).then(function (response){
        for(i = 0; i < 5; i++){
            var randomNumber1 = Math.floor((Math.random() * 17) + 0);
            drinkName = response.drinks[randomNumber1].strDrink;
            buttonArray.push(drinkName);
            console.log(buttonArray);
            var button2 = $("<button id='searchDrink'>");
            button2.html(buttonArray[i]);
            drinkSearch.append(button2);
        }
    });
});

