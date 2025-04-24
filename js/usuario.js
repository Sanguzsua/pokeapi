// función que muestra la interfaz del usuario con la información de la app y los créditos
function mostrarusuario() {
  // obtiene el elemento del DOM donde se va a mostrar el contenido
  const container = document.getElementById("app");

  // establece el contenido HTML para la sección de la interfaz de usuario
  container.innerHTML = `
    <div style="
      position: relative;
      min-height: 100vh;
      font-family: 'Arial', sans-serif;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 10px; /* espacio pequeño alrededor */
      box-sizing: border-box;
    ">
      <!-- Fondo -->
      <div style="
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: url('imagenes/pokemones.png'); /* imagen de fondo */
        background-size: cover;
        background-position: center;
        filter: blur(10px); /* desenfoque del fondo */
        z-index: -1; /* coloca el fondo detrás del contenido principal */
      "></div>

      <!-- Contenido principal -->
      <div style="z-index: 1; color: white;">
        <h1 style="font-size: 2.2em; margin-bottom: 15px; color: black;">API:Poke Api</h1>
        <img src="imagenes/poke.png" alt="Trivia Icon" style="width: 150px; margin: 0 auto 20px;" />
        <div style="
          background-color: rgba(0,0,0,0.6); /* fondo oscuro con transparencia */
          padding: 15px;
          border-radius: 10px;
          margin: 0 auto 20px;
          width: 90%;
          max-width: 400px; /* ancho máximo del contenedor */
          font-size: 1em;
        ">
          <p>Esta app usa una API que ofrece información de 1025 Pokemones</p>
        </div>
        <p style="font-size: 1em; color: black;">
          GitHub: <a href="https://github.com/Sanguzsua" target="_blank" style="color: black;">@Sanguzsua</a>
        </p>
        <p style="font-size: 1em; color: black;">Versión de la app: <strong>V.1.0.0</strong></p>
        <footer style="margin-top: 30px; font-size: 0.9em; color: black;">
          Hecho por <strong>Santiago Guzman Suarez</strong>
        </footer>
      </div>
    </div>
  `;
}
