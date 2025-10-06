import "./CrearEventos.css";

function CrearEventos() {
  return (
    <section className="formulario-evento">
      <p className="text">Completá el formulario para registrar un nuevo evento</p>

      <form id="registroEventoForm">
        <div className="campo">
          <label for="titulo">Título del Evento</label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            placeholder="Ej: Festival Aplauso al asador "
            required
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
          ></textarea>
        </div>

        <div className="campo">
          <label for="fecha">Fecha</label>
          <input type="date" id="fecha" name="fecha" required />
        </div>

        <div className="campo">
          <label for="hora">Hora</label>
          <input type="time" id="hora" name="hora" required />
        </div>

        <div className="campo">
          <label for="categoria">Categoría</label>
          <select id="categoria" name="categoria" required>
            <option value="">-- Seleccioná una opción --</option>
            <option value="culturales">Culturales</option>
            <option value="deportes">Deportes</option>
            <option value="educativos">Educativos</option>
            <option value="ferias">Ferias</option>
            <option value="fiestas">Fiestas</option>
            <option value="otros">Otros</option>
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
          />
        </div>

        <button type="submit">Registrar Evento</button>
      </form>
    </section>
  );
}

export default CrearEventos;
