$(document).ready(function($) {
	$.ajax({
		url: 'http://pokeapi.co/api/v2/pokemon',
		type: 'GET',
		datatype: 'JSON',
		data: {"limit":'811'},
	})
	.done(function(data){
		console.log(data);
		console.log(data.results[1].name);
	})
	.fail(function(){
		console.log("Error");
	})
	.always(function(){
		console.log("Complete");
	});
});
//Probando info encontrada en: http://pokeapi-how.appspot.com/page5
function pokeSubmit(){
    var param = document.getElementById("pokeInput").value;
    console.log(param);
    var pokeURL = "http://pokeapi.co/api/v2/pokemon/" + param;
    console.log(pokeURL);

    // new URL for 3rd GET request
    var pokeURL2 = "http://pokeapi.co/api/v2/pokemon/" + param;
    console.log(pokeURL2);

    $.getJSON(pokeURL2, function(data){
        console.log(data);
        var pokeID = data.id; 
        console.log (pokeID); 
        var pokeName = data.name;
        console.log (pokeName); //Hasta aquí va bien, me muestra el ID y nombre en la consola
        var pokeSprite = data.sprites.front_default;
        console.log (pokeSprite);
        var t = "<div class='elemento'><img src='" + pokeSprite + "'/><h2>"+pokeName+"</h2>"
		document.getElementById("elementos").innerHTML = t;

        var pokeType1 = data.types[0].name;
        if (data.types.length == 2) {
            var pokeType2 = data.types[1].name;
        }
        else var pokeType2 = null;
        var descriptionURI = "http://pokeapi.co" + data.descriptions[0].resource_uri;
        var pokeDescription = "";

        $.getJSON(descriptionURI, function(data2){
            //console.log(data2);
            pokeDescription = data2.description;
        });

        // 3rd GET request to get an image
        $.getJSON(pokeURL2, function(data3){
            console.log(data3);
            console.log(JSON.stringify(data, null, "  "));
            /*
            console.log("Number: ", pokeID);
            console.log("Name: ", pokeName);
            console.log("Type 1: ", pokeType1);
            console.log("Type 2: ", pokeType2);
            console.log("Description URI: ", descriptionURI);
            console.log("Description: ", pokeDescription);
            */
        });

    });	// 2nd and 3rd GET requests are nested in success function of 1st GET request
}