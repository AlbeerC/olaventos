import "./DetalleEvento.css";
import { formatearFecha } from "../../utils/formatearFecha";
import MapaDetalle from "./MapaDetalle";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useEventos } from "../../context/EventosContext";

function DetalleEvento() {
  const { id } = useParams();
  
  const { evento, cargarEventoPorId } = useEventos()

  useEffect(() => {
    cargarEventoPorId(id)
  }, [id])

  const categoriasIconos = {
    "Culturales": "🎭",
    "Deportes": "⚽",
    "Educativos": "🎓",
    "Ferias": "🛍️",
    "Fiestas": "🥳️",
    "Otros": "📚"
  }

  if (!evento) return <p>...</p>

  return (
    <section className="detalle-contenedor">
      <h2>{evento.titulo}</h2>
      <div className="detalle-flex">
        <div className="izquierda">
          <p>{categoriasIconos[evento.categoria]} {evento.categoria}</p>
          {evento.organizadorNombre && <p>👤 Organiza <span>{evento.organizadorNombre}</span></p>}
          <div>
            <p className="descripcion">{evento.descripcion}</p>
            <img src={evento.imagen} alt={evento.titulo} />
          </div>
        </div>

        <div className="derecha">
          <p>
            📅 {formatearFecha(evento.fecha)} - {evento.hora} hs
          </p>
          <div className="mapa">
            <p>
              📍 {evento.lugar} ({evento.direccion})
            </p>
            <MapaDetalle lugar={evento.lugar} direccion={evento.direccion} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default DetalleEvento;
