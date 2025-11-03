import "./PanelCreador.css";
import { useEffect, useState } from "react";
import PanelCreadorCarta from "../PanelCreadorCarta/PanelCreadorCarta";
import { Plus } from "lucide-react";
import { Link } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { useEventos } from "../../context/EventosContext";
import ActualizarEvento from "../ActualizarEvento/ActualizarEvento";

function PanelCreador() {
  const { logout, user } = useAuth();
  const { eventos, cargarEventos, eliminarEvento, actualizarEvento } =
    useEventos();

  const [eventoEditando, setEventoEditando] = useState(null);
  const [formEdit, setFormEdit] = useState({
    titulo: "",
    descripcion: "",
    fecha: "",
    hora: "",
    categoria: "🎭 Culturales",
    lugar: "",
    direccion: "",
    imagen: "",
    organizadorId: user?.id,
  });

  const cerrarSesion = () => {
    logout();
    toast.success("Sesión cerrada");
  };

  const handleEditarClick = (evento) => {
    setEventoEditando(evento);
    setFormEdit({
      ...evento,
      fecha: evento.fecha ? evento.fecha.split("T")[0] : "",
    });
  };

  const cancelarActualizar = () => {
    setEventoEditando(null);
    setFormEdit({
      titulo: "",
      descripcion: "",
      fecha: "",
      hora: "",
      categoria: "🎭 Culturales",
      lugar: "",
      direccion: "",
      imagen: "",
      organizadorId: user?.id,
    });
  };

  useEffect(() => {
    cargarEventos();
  }, []);

  const misEventos = eventos.filter((ev) => ev.organizadorId === user?.id);

  if (!user || user.rol === "user") {
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
        {misEventos?.map((evento) => (
          <PanelCreadorCarta
            evento={evento}
            key={evento.titulo}
            eliminarEvento={eliminarEvento}
            actualizarEvento={handleEditarClick}
          />
        ))}
      </section>

      {eventoEditando && (
        <ActualizarEvento
          actualizarEvento={actualizarEvento}
          eventoEditando={eventoEditando}
          formEdit={formEdit}
          setFormEdit={setFormEdit}
          setEventoEditando={setEventoEditando}
          cancelarActualizar={cancelarActualizar}
        />
      )}

      <div className="cerrar-sesion-div">
        <button className="btn-cerrar-sesion" onClick={cerrarSesion}>
          Cerrar sesión
        </button>
      </div>
    </main>
  );
}

export default PanelCreador;
