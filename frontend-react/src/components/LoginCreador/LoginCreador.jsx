import './LoginCreador.css'
import { Link, useNavigate } from 'react-router'

function LoginCreador() {

  const navigate = useNavigate()

  const irAlPanel = (e) => {
    e.preventDefault()
    navigate('/panel-creador')
  }

  return (
    <main className="main-login-organizador">
      <form className="form-organizador" onSubmit={irAlPanel}>
        <h2>Crear cuenta</h2>
        <p>
          Registrate como organizador para registrar tus eventos. Se enviará la
          petición y se le notificará cuando se apruebe
        </p>

        <div className="campo">
          <label for="nombre">Nombre de la organización</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            placeholder="Nombre organización"
            required
          />
        </div>

        <div className="campo">
          <label for="contacto">Correo electrónico de contacto</label>
          <input
            type="email"
            id="contacto"
            name="contacto"
            placeholder="tu@email.com"
            required
          />
        </div>

        <div className="campo">
          <label for="descripcion">Descripción del tipo de eventos</label>
          <textarea
            id="descripcion"
            name="descripcion"
            placeholder="Descripción del tipo de eventos"
            required
          ></textarea>
        </div>

        <div className="campo">
          <label for="contraseña">Contraseña</label>
          <input
            type="password"
            id="contraseña"
            name="contraseña"
            placeholder="******"
            required
          />
        </div>

        <div className="campo">
          <label for="confirmar-contraseña">Confirmar contraseña</label>
          <input
            type="password"
            id="confirmar-contraseña"
            name="confirmar-contraseña"
            placeholder="******"
            required
          />
        </div>

        <button type="submit">Enviar</button>

        <p className="inicia-link">
          Tu organización ya está registrada?{" "}
          <Link to='/login'>Inicia sesión</Link>
        </p>
      </form>
    </main>
  );
}

export default LoginCreador;
