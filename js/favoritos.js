// función que muestra en pantalla la lista de pokémon marcados como favoritos
function mostrarfavoritos() {
    // obtiene el elemento con id "app" donde se mostrará el contenido
    const app = document.getElementById("app");
    
    // limpia el contenido actual del elemento "app"
    app.innerHTML = "";

    // crea una nueva sección html para contener la lista de favoritos
    const contenedor = document.createElement("section");

    // agrega la clase "c-lista" al contenedor para aplicar estilos
    contenedor.classList.add("c-lista");

    // inserta dentro del contenedor el html generado por la función generarLista usando la lista de favoritos
    contenedor.innerHTML = generarLista(favoritos);

    // agrega el contenedor ya lleno al elemento principal "app"
    app.appendChild(contenedor);
}
