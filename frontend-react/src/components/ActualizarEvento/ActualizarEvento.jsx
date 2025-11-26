import "./ActualizarEvento.css";
import { toast } from "react-toastify";

function ActualizarEvento({
  actualizarEvento,
  eventoEditando,
  setEventoEditando,
  formEdit,
  setFormEdit,
  cancelarActualizar
}) {

  const handleSubmit = (e) => {
    e.preventDefault();
    actualizarEvento(eventoEditando.id, formEdit);
    setEventoEditando(null);
    toast.success("Evento actualizado")
  }

  return (
    <div className="formulario-evento form-editar-evento">
      <form onSubmit={handleSubmit}>
        <div className="campo">
          <label for="titulo">Título del Evento</label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            placeholder="Ej: Festival Aplauso al asador "
            required
            value={formEdit.titulo}
            onChange={(e) =>
              setFormEdit({ ...formEdit, titulo: e.target.value })
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
            value={formEdit.descripcion}
            onChange={(e) =>
              setFormEdit({ ...formEdit, descripcion: e.target.value })
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
            value={formEdit.fecha}
            onChange={(e) =>
              setFormEdit({ ...formEdit, fecha: e.target.value })
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
            value={formEdit.hora}
            onChange={(e) => setFormEdit({ ...formEdit, hora: e.target.value })}
          />
        </div>

        <div className="campo">
          <label for="categoria">Categoría</label>
          <select
            id="categoria"
            name="categoria"
            required
            value={formEdit.categoria}
            onChange={(e) =>
              setFormEdit({ ...formEdit, categoria: e.target.value })
            }
          >
            <option value="Culturales">🎭 Culturales</option>
            <option value="Deportes">⚽ Deportes</option>
            <option value="Educativos">🎓 Educativos</option>
            <option value="Ferias">🛍️ Ferias</option>
            <option value="Fiestas">🥳️ Fiestas</option>
            <option value="Otros">📚 Otros</option>
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
            value={formEdit.lugar}
            onChange={(e) =>
              setFormEdit({ ...formEdit, lugar: e.target.value })
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
            value={formEdit.direccion}
            onChange={(e) =>
              setFormEdit({ ...formEdit, direccion: e.target.value })
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
            value={formEdit.imagen}
            onChange={(e) =>
              setFormEdit({ ...formEdit, imagen: e.target.value })
            }
          />
        </div>

        <button type="submit">Guardar cambios</button>
        <button onClick={cancelarActualizar} className="btn-cancelar">X</button>
      </form>
    </div>
  );
}

export default ActualizarEvento;
