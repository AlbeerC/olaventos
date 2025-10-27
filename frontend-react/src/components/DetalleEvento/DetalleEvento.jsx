import "./DetalleEvento.css";
import { formatearFecha } from "../../utils/formatearFecha";
import MapaDetalle from "./MapaDetalle";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

function DetalleEvento() {
  const { id } = useParams();
  const [evento, setEvento] = useState(null)

  useEffect(() => {
    const cargarEvento = async () => {
      try {
        const respuesta = await fetch("/eventos.json");

        if (!respuesta.ok) {
          throw new Error(`HTTP Error: ${respuesta.status}`);
        }

        const resultado = await respuesta.json();
        setEvento(resultado.filter((ev) => ev.id == id)[0]);
      } catch (error) {
        console.log(error);
      }
    };

    cargarEvento()
  }, [id]);

  if (!evento) return <p>...</p>

  return (
    <section className="detalle-contenedor">
      <h2>{evento.titulo}</h2>
      <div className="detalle-flex">
        <div className="izquierda">
          <p>{evento.categoria}</p>
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
