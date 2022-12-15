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
	let generado=""

	const juegosJSON = localStorage.getItem('fav');
	let juegosSplited = juegosJSON.split("-")

	for (let i=0 ; i<juegosSplited.length; i++){
    if(juegosSplited[i]!=""){
		let urlJuego = "https://free-to-play-games-database.p.rapidapi.com/api/game?id="+juegosSplited[i]

    fetch(urlJuego, options)
    .then(response => response.json())
    .then(datos => {
      
      generado+=`
      <div class="carta" id="carta">
        <img src="${datos.thumbnail}" alt="FotoJuego" class="fotoJuego">
        <div class="contenidoDatos">
          <p><i>-Nombre: </i>${datos.title}</p>
          <p><i>-Desarrolladora: </i> ${datos.developer}</p>
          <p><i>-Fecha de salida: </i>${datos.release_date}</p>
          <p><i>-Género: </i>${datos.genre}</p>
            <p class="alinearBotonYFav"><button class="botonJugar"><a href="${datos.game_url}" target="_blank" >Jugar</a></button>
            <img src="../IMG/fav.png" alt="FotoFavorito" class="imgNoFav" id="fav" onclick="guardarFav(${datos.id})">
            </p>			
        </div>
      </div>  
      `    
    	document.getElementById("contenedorResultados").innerHTML = generado
})
}
	}
}

