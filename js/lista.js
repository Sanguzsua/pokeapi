// función que muestra una lista de pokémon en pantalla, con un buscador y filtros por tipo
function mostrarLista(pokemones) {
    // obtiene el elemento principal donde se mostrará el contenido
    const app = document.getElementById("app");
    
    // limpia el contenido actual del elemento "app"
    app.innerHTML = "";

    // crea una sección para contener la lista de pokémon
    const seccion = document.createElement("section");
    seccion.classList.add("c-lista");

    // crea un input para que el usuario pueda buscar pokémon por nombre o id
    const buscador = document.createElement("input");
    buscador.classList.add("c-buscador");
    buscador.type = "text";
    buscador.placeholder = "buscar pokémon...";
    // agrega un evento que ejecuta la función buscarPoke cada vez que se escribe algo
    buscador.addEventListener("input", (evento) => buscarPoke(evento, pokemones));

    // lista de tipos de pokémon para los botones de filtro
    const tipos = [
        "all",
        "normal", "fighting", "flying", "poison", "ground", "rock",
        "bug", "ghost", "steel", "fire", "water", "grass", "electric",
        "psychic", "ice", "dragon", "dark", "fairy", "stellar", "shadow", "unknown"
    ];

    // genera el html con los botones de tipo
    let listaTipos = "";
    for (let i = 0; i < tipos.length; i++) {
        listaTipos += `<button onclick="filtrarPorTipo('${tipos[i]}')">${tipos[i]}</button>`;
    }

    // crea el contenedor de los filtros por tipo
    const filtro = document.createElement("div");
    filtro.classList.add("filtro");
    filtro.innerHTML = listaTipos;

    // genera el contenido inicial de la lista de pokémon
    seccion.innerHTML = generarLista(pokemones);

    // agrega los elementos al dom
    app.appendChild(buscador);
    app.appendChild(filtro);
    app.appendChild(seccion);
}

// función que genera el html de la lista de pokémon
function generarLista(pokemones) {
    let listaHTML = "";
    for (let i = 0; i < pokemones.length; i++) {
        // extrae el id del pokémon desde la url
        let id = pokemones[i].url.split("/")[6];
        // construye el bloque html de cada pokémon
        listaHTML += `
        <div class="c-lista-pokemon poke-${id}" onclick="mostrarDetalle('${id}')">
            <p>#${id}</p>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png" width="auto" height="60" loading="lazy" alt="${pokemones[i].name}">
            <p>${pokemones[i].name}</p>
        </div>`;
    }
    return listaHTML;
}

// función que filtra la lista de pokémon a partir de lo que el usuario escribe en el buscador
function buscarPoke(evento, pokemones) {
    const texto = evento.target.value.toLowerCase();

    // si se escriben al menos 3 letras y no es un número, filtra por nombre
    if (texto.length >= 3 && isNaN(texto)) {
        const listaFiltrada = pokemones.filter((pokemon) => pokemon.name.includes(texto));
        document.querySelector(".c-lista").innerHTML = generarLista(listaFiltrada);
    }

    // si se escribe un número, filtra por id (parte de la url)
    if (!isNaN(texto)) {
        const listaFiltrada = pokemones.filter((pokemon) => pokemon.url.includes("/" + texto));
        document.querySelector(".c-lista").innerHTML = generarLista(listaFiltrada);
    }

    // si el campo está vacío, vuelve a mostrar la lista completa
    if (texto.length === 0) {
        document.querySelector(".c-lista").innerHTML = generarLista(pokemones);
    }
}

// función asincrónica que filtra los pokémon según su tipo usando la api
async function filtrarPorTipo(untipo) {
    // si el tipo es "all", se vuelve a cargar la lista completa
    if (untipo == "all") {
        conexionLista(); // asumo que esta función vuelve a cargar todo
    } else {
        try {
            // hace la solicitud a la api por tipo de pokémon
            const respuesta = await fetch(`https://pokeapi.co/api/v2/type/${untipo}`);
            const datos = await respuesta.json();

            // extrae los pokémon desde la respuesta
            const pokemonesFiltrados = datos.pokemon.map(p => p.pokemon);

            // muestra en pantalla la lista filtrada
            mostrarLista(pokemonesFiltrados);
        } catch (error) {
            // en caso de error, muestra un mensaje en pantalla
            console.error("error al filtrar por tipo:", error);
            document.getElementById("app").innerHTML = `<p>error al cargar pokémon de tipo "${untipo}".</p>`;
        }
    }
}
