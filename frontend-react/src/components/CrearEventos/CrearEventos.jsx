import { useState } from "react";
import "./CrearEventos.css";
import { useEventos } from "../../context/EventosContext";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

function CrearEventos() {
  const { crearEvento } = useEventos();
  const { user } = useAuth();

  if (!user || user.rol === 'user' || !user.aprobado) return;

  const [datosForm, setDatosForm] = useState({
    titulo: "",
    descripcion: "",
    fecha: "",
    hora: "",
    categoria: "🎭 Culturales",
    lugar: "",
    direccion: "",
    imagen: "",
    organizadorId: user.id
  });

  const enviarForm = async (e) => {
    e.preventDefault();
    await crearEvento(datosForm);
    toast.success("Evento creado");
    setDatosForm({
      titulo: "",
      descripcion: "",
      fecha: "",
      hora: "",
      categoria: "🎭 Culturales",
      lugar: "",
      direccion: "",
      imagen: "",
      organizadorId: user.id
    });
  };

  return (
    <section className="formulario-evento">
      <p className="text">
        Completá el formulario para registrar un nuevo evento
      </p>

      <form id="registroEventoForm" onSubmit={enviarForm}>
        <div className="campo">
          <label for="titulo">Título del Evento</label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            placeholder="Ej: Festival Aplauso al asador "
            required
            value={datosForm.titulo}
            onChange={(e) =>
              setDatosForm({ ...datosForm, titulo: e.target.value })
            }
          />
        </div>

        <div className="campo">
          <label for="descripcion">Descripción</label>
          <textarea
            id="descripcion"
            name="descripcion"
            placeholder="Incluya una breve descripción del evento"
            rows="4"
            required
            value={datosForm.descripcion}
            onChange={(e) =>
              setDatosForm({ ...datosForm, descripcion: e.target.value })
            }
          ></textarea>
        </div>

        <div className="campo">
          <label for="fecha">Fecha</label>
          <input
            type="date"
            id="fecha"
            name="fecha"
            required
            value={datosForm.fecha}
            onChange={(e) =>
              setDatosForm({ ...datosForm, fecha: e.target.value })
            }
          />
        </div>

        <div className="campo">
          <label for="hora">Hora</label>
          <input
            type="string"
            id="hora"
            name="hora"
            required
            value={datosForm.hora}
            onChange={(e) =>
              setDatosForm({ ...datosForm, hora: e.target.value })
            }
          />
        </div>

        <div className="campo">
          <label for="categoria">Categoría</label>
          <select
            id="categoria"
            name="categoria"
            required
            value={datosForm.categoria}
            onChange={(e) =>
              setDatosForm({ ...datosForm, categoria: e.target.value })
            }
          >
            <option value="🎭 Culturales">🎭 Culturales</option>
            <option value="⚽ Deportes">⚽ Deportes</option>
            <option value="🎓 Educativos">🎓 Educativos</option>
            <option value="🛍️ Ferias">🛍️ Ferias</option>
            <option value="🥳️ Fiestas">🥳️ Fiestas</option>
            <option value="📚 Otros">📚 Otros</option>
          </select>
        </div>

        <div className="campo">
          <label for="lugar">Lugar</label>
          <input
            type="text"
            id="lugar"
            name="lugar"
            placeholder="Lugar del evento"
            required
            value={datosForm.lugar}
            onChange={(e) =>
              setDatosForm({ ...datosForm, lugar: e.target.value })
            }
          />
        </div>

        <div className="campo">
          <label for="direccion">Dirección</label>
          <input
            type="text"
            id="direccion"
            name="direccion"
            placeholder="Dirección del lugar"
            required
            value={datosForm.direccion}
            onChange={(e) =>
              setDatosForm({ ...datosForm, direccion: e.target.value })
            }
          />
        </div>

        <div className="campo">
          <label for="imagen">Imagen del Evento</label>
          <input
            type="text"
            id="imagen"
            name="imagen"
            placeholder="Enlace de la imagen"
            required
            value={datosForm.imagen}
            onChange={(e) =>
              setDatosForm({ ...datosForm, imagen: e.target.value })
            }
          />
        </div>

        <button type="submit">Registrar Evento</button>
      </form>
    </section>
  );
}

export default CrearEventos;
