// Menú hamburguesa para el header
const botonMenu = document.getElementById("menu-hamburguesa");
const menu = document.getElementById("menu-nav");

if (botonMenu && menu) {
  botonMenu.addEventListener("click", () => {
    menu.classList.toggle("activo");
  });
}

// Generar botones de categoría dinámicamente
const categorias = [
  { nombre: "Culturales", icono: "🎭" },
  { nombre: "Deportes", icono: "⚽" },
  { nombre: "Educativos", icono: "🎓" },
  { nombre: "Ferias", icono: "🛍️" },
  { nombre: "Fiestas", icono: "🥳️" },
  { nombre: "Otros", icono: "📚" },
];

const categoriasContenedor = document.getElementById("categorias");

if (categoriasContenedor) {
  categorias.forEach((cat) => {
    const botonCategoria = document.createElement("button");
    botonCategoria.classList.add("boton-categoria");
    botonCategoria.innerHTML = `
      <p class="icono">${cat.icono}</p>
      <p>${cat.nombre}</p>
    `;

    categoriasContenedor.appendChild(botonCategoria);
  });
}

// Traer el contenido del JSON
async function cargarEventos() {
  try {
    const respuesta = await fetch("../eventos.json");

    if (!respuesta.ok) {
      throw new Error(`Error HTTP: ${respuesta.status}`);
    }

    const eventos = await respuesta.json();
    mostrarEventos(eventos);
    mostrarDetalleEvento(eventos[0])
  } catch (error) {
    console.error("Ocurrió un error al obtener los datos:", error.message);
  }
}

// Mostrar el contenido del JSON
function mostrarEventos(eventos) {
  const eventosContenedor = document.getElementById("lista-eventos");

  eventos.forEach((evento) => {
    const card = document.createElement("div");
    card.classList.add("evento-card");

    card.innerHTML = `
      <i class="fa-solid fa-heart"></i>
      <h2>${evento.titulo}</h2>
      <h3>${formatearFecha(evento.fecha)}</h3>
      <p>${evento.lugar}</p>
      <img src="${evento.imagen}"/>
      <a href="./evento-detalle.html">Ver info</a>
    `;
    if (eventosContenedor) {
      eventosContenedor.appendChild(card);
    }
  });
}

// Generar detalle de un evento
function mostrarDetalleEvento(evento) {
  const detalleContenedor = document.getElementById("detalle-evento-contenedor");

  const detalleVista = document.createElement("section");
  detalleVista.classList.add("detalle-contenedor");
  // Buscar el icono correspondiente a la categoría
  const categoriaEncontrada = categorias.find(cat => cat.nombre === evento.categoria);
  const iconoCategoria = categoriaEncontrada ? categoriaEncontrada.icono : "📌";

  detalleVista.innerHTML = `
            <h2>${evento.titulo}</h2>
            <div class="detalle-flex">
              <div class="izquierda">
              <p>${iconoCategoria} ${evento.categoria}</p>
              <p>💼 Organiza <span>${evento.organizador}</span></p>
              <div>
                <p class="descripcion">${evento.descripcion}</p>
                <img src="${evento.imagen}" alt="${evento.titulo}">
              </div>

            </div>

            <div class="derecha">
              <p>📅 ${formatearFecha(evento.fecha)} - ${evento.hora} hs</p>
              <p>🎫 Entradas desde $${evento.precioDeEntradas} en: <span>articket.com/grupotech</span></p>
              <div class="mapa">
                <p>📍 ${evento.lugar} (${evento.dirección})</p>
                <img src="../assets/mapa.webp" alt="Mapa del evento">
              </div>
            </div>
          </div> 
  `;

  if (detalleContenedor) {
    detalleContenedor.appendChild(detalleVista)
  }
}

cargarEventos();

// Formatear fecha para el html
function formatearFecha(fechaISO) {
  const fecha = new Date(fechaISO);
  const dia = fecha.getDate().toString().padStart(2, "0");
  const año = fecha.getFullYear();
  const meses = [
    "ENE",
    "FEB",
    "MAR",
    "ABR",
    "MAY",
    "JUN",
    "JUL",
    "AGO",
    "SEP",
    "OCT",
    "NOV",
    "DIC",
  ];
  const mes = meses[fecha.getMonth()];
  return `${dia} ${mes}, ${año}`;
}
