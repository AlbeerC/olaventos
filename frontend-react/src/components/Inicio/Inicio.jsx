import "./Inicio.css";
import { MoveRight } from "lucide-react";
import { Link } from "react-router";
import { useAuth } from "../../context/AuthContext";
import Carrusel from "./Carrusel";

function Inicio() {
  const { user } = useAuth();

  const isOrganizador = user?.rol === "organizer";

  return (
    <main>
      <section className="hero">
        <div className="hero-text">
          <h2>Descubrí lo mejor de Olavarría, en un solo lugar</h2>
          <Link to="/eventos">Ver eventos</Link>
        </div>
      </section>

      <section className="contenido-principal-home">
        <div className="sobre-nosotros">
          <h2>Sobre nosotros</h2>
          <p>
            En Olaventos creemos en el poder de los encuentros. Somos un equipo
            local apasionado por conectar a la comunidad de Olavarría con todas
            las propuestas culturales, deportivas, educativas y sociales que la
            ciudad tiene para ofrecer.
          </p>
          <p>
            Nuestra misión es que nunca más te pierdas un evento. Por eso,
            desarrollamos una plataforma accesible, dinámica y actualizada,
            donde podés descubrir actividades, agendar tus favoritas y conocer
            todo lo que pasa cerca tuyo.
          </p>
          <p>
            Ya seas espectador o creador, Olaventos está pensado para vos. Si
            organizás eventos, podés difundirlos fácilmente desde nuestro panel
            para llegar a más personas interesadas.
          </p>
        </div>

        <div className="eventos-destacados">
          <h2>Eventos destacados</h2>
          <Carrusel />
        </div>
      </section>

      <div className="organizador">
        <h3>Sos organizador y querés registrar un evento?</h3>
        <p>
          Registrá tu evento y llegá a miles de personas en Olavarría. Es fácil,
          rápido y completamente gratuito.
        </p>
        <Link to={isOrganizador ? "/crear-evento" : "/login-creador"}>
          Crear evento gratis <MoveRight />
        </Link>
      </div>

      <section className="contacto">
        <h2>Contacto</h2>
        <p>
          Podés contactarnos por teléfono o por email. O bien, rellená el
          siguiente formulario y te responderermos lo antes posible.
        </p>

        <div className="datos-contacto">
          <p>
            <strong>
              <span className="subrayado">NÚMERO TELEFÓNICO: </span>
            </strong>
            +54 2284 123456
          </p>
          <p>
            <strong>
              <span className="subrayado">EMAIL: </span>
            </strong>
            contacto@olaventos.com
          </p>
        </div>

        <form
          action="https://api.web3forms.com/submit"
          method="POST"
          className="formulario"
        >
          {/* ACCESS KEY */}
          <input
            type="hidden"
            name="access_key"
            value="23745eec-2905-43c0-8363-a28a7f42703f"
          />

          <input
            type="hidden"
            name="subject"
            value="Nuevo mensaje desde el formulario de Olaventos"
          />

          <input type="text" name="name" placeholder="Nombre" required />
          <input type="email" name="email" placeholder="Email" required />
          <input type="text" name="asunto" placeholder="Asunto" required />
          <textarea name="message" placeholder="Mensaje" required></textarea>

          {/* Desactivar el captcha */}
          <input type="hidden" name="captcha" value="false" />

          <button type="submit">Enviar</button>
        </form>
      </section>
    </main>
  );
}

export default Inicio;
