import './Header.css'
import logo from "../../assets/Olaventos-logo.png"
import { useState } from 'react'
import { Menu } from 'lucide-react'
import { Link } from 'react-router'
import { useAuth } from '../../context/AuthContext'

function Header () {

    const [menuAbierto, setMenuAbierto] = useState(false)

    const { user } = useAuth()

    const toggleMenu = () => {
        setMenuAbierto(!menuAbierto)
    }

    return (
      <header>
        <Link to="/" className="imagen-container">
          <img src={logo} alt="Logo de la pagina" />
        </Link>

        <button className="menu-hamburguesa" onClick={toggleMenu}>
          <Menu />
        </button>

        <ul className={`menu-nav ${menuAbierto ? 'activo' : ''}`}>
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/eventos">Eventos</Link></li>
        </ul>

        <div className="header-buttons">
          <button className="tema"></button>

          {user ? 
            <Link to="/panel-usuario" className='boton-usuario'>{user.nombre}</Link> :
            <Link to="/login" className="login">Iniciar Sesion</Link>
          }
        </div>
      </header>
    )
}

export default Header