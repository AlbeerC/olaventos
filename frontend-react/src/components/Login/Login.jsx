import { useState } from "react";
import "./Login.css";
import { useAuth } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"  
import { toast } from 'react-toastify'

function Login() {
  const [esLogin, setEsLogin] = useState(true);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmarPassword, setConfirmarPassword] = useState('') 
  const [nombre, setNombre] = useState('')

  const navigate = useNavigate()

  const { login } = useAuth()

  const enviarForm = async (e) => {
    e.preventDefault()

    if (password !== confirmarPassword && !esLogin) {
      toast.error('Las contraseñas no coinciden')
      return
    }

    const url = esLogin
      ? 'http://localhost:3000/auth/login'
      : 'http://localhost:3000/auth/register'

    const body = esLogin
    ? {email, password}
    : {nombre, email, password, rol: "user"}


    try {
      const respuesta = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })

      
      const resultado = await respuesta.json()
      
      if (!respuesta.ok) {
        throw new Error(resultado.message || 'Error en el servidor')
      }

      if (esLogin) {
        login(resultado.user, resultado.access_token)
        toast.success("Logueado correctamente")
        setEmail("")
        setPassword("")
        navigate("/panel-usuario")
      } else {
        toast.success('Usuario registrado! Ahora logueate.')
        setEsLogin(true)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="contenido">
      <main className="main-login">
        <form className="login-form" onSubmit={enviarForm}>
          <h2>{esLogin ? "Inicia sesión" : "Crear cuenta"}</h2>
          <p className="text">
            {esLogin
              ? "Ingresa a tu cuenta para guardar tus eventos favoritos"
              : "Registrate para enterarte de los últimos eventos"}
          </p>

          { !esLogin && 
          <div className="campo">
            <label for="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Nombre"
              required
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          }
          <div className="campo">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="tu@email.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="campo">
            <label for="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="********"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          { !esLogin && 
            <div className="campo">
              <label for="password">Confirmar contraseña</label>
              <input
                type="password"
                id="confirm-password"
                name="confirm-password"
                placeholder="********"
                required
                value={confirmarPassword}
                onChange={(e) => setConfirmarPassword(e.target.value)}
              />
            </div>
          }

          <button type="submit" className="submit-btn">
            Ingresar
          </button>
          <p className="iniciar-sesion-link">
            {esLogin ? "¿No tenés cuenta?" : "¿Ya tenés cuenta?"}
            <button
              className="toggle-login"
              onClick={() => setEsLogin(!esLogin)}
            >
              {esLogin ? "Registrate" : "Iniciá sesión"}
            </button>
          </p>
        </form>
      </main>
    </div>
  );
}

export default Login;
