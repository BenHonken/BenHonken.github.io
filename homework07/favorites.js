var layers = ["shell", "base_layer", "seasoning", "mixin", "condiment"];
var layersUpper = ["Shell", "Base", "Seasoning", "Mixin", "Condiment"];
var favorites = JSON.parse(localStorage.getItem("favorites"));
if(favorites == undefined){
    favorites = ["You have not yet selected any favorites!"];
}
var favoriteRecipes = JSON.parse(localStorage.getItem("favoriteRecipes"));
tacoDisplay();
function tacoDisplay(){
    $(".store-favs").empty();
    if(favorites.length == 1){
        $(".store-favs").text(favorites[0]);
    }
    else{
        for(var i = 0; i < layers.length; i++){
            $(".store-favs").append($("<div class='box' id='" + layers[i] + "Div'>"));
            $("#" + layers[i] + "Div").text(layersUpper[i]+ "s:  ");
            for(var j = 0; j < favorites[i].length; j++){
                var recipe = $("<div class='recipe' id='" + layers[i] + "Num" + j + "'>")
                $("#" + layers[i] + "Div").append(recipe);
                $("#" + layers[i] + "Num" + j).text(favoriteRecipes[i][j]);
                $("#" + layers[i] + "Num" + j).append($("<button class='remove Btn delay animated pulse' id='" + layers[i] + j + "'>"));
                $("#" + layers[i] + j).text("Remove From Favorites");
            }
        }
    }
    onClickEvents();
}
function onClickEvents(){
    $(".remove").on("click", function(){
        var parent = $(this).parent();
        for (var i = 0; i < favoriteRecipes.length; i++){
            for (var j = 0; j < favoriteRecipes[i].length; j++){
                if(parent.text().includes(favoriteRecipes[i][j])){
                    favorites[i].splice(j, 1);
                    localStorage.setItem("favorites", JSON.stringify(favorites));
                    favoriteRecipes[i].splice(j, 1);
                    localStorage.setItem("favoriteRecipes", JSON.stringify(favoriteRecipes));
                }
            }
        }
        tacoDisplay();
    })
}