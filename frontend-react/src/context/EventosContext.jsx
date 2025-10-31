import { createContext, useContext, useState } from "react";

const EventContext = createContext();

export const EventosProvider = ({ children }) => {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [eventoDetalle, setEventoDetalle] = useState(null);

  const cargarEventos = async () => {
    setLoading(true);
    setError(null);
    try {
      const respuesta = await fetch("http://localhost:3000/eventos");

      if (!respuesta.ok) {
        throw new Error(`HTTP error: ${respuesta.status}`);
      }

      const resultado = await respuesta.json();
      setEventos(resultado);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const cargarEventoPorId = async (id) => {
    setError(null);
    setLoading(true);
    try {
      const respuesta = await fetch(`http://localhost:3000/eventos/${id}`);

      if (!respuesta.ok) {
        throw new Error(`HTTP Error: ${respuesta.status}`);
      }

      const resultado = await respuesta.json();
      setEventoDetalle(resultado);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const crearEvento = async (nuevoEvento) => {
    setLoading(true);
    setError(null);
    try {
      const respuesta = await fetch("http://localhost:3000/eventos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoEvento),
      });

      const resultado = await respuesta.json(); // <--- usar la misma variable

      if (!respuesta.ok) {
        console.log("Error del backend:", resultado); // ahora sí muestra el mensaje real
        throw new Error(`HTTP error: ${respuesta.status}`);
      }

      console.log("Evento creado:", resultado);
      setEventos((prev) => [...prev, resultado]);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    eventos,
    loading,
    error,
    cargarEventos,
    cargarEventoPorId,
    evento: eventoDetalle,
    crearEvento,
  };

  return (
    <EventContext.Provider value={value}>{children}</EventContext.Provider>
  );
};

// Custom hook para facilitar el uso del context en componentes
export const useEventos = () => useContext(EventContext);
