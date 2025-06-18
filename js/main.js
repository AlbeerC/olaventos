// Menú hamburguesa para el header
const botonMenu = document.getElementById("menu-hamburguesa")
const menu = document.getElementById("menu-nav")

if (botonMenu && menu) {
  botonMenu.addEventListener("click", () => {
    menu.classList.toggle("activo")
  })
}


// Generar botones de categoría dinámicamente
const categorias = [
  { nombre: "Culturales", icono: "🎭"},
  { nombre: "Deportes", icono: "⚽"},
  { nombre: "Educativos", icono: "🎓"},
  { nombre: "Ferias", icono: "🛍️"},
  { nombre: "Fiestas", icono: "🥳️"},
  { nombre: "Otros", icono: "📚"}
]

const categoriasContenedor = document.getElementById("categorias")

if (categoriasContenedor) {
  categorias.forEach(cat => {

    const botonCategoria = document.createElement("div")
    botonCategoria.classList.add("boton-categoria")
    botonCategoria.innerHTML = `
      <p class="icono">${cat.icono}</p>
      <p>${cat.nombre}</p>
    `

    categoriasContenedor.appendChild(botonCategoria)
  })
}


// Mostrar contenido del JSON

async function cargarEventos () {
  try {
    const respuesta = await fetch("../eventos.json")

    if (!respuesta.ok) {
      throw new Error(`Error HTTP: ${respuesta.status}`)
    }

    const eventos = await respuesta.json()
    mostrarDatos(eventos)
  } catch (error) {
    console.error('Ocurrió un error al obtener los datos:', error.message);
  }
}


function mostrarDatos (eventos) {
  const eventosContenedor = document.getElementById("lista-eventos")

  eventos.forEach(evento => {
    const card = document.createElement("div")
    card.classList.add("evento-card")

    card.innerHTML = `
      <i class="fa-solid fa-heart"></i>
      <h2>${evento.descripcion}</h2>
      <h3>05 AGO, 2025</h3>
      <p>Teatro municipal</p>
      <button>Ver info</button>
    `

    eventosContenedor.appendChild(card)
  })
}

cargarEventos()