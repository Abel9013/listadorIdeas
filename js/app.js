// Variables
const formulario = document.querySelector("#formulario")
const listaIdeas = document.querySelector("#lista-ideas")
let ideas = []
// Even Listeners
eventListeners()
function eventListeners(){
  // Cuando el usuario agrega una nueva idea 
  formulario.addEventListener('submit',agregarIdea)

  // Cuando el documento esta listo 
  document.addEventListener('DOMContentLoaded', ()=>{
    ideas = JSON.parse(localStorage.getItem('ideas')) || []
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