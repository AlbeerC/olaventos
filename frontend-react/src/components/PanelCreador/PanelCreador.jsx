import "./PanelCreador.css";
import { formatearFecha } from "../../utils/formatearFecha";
import { useEffect, useState } from "react";
import PanelCreadorCarta from "../PanelCreadorCarta/PanelCreadorCarta";
import { Plus } from "lucide-react";
import { Link } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

function PanelCreador() {
  const [eventos, setEventos] = useState([]);
  const { logout, user } = useAuth();

  const cerrarSesion = () => {
    logout();
    toast.success("Sesión cerrada");
  };

  useEffect(() => {
    const cargarEventosCreador = async () => {
      try {
        const respuesta = await fetch("/eventos.json");

        if (!respuesta.ok) {
          throw new Error(`HTTP Error: ${respuesta.status}`);
        }

        const resultado = await respuesta.json();
        setEventos(resultado.slice(0, 3));
      } catch (error) {
        console.log(error.message);
      }
    };

    cargarEventosCreador();
  }, []);

  if (!user) {
    return (
      <div className="pagina-bloqueada">
        <p>Tenés que tener una cuenta para ingresar al panel</p>
      </div>
    );
  }

  return (
    <main className="panel-creador-main">
      <section className="titulos">
        <h2>Mis eventos</h2>
        <Link to="/crear-evento">
          <button>
            <Plus />
            <span>Nuevo evento</span>
          </button>
        </Link>
      </section>

      <section className="eventos-creador">
        {eventos.map((evento) => (
          <PanelCreadorCarta evento={evento} key={evento.titulo} />
        ))}
      </section>

      <div className="cerrar-sesion-div">
        <button className="btn-cerrar-sesion" onClick={cerrarSesion}>
          Cerrar sesión
        </button>
      </div>
    </main>
  );
}

export default PanelCreador;
