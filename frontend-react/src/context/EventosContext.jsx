import { createContext, useContext, useState } from "react";

const EventContext = createContext();

export const EventosProvider = ({ children }) => {
  const API_URL = import.meta.env.VITE_API_URL;

  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [eventoDetalle, setEventoDetalle] = useState(null);

  const cargarEventos = async () => {
    setLoading(true);
    setError(null);
    try {
      const respuesta = await fetch(`${API_URL}/eventos`);

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
      const respuesta = await fetch(`${API_URL}/eventos/${id}`);

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
      const respuesta = await fetch(`${API_URL}/eventos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoEvento),
      });

      const resultado = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(`HTTP error: ${respuesta.status}`);
      }

      setEventos((prev) => [...prev, resultado]);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  const eliminarEvento = async (id) => {
    setError(null);
    setLoading(true);

    try {
      const respuesta = await fetch(`${API_URL}/eventos/${id}`, {
        method: "DELETE",
      });

      if (!respuesta.ok) {
        throw new Error("Error al eliminar el evento");
      }

      setEventos((prev) => prev.filter((ev) => ev.id !== id));
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const actualizarEvento = async (id, datosActualizados) => {
    setError(null);
    setLoading(true);

    // Evitamos mandar el id al backend
    const { id: _, ...bodyData } = datosActualizados;

    try {
      const respuesta = await fetch(`${API_URL}/eventos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...bodyData,
        }),
      });

      if (!respuesta.ok) {
        throw new Error("Error al actualizar el evento");
      }

      const eventoActualizado = await respuesta.json();

      // Actualizamos el estado global
      setEventos((prev) =>
        prev.map((ev) => (ev.id === id ? eventoActualizado : ev))
      );
    } catch (error) {
      setError(error.message);
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
    eliminarEvento,
    actualizarEvento,
  };

  return (
    <EventContext.Provider value={value}>{children}</EventContext.Provider>
  );
};

// Custom hook para facilitar el uso del context en componentes
export const useEventos = () => useContext(EventContext);
