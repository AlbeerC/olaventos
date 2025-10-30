import { useState } from "react";
import "./LoginCreador.css";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

function LoginCreador() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [password, setPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");

  const navigate = useNavigate();

  const enviarForm = async (e) => {
    e.preventDefault();

    if (password !== confirmarPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    const url = "http://localhost:3000/auth/register-organizer"

    const body = { nombre, email, password, descripcion }

    try {
      const respuesta = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const resultado = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(resultado.message || "Error en el servidor");
      }

      toast.success("Se ha enviado la petición. Te notificaremos cuando la hayamos revisado.");
      setEmail("");
      setPassword("");
      setConfirmarPassword("")
      setDescripcion("")
      setNombre("")
      navigate("/login");
    
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <main className="main-login-organizador">
      <form className="form-organizador" onSubmit={enviarForm}>
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
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="campo">
          <label for="descripcion">Descripción del tipo de eventos</label>
          <textarea
            id="descripcion"
            name="descripcion"
            placeholder="Descripción del tipo de eventos"
            required
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            value={confirmarPassword}
            onChange={(e) => setConfirmarPassword(e.target.value)}
          />
        </div>

        <button type="submit">Enviar</button>

        <p className="inicia-link">
          Tu organización ya está registrada?{" "}
          <Link to="/login">Inicia sesión</Link>
        </p>
      </form>
    </main>
  );
}

export default LoginCreador;
