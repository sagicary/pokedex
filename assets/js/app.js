$(document).ready(function($) {
	$.ajax({
		url: 'http://pokeapi.co/api/v2/pokemon',
		type: 'GET',
		datatype: 'JSON',
		data: {"limit":'811'},
	})
	.done(function(data){
		console.log("Datos si está ok"+ data);
		console.log (data);
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
    var pokeURL = "http://pokeapi.co/api/v1/pokemon/" + param;
    console.log(pokeURL);
    // new URL for 3rd GET request
    var pokeURL2 = "http://pokeapi.co/api/v2/pokemon/" + param;
    console.log(pokeURL2);

    var pokeURL3 ="http://pokeapi.co/api/v2/pokemon-species/" + param;

    $.getJSON(pokeURL2, function(data){ //pido del 2 porque tiene las imagenes
        console.log(data);
        var pokeID = data.id; 
        console.log (pokeID); 
        var pokeName = data.name;
        console.log (pokeName); //Hasta aquí va bien, me muestra el ID y nombre en la consola
        var pokeSprite = data.sprites.front_default;
        console.log (pokeSprite); //Me muestra link imagen ok
        var pokeheight = data.height;
        console.log("altura "+pokeheight);
        var pokeweight = data.weight;
        console.log ("peso "+pokeweight);
        var poketypes = data.types;
        poketypes.forEach(function(e){
        	console.log (e.type.name); //Me muestra los tipos que tiene ok
        });
        var t = "<div class='elemento'><img src='" + pokeSprite + "'/><h2>"+pokeName+"</h2>"
		document.getElementById("elementos").innerHTML = t; //Muestro datos en html

	    $.getJSON(pokeURL3, function(data4){
	           console.log(data4.flavor_text_entries[3].flavor_text); //Muestra descripción en español
	           console.log(data4.genera[2].genus);
		}) //Cierra pokeURL3
    }) // Cierra pokeURL2
};	// Cierra funcion pokeSubmit