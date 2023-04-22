// Variables
const formulario = document.querySelector("#formulario")
const listaIdeas = document.querySelector("#lista-ideas")
const fraseDOM = document.querySelector("#frase")
const frases = ["Sueña como si fueras a vivir para siempre, vive como si fueses a morir hoy, James Dean",
"Sé amable, porque toda persona que conoces está librando una gran batalla, Platón", 
"Sé tú mismo. Todos los demás ya están ocupados, Oscar Wilde",
"La felicidad no está en lo que tú tienes sino en tu actitud",
"Si te caíste ayer, levántate hoy, H.G. Wells", 
"Eres tan increíble como te dejas serlo",
"Das lo que eres, no lo que recibes",
"La suerte para triunfar en la vida se llama: “creer en ti” ",
"Lo único imposible es aquello que no intentas",
"Caerse está permitido, levantarse es obligatorio",
"Hecho es mejor que perfecto, Sheryl Sandberg",
"Para tener éxito la actitud es tan importante como la habilidad, Walter Scott",
"El secreto para salir adelante es comenzar, Mark Twain",
"Cuanto más duramente trabajo, más suerte tengo, Gary Player",
"No has llegado tan lejos solo para llegar hasta aquí",
"Si tú sabes lo que vales, ve y consigue lo que mereces, Rocky Balboa",
"Da siempre lo mejor que tienes. Lo que plantes ahora lo cosecharás más tarde, Og Mandino",
"Si crees que puedes, ya estás a medio camino, Theodore Roosevelt ",
"Avanza con confianza en la dirección de tus sueños, Thoreau",
"No sueñes tu vida, vive tu sueño",
"Debes hacer las cosas que crees que no puedes hacer",
"Lo mejor está por venir",
"Sin lluvia no habría arcoiris",
"Los obstáculos son esas cosas atemorizantes que ves cuando apartas los ojos de tu meta, Henry Ford",
"El conocimiento es poder, Francis Bacon",
"Dale a cada día la posibilidad de ser el mejor día de tu vida",
"Va a pasar, porque tú vas a hacer que pase",
"Da el primer paso con fe. No tienes que ver todas las escaleras, solo da el primer paso, Martin Luther King",
"No importa lo lento que vayas, siempre y cuando no te detengas",
"Si te caes tres veces, levántate cuatro",
"Sí puedes!, Siempre puedes!",
"La única diferencia entre un buen y un mal día es tu actitud",
"No cuentes los días, haz que los días cuenten, Muhammad Ali",
"El mejor momento del día es ahora, Pierre Bonnard",
"Sé el cambio que quieres ver en el mundo, Mahatma Gandhi",
"El sentido de la vida es tener valores, no cosas de valor",
"Cree que puedes y casi lo habrás logrado, Theodore Roosevelt",
"La mejor forma de predecir el futuro es creándolo, Peter Druker"
]
let ideas = []
// Even Listeners
eventListeners()
function eventListeners(){
  // Cuando el usuario agrega una nueva idea 
  formulario.addEventListener('submit',agregarIdea)

  // Cuando el documento esta listo 
  document.addEventListener('DOMContentLoaded', ()=>{
    ideas = JSON.parse(localStorage.getItem('ideas')) || []
    const indice = Math.floor(Math.random() * frases.length);
    const fraseAleatoria = frases[indice];
    fraseDOM.innerHTML = fraseAleatoria;
    console.log(ideas);
    crearHTML()
  } )

}


// Funciones
function agregarIdea(e){
  e.preventDefault()
  // textArea donde el usuario escribe
  const idea = document.querySelector("#idea").value
  if(idea===''){
    // console.log("no se admiten ideas vacias, saltate esta");
    mostrarError("Una idea no puede ir vacia")
    return //Evita que se ejecuten mas lineas de codigo en la funcion
  }
  const ideaObje = {
    id: Date.now(),
    idea,
  }
  // Añadir al arreglo de ideas
  ideas = [...ideas, ideaObje]
  console.log(ideas);
  // Creando el HTML
  crearHTML()
  // Reiniciar formulario
  formulario.reset()
}

// Muestra el listado de tareas 
function crearHTML(){
  
  limpiarHTML()
  if(ideas.length > 0) {
    ideas.forEach( ideaIt => {
      // Boton de eliminar
      const btnDelete = document.createElement('a')
      btnDelete.classList.add('borrar-tweet')
      btnDelete.innerText = 'X'
      //Añadir funcion eliminar , uso esta sintaxis para poder pasar un parametro
      btnDelete.onclick = ()=>{
        borrarIdea(ideaIt.id)
      } 

      // Creando HTML
      const li = document.createElement("li")
      // Añadir texto
      li.innerText = ideaIt.idea
      // Asignando el boton 
      li.appendChild(btnDelete)

      listaIdeas.appendChild(li)
    });
  }

  sincronizarStorage()

}
// Agregar al Storage 
function sincronizarStorage(){
  localStorage.setItem('ideas', JSON.stringify(ideas))
}

function limpiarHTML(){
  while(listaIdeas.firstChild){
    listaIdeas.removeChild(listaIdeas.firstChild)
  }
}
// Eliminar Idea 
function borrarIdea (id){
 console.log("Borrando id:", id); 
 const ideasFiltradas = ideas.filter((ideaIterada)=> ideaIterada.id != id
  // if( ideaIterada.id != id){
  // Misma sintaxis pero puedo resumirla omitiendo las llaves del arrow
  //   return ideaIterada
  // }
  
  )
 ideas = ideasFiltradas
 crearHTML()
}
// Mostrar mensaje de error 
function mostrarError(error){
  const mensajeError = document.createElement("P")
  mensajeError.textContent = error
  //  formulario.appendChild(mensajeError)
  mensajeError.classList.add("error")
  //  Insertar en el contenido 
  const contenido = document.querySelector("#contenido")
  contenido.appendChild(mensajeError)
  // Elimina el contenido
  setTimeout(() => {
    mensajeError.remove()
  }, 2000);
}