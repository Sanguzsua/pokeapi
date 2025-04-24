// Función asincrónica que permite hacer una solicitud a una API externa sin bloquear el resto de la app.
async function conexionLista() {
    // Realiza una solicitud HTTP GET a la API de Pokémon con un límite de 1025 resultados
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1025');

    // Espera a que la respuesta se convierta en un objeto JSON
    const data = await res.json();

    // Retorna el arreglo de resultados que contiene la información básica de los pokémon
    return data.results;
}

// Función asincrónica que coordina la obtención de datos y su visualización
async function General() {
    // Espera a que se obtenga la lista de pokémon desde la API
    const infoPokes = await conexionLista();

    // Llama a otra función (no definida aquí) que se encarga de mostrar la lista en el DOM
    mostrarLista(infoPokes);
}
