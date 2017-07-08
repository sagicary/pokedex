$(document).ready(function() {
	$.ajax({
		url: 'http://pokeapi.co/api/v2/pokemon',
		type: 'GET',
		datatype: 'JSON',
		data: {"limit":'10'},

	})

	.done(function(data){
		//console.log("Datos si está ok"+ data);
		//console.log (data.results);
		//Funciona lento pero muestra todo
		
		//LO DEJÉ COMENTADO PORQUE CARGA LENTO
		var resultados = data.results;
		resultados.forEach(function(e){
			//console.log (e.name);
			//console.log (e.url);
			$.getJSON(e.url, function(data){
				var pokeSprite = data.sprites.front_default;
        		//console.log (pokeSprite); //Me muestra link imagen ok
        		$("#elementos").append(armarTemplate(e.name , pokeSprite));
			});

		})
	})
	.fail(function(){
		console.log("Error");
	})
	.always(function(data){
		console.log("Complete");
	})
});

var armarTemplate = function(nombre,url){
		var t = "<div class='elemento col-lg-2 text-center'><img src='" + url + "'/><h6>"+ nombre +"</h6></div>";
		return t;
	}
	// Se demora en buscar pero muestra
	$("#buscar-pokemon").click(function(event){
		console.log("Entro");
		$("#elementos").empty();
		var buscar = $("#pokeInput").val();
		var url = "http://pokeapi.co/api/v2/pokemon/" + buscar;
		var url2 = "http://pokeapi.co/api/v2/pokemon-species/" + buscar;
		console.log (buscar);
		console.log (url);
			$.getJSON(url, function(data){
			var pokeName = data.name;
			//$("#myModalLabel").val(pokeName); //No me funciona :(
			document.getElementById('myModalLabel').innerHTML = pokeName;
			document.getElementById('modal-body').innerHTML = "<img src='" + pokeSprite + "'/>";

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
        	$.getJSON(url2, function(data2){
	           console.log(data2.flavor_text_entries[3].flavor_text); //Muestra descripción en español
	           console.log(data2.genera[2].genus); //Muestra categoria
			}) //Cierra URL2



			var t = "<div class='elemento'><h2>"+pokeName+"</h2>"
			document.getElementById("elementos").innerHTML = t; //Muestro datos en html
			});
		});

/*
//Probando info encontrada en: http://pokeapi-how.appspot.com/page5
function pokeSubmit(){
    var param = document.getElementById("pokeInput").value;
    console.log(param);
    var pokeURL = "http://pokeapi.co/api/v1/pokemon/" + param;
    console.log(pokeURL);
    var pokeURL2 = "http://pokeapi.co/api/v2/pokemon/" + param; //CONTIENE IMAGENES
    console.log(pokeURL2);
    var pokeURL3 ="http://pokeapi.co/api/v2/pokemon-species/" + param; //CONTIENE DETALLES

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

	    $.getJSON(pokeURL3, function(data2){
	           console.log(data2.flavor_text_entries[3].flavor_text); //Muestra descripción en español
	           console.log(data2.genera[2].genus); //Muestra categoria
		}) //Cierra pokeURL3
    }) // Cierra pokeURL2
};	// Cierra funcion pokeSubmit
*/