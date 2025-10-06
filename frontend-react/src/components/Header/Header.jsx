import './Header.css'
import logo from "../../assets/Olaventos-logo.png"
import { useState } from 'react'
import { Menu } from 'lucide-react'

function Header () {

    const [menuAbierto, setMenuAbierto] = useState(false)

    const toggleMenu = () => {
        setMenuAbierto(!menuAbierto)
    }

    return (
      <header>
        <a href="index.html" className="imagen-container">
          <img src={logo} alt="Logo de la pagina" />
        </a>

        <button className="menu-hamburguesa" onClick={toggleMenu}>
          <Menu />
        </button>

        <ul className={`menu-nav ${menuAbierto ? 'activo' : ''}`}>
          <li><a href="index.html">Inicio</a></li>
          <li><a href="./pages/eventos.html">Eventos</a></li>
        </ul>

        <div className="header-buttons">
          <button className="tema"></button>

          <a href="./pages/login.html" className="login">Iniciar Sesion</a>
        </div>
      </header>
    )
}

export default Header