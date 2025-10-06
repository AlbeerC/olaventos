import { useState } from "react";
import "./Login.css";

function Login() {
  const [esLogin, setEsLogin] = useState(true);

  return (
    <div className="contenido">
      <main className="main-login">
        <form className="login-form">
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
