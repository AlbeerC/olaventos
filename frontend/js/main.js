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
  { nombre: "Todos", icono: "⭐"},
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
    mostrarEventosCreador(eventos);
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
                <div id="mapaEvento"></div>
              </div>
            </div>
          </div> 
  `;

  if (detalleContenedor) {
    detalleContenedor.appendChild(detalleVista)
  }

  if (typeof L !== "undefined") {
    cargarMapaDetalleEvento();
  }
}

cargarEventos();

// Formatear fecha para el html
function formatearFecha(fechaISO) {
  const [año, mes, dia] = fechaISO.split("-");
  const fecha = new Date(año, mes - 1, dia);

  const meses = [
    "ENE", "FEB", "MAR", "ABR", "MAY", "JUN",
    "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"
  ];
  return `${dia} ${meses[fecha.getMonth()]}, ${año}`;
}


// Usar mapa de la librería leaflet
function cargarMapaInicio() {
  const mapa = L.map('mapa').setView([-36.8925, -60.3228], 14);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(mapa);

  L.marker([-36.894050374496665, -60.32247491054502]).addTo(mapa)
    .bindPopup("<b>Master Stroke</b><br>Tributo a Queen")

  L.marker([-36.88946876597194, -60.32544841518231]).addTo(mapa)
    .bindPopup("<b>Taller de Arte, Música y Manualidades</b><br>para Niños")

  L.marker([-36.895524416740365, -60.33379363782468]).addTo(mapa)
    .bindPopup("<b>Torneo Nacional de Selecciones de Básquet</b><br>2025")

  L.marker([-36.88272894572409, -60.319987834541315]).addTo(mapa)
    .bindPopup("<b>Tertulia Familiar</b><br>Teatro Independiente")

  L.marker([-36.891080912915, -60.325664966963394]).addTo(mapa)
    .bindPopup("<b>Feria Gastronómica</b><br>'Sabores del Mundo'")
}


if (typeof L !== "undefined") {
  cargarMapaInicio();
}


// Usar mapa en el evento del detalle
function cargarMapaDetalleEvento() {
  const mapaEvento = L.map('mapaEvento').setView([-36.8925, -60.3228], 14);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(mapaEvento);

  L.marker([-36.894050374496665, -60.32247491054502]).addTo(mapaEvento)
    .bindTooltip("Teatro municipal", { direction: "top" })
}


// Generar eventos del creador
function mostrarEventosCreador(eventos) {
  const eventosCreador = document.getElementById("eventosCreador");

  const primerosEventos = eventos.slice(0, 3);

  primerosEventos.forEach((evento) => {
    const eventoDiv = document.createElement("div");
    eventoDiv.classList.add("evento");
    eventoDiv.innerHTML = `
      <div class="arriba">
        <h3>${evento.titulo}</h3>
        <span>Publicado</span>
      </div>
      <img src="${evento.imagen}" alt="${evento.titulo}">
      <p class="fecha">${formatearFecha(evento.fecha)}</p>
      <p>${evento.lugar} - ${evento.dirección}</p>
      <div class="botones">
        <button onclick="window.location.href='./crearEvento.html'">Editar</button>
        <button class="eliminar-btn">Eliminar</button>
      </div>
    `;

    if (eventosCreador) {
      eventosCreador.appendChild(eventoDiv);
    }
  })
}


// Simulación de borrar un evento
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("eliminar-btn")) {
    const card = e.target.closest(".evento")
    if (confirm("¿Estás seguro de que querés eliminar este evento?")) {
      card.remove()
    }
  }
})


// Formulario de organizador lleva al panel si se completan los campos
const formularioOrganizador = document.getElementById("form-organizador");

if (formularioOrganizador) {
formularioOrganizador.addEventListener("submit", function (e) {
  e.preventDefault(); // evita el envío tradicional

  if (formularioOrganizador.checkValidity()) {
    // Si los campos required están bien
    window.location.href = "../pages/panel-creador.html"; // Redirige al panel
  } else {
    // Si algo falta, el navegador mostrará el mensaje de validación automáticamente
    formularioOrganizador.reportValidity(); // fuerza mostrar errores si hay
  }
});
}


// Simular la carga de un evento al JSON
function crearEvento() {
  const eventosSimulados = [] // lista en memoria

  const form = document.getElementById("registroEventoForm")

  form.addEventListener("submit", function (e) {
    e.preventDefault()

  const nuevoEvento = {
    titulo: document.getElementById("titulo").value,
    descripcion: document.getElementById("descripcion").value,
    fecha: document.getElementById("fecha").value,
    hora: document.getElementById("hora").value,
    categoria: document.getElementById("categoria").value,
    lugar: document.getElementById("lugar").value,
    dirección: document.getElementById("direccion").value,
    imagen: document.getElementById("imagen").value || "../assets/placeholder.png",
    precioDeEntradas: 0,
    organizador: "Usuario actual"
  }

  eventosSimulados.push(nuevoEvento)
  alert("✅ Evento creado correctamente (simulado)")

  // Guardarlo en sessionStorage para pasar el dato al panel
  sessionStorage.setItem("eventoNuevo", JSON.stringify(nuevoEvento))

  // Redirigir al panel
  window.location.href = "../pages/panel-creador.html"
})
}

if (document.getElementById("registroEventoForm")) {
  crearEvento()
}


// Ver el vento creado desde el panel
if (document.getElementById("eventosCreador")) {
  window.addEventListener("DOMContentLoaded", () => {
    const eventoNuevo = JSON.parse(sessionStorage.getItem("eventoNuevo"))

    if (eventoNuevo) {
      mostrarEventosCreador([eventoNuevo])
      sessionStorage.removeItem("eventoNuevo")
    }
  })
}