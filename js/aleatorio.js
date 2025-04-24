function mostraraleatorio() {
    // Accede al Document Object Model (DOM) y busca el elemento HTML que tiene el atributo id="app"
    const app = document.getElementById("app");
    
    // Modifica el contenido interno (HTML) de ese elemento, reemplazándolo por el texto "aleatorio"
    app.innerHTML = "aleatorio";
}
