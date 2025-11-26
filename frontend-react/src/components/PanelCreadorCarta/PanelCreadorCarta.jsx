import { useState } from "react";
import { formatearFecha } from "../../utils/formatearFecha";
import ModalConfirmacion from "../ModalConfirmacion/ModalConfirmacion";
import { toast } from "react-toastify";

function PanelCreadorCarta({ evento, eliminarEvento, actualizarEvento }) {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [eventoAEliminar, setEventoAEliminar] = useState(null);

  const handleEliminarClick = (id) => {
    setEventoAEliminar(id);
    setModalAbierto(true);
  };

  const confirmarEliminar = () => {
    eliminarEvento(eventoAEliminar);
    setModalAbierto(false);
    setEventoAEliminar(null);
    toast.success("Evento eliminado")
  };

  const cancelarEliminar = () => {
    setModalAbierto(false);
    setEventoAEliminar(null);
  };

  return (
    <div className="evento">
      <div class="arriba">
        <h3>{evento.titulo}</h3>
        <span>Publicado</span>
      </div>
      <img src={evento.imagen} alt={evento.titulo} />
      <p class="fecha">{formatearFecha(evento.fecha)}</p>
      <p>
        {evento.lugar} - {evento.direccion}
      </p>
      <div class="botones">
        <button onClick={() => actualizarEvento(evento)}>
          Editar
        </button>
        <button
          class="eliminar-btn"
          onClick={() => handleEliminarClick(evento.id)}
        >
          Eliminar
        </button>
      </div>

      <ModalConfirmacion
        isOpen={modalAbierto}
        message="¿Estás seguro que quieres eliminar este evento?"
        onConfirm={confirmarEliminar}
        onCancel={cancelarEliminar}
      />
    </div>
  );
}

export default PanelCreadorCarta;
