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
	let numRandom = Math.floor(Math.random()* (datos.length - 20) + 5);
	let numRandom2 = numRandom+10;

	let generado=""
	for (let i=numRandom ; i<numRandom2; i++){
		generado+=`
		<div class="carta">
			<img src="${datos[i].thumbnail}" alt="FotoJuego" class="fotoJuego">
			<div class="contenidoDatos">
				<p><i>-Nombre: </i>${datos[i].title}</p>
				<p><i>-Desarrolladora: </i> ${datos[i].developer}</p>
				<p><i>-Fecha de salida: </i>${datos[i].release_date}</p>
				<p><i>-Género: </i>${datos[i].genre}</p>
					<p class="alinearBotonYFav"><button class="botonJugar"><a href="${datos[i].game_url}" target="_blank" >Jugar</a></button>
					</p>
			</div>
		</div>  
		`
	}
	document.getElementById("contenedorCartas").innerHTML = generado
}


//COMENTARIOS
const cajaComentarios = document.querySelector("#cajaComentarios");
const formulario = document.querySelector("#formulario");
const contenido = document.querySelector("#contenido");
const boton = document.querySelector("#botonAnadir");
const arrayContenido = JSON.parse(localStorage.getItem("contenido")) || [];

function actualizarComentarios() {
	contenido.innerHTML = "";
  	for (const key in arrayContenido) {
		const p = document.createElement("p");
		p.classList.add("parrafoComentario")
		const span = document.createElement("span");
		span.innerText = arrayContenido[key];
		const boton = document.createElement("button");
		boton.innerText = "Eliminar";
		boton.setAttribute("key", key);
		boton.classList.add("botonBorrar");
		p.appendChild(span);
		p.appendChild(boton);
		contenido.appendChild(p);
	}
  localStorage.setItem("contenido", JSON.stringify(arrayContenido));
}

function comentar(value) {
  if (value === "") 
  return;
  arrayContenido.push(value);
  actualizarComentarios();
  cajaComentarios.value = "";
  cajaComentarios.focus();
}

function borrarComentarios(key) {
	arrayContenido.splice(Number(key), 1);
  	actualizarComentarios();
 	cajaComentarios.value = "";
  	cajaComentarios.focus();
}

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  comentar(cajaComentarios.value);
});

document.addEventListener("click", (e) => {
  const borrar = e.target;
  if (borrar.classList.contains("botonBorrar")) {
    	borrarComentarios(borrar.getAttribute("key"));
  }
});
actualizarComentarios();