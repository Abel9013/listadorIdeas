// Variables
const formulario = document.querySelector("#formulario")
const listaIdeas = document.querySelector("#lista-ideas")
let ideas = []
// Even Listeners
eventListeners()
function eventListeners(){
  formulario.addEventListener('submit',agregarIdea)

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
      // Creando HTML
      const li = document.createElement("li")
      // Añadir texto
      li.innerText = ideaIt.idea
      listaIdeas.appendChild(li)
    });
  }
}

function limpiarHTML(){
  while(listaIdeas.firstChild){
    listaIdeas.removeChild(listaIdeas.firstChild)
  }
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