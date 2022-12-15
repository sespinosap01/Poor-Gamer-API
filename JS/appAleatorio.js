const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '05cfdb6fc8msh950b8bea289337fp1152eejsn2c6c0d36261f',
		'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
	}
};

let urlApi="https://free-to-play-games-database.p.rapidapi.com/api/games"
fetch(urlApi, options)
	.then(response => response.json())
	.then(datos => mostrarDatos(datos))
    const mostrarDatos = (datos) =>{

            let numRandom = Math.floor(Math.random()* (datos.length - 5) + 2);
            let numRandom2 = numRandom + 1;
        
            let generado=""
            for (let i=numRandom; i<numRandom2; i++){
                generado+=`
                <div class="carta">
                    <img src="${datos[i].thumbnail}" alt="FotoJuego">
                    <div class="contenidoDatos">
                        <h1 class="nombreJuego">${datos[i].title}</h1>
                        <h4 class="nombreDesarrolladora">${datos[i].developer}</h4>
                        <p class="centrarBoton"><button class="botonJugar"><a href="${datos[i].game_url}" target="_blank" >Jugar</a></button></p>
                    </div>
                </div>  
                `
            }
            document.getElementById("contenedorResultados").innerHTML = generado   
    }

