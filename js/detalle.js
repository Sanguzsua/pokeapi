// obtiene la lista de favoritos desde localstorage o inicializa un arreglo vacío si no existe nada guardado
let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

// función que agrega o elimina un pokémon de la lista de favoritos
const toggleFavorito = (id, nombre, btnElement) => {
    id = Number(id); // convierte el id a número por seguridad
    const esFavorito = favoritos.some(pokemon => Number(pokemon.id) === id); // verifica si ya está en favoritos

    if (esFavorito) {
        // si ya es favorito, lo elimina del arreglo
        favoritos = favoritos.filter(p => Number(p.id) !== id);
        // cambia el ícono del botón a un corazón vacío
        btnElement.querySelector('.corazon').textContent = '🤍';
    } else {
        // si no es favorito, lo agrega al arreglo
        favoritos.push({ 
            id, 
            nombre, 
            url: `https://pokeapi.co/api/v2/pokemon/${id}/` 
        });
        // cambia el ícono del botón a un corazón lleno
        btnElement.querySelector('.corazon').textContent = '❤️';
    }

    // guarda la lista actualizada en localstorage
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
};

// función que actualiza el ícono de favorito de un pokémon en base a si está en la lista o no
const actualizarIconoFavorito = (id) => {
    id = Number(id);
    const corazonIcono = document.getElementById(`corazon-${id}`);
    if (!corazonIcono) return; // si no encuentra el ícono, no hace nada

    // actualiza el ícono dependiendo de si está en favoritos o no
    if (favoritos.some(pokemon => Number(pokemon.id) === id)) {
        corazonIcono.textContent = '❤️';
    } else {
        corazonIcono.textContent = '🤍';
    }
};

// función asincrónica que obtiene el detalle de un pokémon desde la api y lo muestra en el dom
async function mostrarDetalle(id) {
    id = Number(id);
    const res = await fetch('https://pokeapi.co/api/v2/pokemon/' + id); // hace la solicitud a la api
    const data = await res.json(); // convierte la respuesta a json

    // construye un string con los tipos del pokémon
    let tipoPoke = "";
    for (let i = 0; i < data.types.length; i++) {
        tipoPoke += `<span>${data.types[i].type.name}</span>`;
    }

    // obtiene el elemento del dom donde se va a mostrar la información
    const app = document.getElementById("app");
    // verifica si el pokémon ya está en favoritos
    const esFavorito = favoritos.some(pokemon => Number(pokemon.id) === id);

    // construye el html del detalle del pokémon
    const detalle = `
    <section class="c-detalle">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png" alt="${data.name}" height="120" width="auto">
        <p>${data.name}</p>
        <p>${data.id}</p>
        <p>${tipoPoke}</p>
        <p>altura: ${data.height / 10} m / peso: ${data.weight / 10} kg</p>
        <p>hp: ${data.stats[0].base_stat}</p>
        <p>velocidad: ${data.stats[5].base_stat}</p>
        <p>ataque: ${data.stats[1].base_stat} defensa: ${data.stats[2].base_stat}</p>
        <p>ataque especial: ${data.stats[3].base_stat} defensa especial: ${data.stats[4].base_stat}</p>

        <button onclick="toggleFavorito(${id}, ${JSON.stringify(data.name)}, this)">
            <span class="corazon">${esFavorito ? '❤️' : '🤍'}</span> favorito
        </button>
    </section>
    `;

    // inserta el html en la página
    app.innerHTML = detalle;

    // actualiza el ícono por si acaso ya estaba en la lista de favoritos
    actualizarIconoFavorito(id);
}
