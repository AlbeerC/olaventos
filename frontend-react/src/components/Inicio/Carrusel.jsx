import { useState, useEffect } from "react";
import "./Inicio.css";
import { useEventos } from "../../context/EventosContext";
import { formatearFecha } from "../../utils/formatearFecha";
import { Link } from "react-router";

function Carrusel() {
  const [indiceActual, setIndiceActual] = useState(0);
  const { cargarEventos, eventos } = useEventos();

  useEffect(() => {
    cargarEventos();
  }, []);

  const eventosDestacados = eventos.slice(0, 4);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndiceActual((prevI) =>
        prevI === eventosDestacados.length - 1 ? 0 : prevI + 1
      );
    }, 5000);

    return () => clearInterval(intervalo);
  }, [eventosDestacados.length]);

  const siguienteSlide = () => {
    setIndiceActual((prevI) =>
      prevI === eventosDestacados.length - 1 ? 0 : prevI + 1
    );
  };

  const anteriorSlide = () => {
    setIndiceActual((prevI) =>
      prevI === 0 ? eventosDestacados.length - 1 : prevI - 1
    );
  };

  const irASlide = (indice) => {
    setIndiceActual(indice);
  };

  return (
    <div className="carousel-container">
      <div className="carousel">
        <button className="carousel-button prev" onClick={anteriorSlide}>
          ❮
        </button>

        <div className="carousel-content">
          {eventosDestacados.map((evento, index) => (
            <div
              key={evento.id}
              className={`carousel-slide ${
                index === indiceActual ? "active" : ""
              }`}
            >
              <div className="event-card">
                <div className="event-image">
                  <img
                    src={evento.imagen || "/placeholder.svg"}
                    alt={evento.titulo}
                  />
                  <span className="event-category">{evento.categoria}</span>
                  <div className="event-overlay">
                    <h3 className="event-title">{evento.titulo}</h3>
                    <div className="event-quick-info">
                      <span className="quick-info-item">
                        <span className="info-icon">📅</span>
                        {formatearFecha(evento.fecha)}
                      </span>
                      <span className="quick-info-item">
                        <span className="info-icon">📍</span>
                        {evento.lugar}
                      </span>
                    </div>
                    <Link to={`/detalle/${evento.id}`} className="event-button">
                      Ver detalles
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="carousel-button next" onClick={siguienteSlide}>
          ❯
        </button>
      </div>

      <div className="carousel-indicators">
        {eventosDestacados.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === indiceActual ? "active" : ""}`}
            onClick={() => irASlide(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default Carrusel;
