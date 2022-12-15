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

	for (let i=0 ; i<datos.length; i++){
		generado+=`
		<div class="carta" id="carta">
			<img src="${datos[i].thumbnail}" alt="FotoJuego" class="fotoJuego">
			<div class="contenidoDatos">
				<p><i>-Nombre: </i>${datos[i].title}</p>
				<p><i>-Desarrolladora: </i> ${datos[i].developer}</p>
				<p><i>-Fecha de salida: </i>${datos[i].release_date}</p>
				<p><i>-Género: </i>${datos[i].genre}</p>
					<p class="alinearBotonYFav"><button class="botonJugar"><a href="${datos[i].game_url}" target="_blank" >Jugar</a></button>
					<img src="../IMG/noFav.png" alt="FotoFavorito" class="imgNoFav" id="fav" onclick="guardarFav(${datos[i].id})">
					</p>			
			</div>
		</div>  
		`
	}
	document.getElementById("contenedorResultados").innerHTML = generado
}


//select autorrellenado
const direccionEnlace = "https://free-to-play-games-database.p.rapidapi.com/api/games";
const selectCategorias = document.getElementById("selectCategorias");

async function rellenarSelect(){
	fetch(direccionEnlace , options)
    .then(response => { return response.json(); })
    .then(data => {
        for (let i = 0; i < 10; i++) {
            opcionSelect = document.createElement("option");
            opcionSelect.textContent = data[i].title;
			opcionSelect.setAttribute("value", data[i].id)
            selectCategorias.appendChild(opcionSelect)
        }
    });
}rellenarSelect()			

function pintarCartaFiltro(){
	let idJuego = selectCategorias.value
	let urlFiltro="https://free-to-play-games-database.p.rapidapi.com/api/game?id="+idJuego

	fetch(urlFiltro , options)
    .then(response => { return response.json(); })
	.then(datos => filtrarDatos(datos))
	const filtrarDatos = (datos) =>{
		
		let generado=""
			generado+=`
			<div class="carta" id="carta">
				<img src="${datos.thumbnail}" alt="FotoJuego" class="fotoJuego">
				<div class="contenidoDatos">
					<p><i>-Nombre: </i>${datos.title}</p>
					<p><i>-Desarrolladora: </i> ${datos.developer}</p>
					<p><i>-Fecha de salida: </i>${datos.release_date}</p>
					<p><i>-Género: </i>${datos.genre}</p>
						<p class="alinearBotonYFav"><button class="botonJugar"><a href="${datos.game_url}" target="_blank" >Jugar</a></button>
						<img src="../IMG/noFav.png" alt="FotoFavorito" class="imgNoFav">
						</p>			
				</div>
			</div>  
			`
		document.getElementById("contenedorResultados").innerHTML = generado
	}
}



//Buscador instantaneo por contenido en la carta, tanto por juego, genero o desarrolladora
document.addEventListener("keyup", e=>{
	if(e.target.matches("#busqueda")){
		document.querySelectorAll("#carta").forEach(juegos=>{
			juegos.textContent.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
			?juegos.classList.remove("filtro")
			:juegos.classList.add("filtro")
		})
	}
})

