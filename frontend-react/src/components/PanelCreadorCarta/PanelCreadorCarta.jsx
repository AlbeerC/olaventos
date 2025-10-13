import { formatearFecha } from "../../utils/formatearFecha"

function PanelCreadorCarta( {evento} ) {
  return (
    <div className="evento">
      <div class="arriba">
        <h3>{evento.titulo}</h3>
        <span>Publicado</span>
      </div>
      <img src={evento.imagen} alt={evento.titulo} />
      <p class="fecha">{formatearFecha(evento.fecha)}</p>
      <p>
        {evento.lugar} - {evento.dirección}
      </p>
      <div class="botones">
        <button onclick="window.location.href='./crearEvento.html'">
          Editar
        </button>
        <button class="eliminar-btn">Eliminar</button>
      </div>
    </div>
  );
}

export default PanelCreadorCarta;
