const botonMenu = document.getElementById("menu-hamburguesa")
const menu = document.getElementById("menu-nav")

botonMenu.addEventListener("click", () => {
  menu.classList.toggle("activo")
})
