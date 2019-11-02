var queryURL = "http://taco-randomizer.herokuapp.com/random/";
var layers = ["shell", "base_layer", "seasoning", "mixin", "condiment"];
var layersUpper = ["Shell", "Base", "Seasoning", "Mixin", "Condiment"];
var descriptionFragments = ["Wrapped in delicious ", ", you'll be enjoying ", " with ", " garnished with ", ", and topped off with "];
var descriptionFiller = [];
var favorites = JSON.parse(localStorage.getItem("favorites"));
if(favorites == undefined){
    favorites = [[], [], [], [], []];
}
var favoriteRecipes = JSON.parse(localStorage.getItem("favoriteRecipes"));
if(favoriteRecipes == undefined){
    favoriteRecipes = [[], [], [], [], []];
}
var firstTaco = true;
$("#newTaco").val(6);
$("#newTaco").addClass("new");
onClickEvents();
function tacoDisplay(){
    $("#tacoBox").append($("<div id='description'>"));
    for(var i = 0; i < layers.length; i++){
        $("#tacoBox").append($("<div class='box' id='" + layers[i] + "Div'>"));
        $("#" + layers[i] + "Div").append($("<div class='recipe' id='" + layers[i] + "Recipe'>"));
        $("#" + layers[i] + "Div").append($("<button class='tacoBtn new delay animated pulse' id='new" + layersUpper[i] + "' value=" + i + ">"));
        $("#new" + layersUpper[i]).text("New " + layersUpper[i]);
        $("#" + layers[i] + "Div").append($("<button class='tacoBtn favorites animated delay pulse' id='fav" + layersUpper[i] + "' value=" + i + ">"));
        $("#fav" + layersUpper[i]).text("Add to Favorites");
    }
    onClickEvents()
}
function onClickEvents(){
    $(".favorites").on("click", function(){
        var i = $(this).val();
        if(favorites[i].includes($("#" + layers[i] + "Name").text()) == false){
            favorites[i].push($("#" + layers[i] + "Name").text());
            localStorage.setItem("favorites", JSON.stringify(favorites));
            favoriteRecipes[i].push($("#" + layers[i] + "Recipe").text());
            localStorage.setItem("favoriteRecipes", JSON.stringify(favoriteRecipes));
        }
    })
    $(".new").on("click", function(){
        if(firstTaco==true){
            tacoDisplay();
            firstTaco=false;
       }
        if($(this).val()<6){
            var layer = layers[$(this).val()];
            var layerIndex =$(this).val()
            $.ajax({
                url: queryURL,
                type: "GET",
                    success: function(response){
                        descriptionFiller[layerIndex] = response[layer].name;
                        $("#" + layer + "Recipe").text(response[layer].recipe);
                        $("#description").empty();
                        for(var i = 0; i < layers.length; i++){
                            $("#description").text($("#description").text() + descriptionFragments[i]);
                            $("#description").text($("#description").text() + descriptionFiller[i]);
                        }
                        $("#description").text($("#description").text() + "!");
                    }
            })
        }
        else{
            descriptionFiller = []
            $.ajax({
                url: queryURL,
                type: "GET",
                    success: function(response){
                        $("#description").empty();
                        for(var i = 0; i < layers.length; i++){
                            $("#description").text($("#description").text() + descriptionFragments[i]);
                            $("#description").text($("#description").text() + response[layers[i]].name);
                            descriptionFiller.push(response[layers[i]].name);
                            $("#" + layers[i] + "Recipe").text(response[layers[i]].recipe);
                        }
                        $("#description").text($("#description").text() + "!");
                    }
            })
        }
    })
}
// To do:  Discuss the favorites tab and make it work
// To do:  Weird equals signs and HTML in the recipe