import "./DetalleEvento.css";
import { formatearFecha } from "../../utils/formatearFecha"
import MapaDetalle from "./MapaDetalle";

function DetalleEvento( {evento} ) {
  return (
    <section className="detalle-contenedor">
      <h2>{evento.titulo}</h2>
      <div className="detalle-flex">
        <div className="izquierda">
          <p>
             {evento.categoria}
          </p>
          <p>
            💼 Organiza <span>{evento.organizador}</span>
          </p>
          <div>
            <p className="descripcion">{evento.descripcion}</p>
            <img src={evento.imagen} alt={evento.titulo} />
          </div>
        </div>

        <div className="derecha">
          <p>
            📅 {formatearFecha(evento.fecha)} - {evento.hora} hs
          </p>
          <p>
            🎫 Entradas desde ${evento.precioDeEntradas} en:{" "}
            <span>articket.com/grupotech</span>
          </p>
          <div className="mapa">
            <p>
              📍 {evento.lugar} ({evento.dirección})
            </p>
            <MapaDetalle />
          </div>
        </div>
      </div>
    </section>
  );
}

export default DetalleEvento;
